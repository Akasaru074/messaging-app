import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import { NicknameService } from '../nickname.service';
import { ActivatedRoute } from '@angular/router';

export interface Message {
  uuid: string,
  author: string,
  content: string,
  date: string
}

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css']
})
export class ChatroomComponent implements OnInit {
  constructor (private dataServ: DataService, private nickServ: NicknameService, private route: ActivatedRoute) {};
    title = 'messaging-app';
  
    messages$!: Observable<Message[]>;
    addMessage$!: Observable<Message>;
    nickname!: string;
    uuid!: string
  
    ngOnInit(): void {
      this.uuid = this.route.snapshot.paramMap.get('uuid') || "";

      this.refreshMessages();
      
      this.nickname = this.nickServ.nickname || "[Nickname hasn't loaded]";
      this.newMessage.author = this.nickname;

  
    }
  
    newMessage = {
      "author": "",
      "content": ""
    }
  
    refreshMessages() {
      this.messages$ = this.dataServ.fetchMessages(this.uuid);
    }
    
    addMessage() {
      this.newMessage.content = this.newMessage.content.trim();
      if (this.newMessage.content == "") return;
      this.addMessage$ = this.dataServ.addMsgReq(this.uuid, this.newMessage);
      this.addMessage$.subscribe(()=>{
        this.refreshMessages();
      });
      this.newMessage.content = "";
    }
}
