import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

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
  constructor (private dataServ: DataService, private auth: AuthService) {};

  chatRooms$!: Observable<ChatRoom[]>;
  addChatRoom$!: Observable<ChatRoom>;
  nickName: string | null = null;

  ngOnInit(): void {
      this.refreshChatRooms();

      this.nickName = this.auth.getUserName();
      this.newChatRoom.author = this.nickName || "";
      
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
