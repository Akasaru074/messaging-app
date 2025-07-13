import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { Observable, Subscription } from 'rxjs';

export interface Message {
  uuid: string,
  author: string,
  content: string,
  date: string
}

const nickNameParts = [
  ["супер", "гипер", "мега", "дико"],
  ["добрый", "хитрый", "злой", "чёткий"],
  ["пацан", "ёж", "лев", "табурет"]
];

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
  nickname!: string;

  ngOnInit(): void {
    this.messages$ = this.dataServ.fetchMessages();
    
    let nick = localStorage.getItem("nickname");
  
    if (!nick) {
      let part1 = nickNameParts[0][Math.floor(Math.random() * nickNameParts[0].length)];
      let part2 = nickNameParts[1][Math.floor(Math.random() * nickNameParts[1].length)];
      let part3 = nickNameParts[2][Math.floor(Math.random() * nickNameParts[2].length)];
      nick = [part1, part2, part3].join(" ");

      localStorage.setItem("nickname", nick);

    }

    this.nickname = nick;

    this.newMessage.author = nick;

  }

  newMessage = {
    "author": "",
    "content": ""
  }

  refreshMessages() {
    this.messages$ = this.dataServ.fetchMessages();
  }
  
  addMessage() {
    this.newMessage.content = this.newMessage.content.trim();
    if (this.newMessage.content == "") return;
    this.addMessage$ = this.dataServ.addMsgReq(this.newMessage);
    this.addMessage$.subscribe(()=>{
      this.refreshMessages();
    });
    this.newMessage.content = "";
  }
}
