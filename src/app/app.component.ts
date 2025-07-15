import { Component, OnInit } from '@angular/core';
import { NicknameService } from './nickname.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor (private nickServ: NicknameService) {};
  ngOnInit(): void {
    this.nickServ.generateNickname();
  }

}
