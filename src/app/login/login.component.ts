import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

interface Credentials {
  login: string,
  password: string
}

interface LoginError {
  error: boolean,
  msg: string
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor (private auth: AuthService, private router: Router) {}

  credentials: Credentials = {
    login: "",
    password: ""
  }

  loginError: LoginError = {
    error: false,
    msg: ""
  }

  reqInProcess = false;

  redirect() {
    this.router.navigateByUrl("/");
  }

  async submit() {
    this.reqInProcess = true;
    this.auth.login(this.credentials.login, this.credentials.password).subscribe({
        next: (resp: any) => {
          this.redirect();
        },
        error: err => {
          this.credentials.password = "";
          this.loginError.msg = err.error.msg;
          this.loginError.error = true;
        },
    });
    this.reqInProcess = false;
  }


}
