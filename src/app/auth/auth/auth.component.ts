import {Component, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthResponseData, AuthService} from "./service/auth.service";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  isSignInMode = true;
  isLoading = false;
  passwordMismatch = false;
  password = '';
  confirmPassword = '';
  errorMsg: string = ''

  @ViewChild('form')
  private form!: NgForm;

  constructor(private authService: AuthService, private router: Router) {
  }

  onSwitchMode() {
    this.form.reset();
    this.isSignInMode = !this.isSignInMode;
    this.errorMsg = '';
  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    }

    this.isLoading = true;

    const email = this.form.value.email;
    const pass = this.form.value.password;
    if (this.isSignInMode) {
      this.performRequest(this.authService.signIn(email, pass));
    } else {
      this.performRequest(this.authService.signUp(email, pass));
    }

    this.form.reset();
  }

  private performRequest(authObs: Observable<AuthResponseData>) {
    authObs.subscribe(
      {
        next: (response) => {
          console.log(response);
          this.isLoading = false;
          this.errorMsg = '';
          this.router.navigate(['/recipes']);
        },
        error: (errorMessage) => {
          this.isLoading = false;
          this.errorMsg = errorMessage;
        }
      }
    );
  }

  checkPasswordMatch() {
    this.passwordMismatch = this.password !== this.confirmPassword;
  }
}
