import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  private authURL = "http://localhost:3000/auth/";

  private username: string | null = null;

  getUserName() {
    return this.username;
  }

  setUserName(name: string) {
    this.username = name;
  }

  checkAuthStatus(): Observable<any> {
    return this.http.get(this.authURL, {withCredentials: true});
  }

  login(username: string, password: string) {
    return this.http.post(this.authURL + "login", {username: username, password: password}, {headers: {"Content-Type": "application/json"}, withCredentials: true})
  }

}
