import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) { }

  // apiURL = "http://localhost:3000/api/";
  apiURL = "http://185.58.115.54:3000/api/";

  fetchMessages(): Observable<any> {
    return this.http.get(this.apiURL + "messages");
  }

  addMsgReq(body: object): Observable<any> {
    return this.http.post(this.apiURL + "messages", JSON.stringify(body), {headers: {"Content-Type": "application/json"}});
  }


}
