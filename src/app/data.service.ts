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

  fetchChatRooms(): Observable<any> {
    return this.http.get(this.apiURL + "chatrooms");
  }

  addChatReq(body: object): Observable<any> {
    return this.http.post(this.apiURL + "chatrooms", JSON.stringify(body), {headers: {"Content-Type": "application/json"}});
  }

  fetchMessages(uuid: string): Observable<any> {
    return this.http.get(this.apiURL + "chatrooms/" + uuid);
  }

  addMsgReq(uuid: string, body: object): Observable<any> {
    return this.http.post(this.apiURL + "chatrooms/" + uuid, JSON.stringify(body), {headers: {"Content-Type": "application/json"}});
  }


}
