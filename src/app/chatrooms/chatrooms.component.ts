import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import { NicknameService } from '../nickname.service';

interface ChatRoom {
  uuid: string,
  author: string,
  name: string
}

@Component({
  selector: 'app-chatrooms',
  templateUrl: './chatrooms.component.html',
  styleUrls: ['./chatrooms.component.css']
})
export class ChatroomsComponent {
  constructor (private dataServ: DataService, private nickServ: NicknameService) {};

  chatRooms$!: Observable<ChatRoom[]>;
  addChatRoom$!: Observable<ChatRoom>;
  nickName!: string;

  ngOnInit(): void {
      this.refreshChatRooms();

      this.nickName = this.nickServ.nickname || "[nickname hasn't loaded]";
      this.newChatRoom.author = this.nickName;

      
      
  }

  newChatRoom = {
    "author": "",
    "name": ""
  }

  refreshChatRooms() {
    this.chatRooms$ = this.dataServ.fetchChatRooms();
  }

  addChatRoom() {
      this.newChatRoom.name = this.newChatRoom.name.trim();
      if (this.newChatRoom.name == "") return;
      this.addChatRoom$ = this.dataServ.addChatReq(this.newChatRoom);
      this.addChatRoom$.subscribe(()=>{
        this.refreshChatRooms();
      });
      this.newChatRoom.name = "";
  }

}
