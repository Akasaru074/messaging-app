import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { ChatroomComponent } from './chatroom/chatroom.component';
import { ChatroomsComponent } from './chatrooms/chatrooms.component';

const routes: Routes = [{
  path: ':uuid',
  component: ChatroomComponent
}, {
  path: '',
  component: ChatroomsComponent
}, {
  path: '**',
  redirectTo: ''
}];

@NgModule({
  declarations: [
    AppComponent,
    ChatroomComponent,
    ChatroomsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    NgbModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
