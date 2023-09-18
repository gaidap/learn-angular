import {Component} from '@angular/core';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent {
  serverId = -1;
  serverStatus = "offline";

  constructor() {
    this.serverStatus = Math.random() > 0.5 ? "online" : "offline";
    this.serverId = Math.floor(Math.random() * 100);
  }

  getServerStatus() {
    return this.serverStatus;
  }

  getColor() {
    return this.serverStatus === "online" ? "green" : "red";
  }

  getTextColor() {
    return this.serverStatus === "online" ? "white" : "black";
  }
}
