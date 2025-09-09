import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) { }

  private apiURL = "http://localhost:3000/api/";
  // private apiURL = "https://185.58.115.54:81/api/";

  fetchChatRooms(): Observable<any> {
    return this.http.get(this.apiURL + "chatrooms", {withCredentials: true});
  }

  addChatReq(body: object): Observable<any> {
    return this.http.post(this.apiURL + "chatrooms", JSON.stringify(body), {headers: {"Content-Type": "application/json"}, withCredentials: true});
  }

  fetchChatInfo(uuid: string): Observable<any> {
    return this.http.get(this.apiURL + "chatrooms/" + uuid, {withCredentials: true});
  }

  fetchMessages(uuid: string): Observable<any> {
    return this.http.get(`${this.apiURL}chatrooms/${uuid}/messages`, {withCredentials: true});
  }

  addMsgReq(uuid: string, body: object): Observable<any> {
    return this.http.post(`${this.apiURL}chatrooms/${uuid}/messages`, JSON.stringify(body), {headers: {"Content-Type": "application/json"}, withCredentials: true});
  }


}
