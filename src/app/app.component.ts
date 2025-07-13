import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { Observable, Subscription } from 'rxjs';

export interface Message {
  uuid: string,
  content: string,
  date: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor (private dataServ: DataService) {};
  title = 'messaging-app';

  messages$!: Observable<Message[]>;
  addMessage$!: Observable<Message>;

  ngOnInit(): void {
    this.messages$ = this.dataServ.fetchMessages();
  }

  newMessage = {
    "content": ""
  }

  addMessage() {
    this.addMessage$ = this.dataServ.addMsgReq(this.newMessage);
    this.addMessage$.subscribe(()=>{
      this.messages$ = this.dataServ.fetchMessages();
    });
    this.newMessage.content = "";
  }
}
