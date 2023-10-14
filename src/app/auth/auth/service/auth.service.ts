import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, catchError, tap, throwError} from "rxjs";
import {API_KEY} from "./api-key";
import {User} from "../model/user.model";

export interface AuthResponseData {
  kind: string,
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string,
  registered?: boolean,
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API_KEY = API_KEY;
  user = new BehaviorSubject<User|null>(null);

  constructor(private http: HttpClient) {
  }

  signUp(email: string, password: string) {
    return this.getAuthRequestObservable(
      'signUp',
      email,
      password
    );
  }

  signIn(email: string, password: string) {
    return this.getAuthRequestObservable(
      'signInWithPassword',
      email,
      password
    );
  }

  private getAuthRequestObservable(authAction: string, email: string, password: string) {
    return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:${authAction}?key=${this.API_KEY}`,
      {
        email: email,
        password: password,
        returnSecureToken: true,
      }
    ).pipe(catchError(error => {
      return this.handleError(error, email);
    }), tap(
      (response) => {
        this.handleAuthentication(response.email, response.localId, response.idToken, +response.expiresIn);
      }
    ));
  }

  private handleError(error: any, email: string) {
    console.error(error);
    if (!error.error || !error.error.error) {
      return throwError(this.getErrorFactory("An unknown error occurred!"));
    }

    return this.getErrorFromErrorMessageCode(error.error.error.message, email);
  }

  private getErrorFactory(errorMessage: string) {
    return () => new Error(errorMessage);
  }

  private getErrorFromErrorMessageCode(errorMessage: string, email: string) {
    switch (errorMessage) {
      case 'EMAIL_EXISTS':
        return throwError(() => new Error(`The email address "${email}" already exists.`));
      case 'INVALID_EMAIL':
        return throwError(() => new Error(`The email address "${email}" is invalid.`));
      case 'INVALID_LOGIN_CREDENTIALS':
        return throwError(() => new Error(`The password or email "${email}" is invalid.`));
      case 'USER_DISABLED':
        return throwError(() => new Error(`The user account with the email "${email}" has been disabled by an administrator.`));
      default:
        return throwError(() => new Error(errorMessage));
    }
  }

  private handleAuthentication(email: string, localId: string, idToken: string, expiresInSeconds: number) {
    const expirationDate = this.getExpirationDate(expiresInSeconds);
    const user = new User(email, localId, idToken, expirationDate);
    this.user.next(user);
  }

  private getExpirationDate(expiresInSeconds: number) {
    return new Date(this.calculateExpirationInMillis(expiresInSeconds));
  }

  private calculateExpirationInMillis(expiresInSeconds: number) {
    return this.currentDate().getTime() + expiresInSeconds * 1000;
  }

  private currentDate() {
    return new Date();
  }
}
