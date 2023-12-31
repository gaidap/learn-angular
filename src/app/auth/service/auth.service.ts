import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, catchError, tap, throwError} from "rxjs";
import {API_KEY} from "./api-key";
import {User} from "../model/user.model";
import {Router} from "@angular/router";

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
  user = new BehaviorSubject<User | null>(null);

  private API_KEY = API_KEY;
  private localsStorageKey = 'userData';
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) {
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

  autoLogin() {
    const userData: {
      email: string,
      id: string,
      _token: string,
      _tokenExpirationDate: string,
    } = JSON.parse(localStorage.getItem(this.localsStorageKey) ?? '{}');

    if (!userData) {
      return;
    }

    const user: User = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate),
    );

    if (!user.token) {
      return;
    }

    if (user.tokenExpirationDate <= this.currentDate()) {
      return;
    }

    this.user.next(user);
    const expirationInMillis = user.tokenExpirationDate.getTime() - this.currentDate().getTime();
    this.autoLogout(expirationInMillis);
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout(); // TODO: Implement a refresh mechanism to avoid logout.
    }, expirationDuration);
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
    const expirationInMillis = expiresInSeconds * 1000;
    this.autoLogout(expirationInMillis);
    localStorage.setItem(this.localsStorageKey, JSON.stringify(user));
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

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem(this.localsStorageKey);
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
      this.tokenExpirationTimer = null;
    }
  }
}
