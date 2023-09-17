import { Component } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
    username: string = '';

  isUsernameEmpty() {
    return this.username.length === 0;
  }

  resetUsername() {
    this.username = '';
  }
}
