import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, throwError} from "rxjs";
import {API_KEY} from "./api-key";

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
    }));
  }

  private handleError(error: any, email: string) {
    console.error(error);
    if (!error.error || !error.error.error) {
      return throwError(() => new Error("An unknown error occurred!"));
    }

    switch (error.error.error.message) {
      case 'EMAIL_EXISTS':
        return throwError(() => new Error(`The email address "${email}" already exists.`));
      case 'INVALID_EMAIL':
        return throwError(() => new Error(`The email address "${email}" is invalid.`));
      case 'INVALID_LOGIN_CREDENTIALS':
        return throwError(() => new Error(`The password or email "${email}" is invalid.`));
      case 'USER_DISABLED':
        return throwError(() => new Error(`The user account with the email "${email}" has been disabled by an administrator.`));
      default:
        return throwError(() => new Error(error.error.error.message));
    }
  }
}
