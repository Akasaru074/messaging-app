import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { ChatroomComponent } from './chatroom/chatroom.component';
import { ChatroomsComponent } from './chatrooms/chatrooms.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './auth.guard';
import { loginGuard } from './login.guard';

const routes: Routes = [{
  path: 'login',
  component: LoginComponent,
  canActivate: [loginGuard]
}, {
  path: ':uuid',
  component: ChatroomComponent,
  canActivate: [authGuard]
}, {
  path: '',
  component: ChatroomsComponent,
  canActivate: [authGuard]
}, {
  path: '**',
  redirectTo: ''
}];

@NgModule({
  declarations: [
    AppComponent,
    ChatroomComponent,
    ChatroomsComponent,
    LoginComponent
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
