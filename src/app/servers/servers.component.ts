import {Component} from '@angular/core';
import {timeout} from "rxjs";

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent {
  allowNewServer = false;
  serverCreationStatus = "No server was created."
  serverName = '';
  serverCreated = false;
  servers = ['Testserver', 'Testserver 2'];
  hideDetails = true;
  detailsClicks: Date[] = [];

  constructor() {
    setTimeout(() => {
      this.allowNewServer = true;
    }, 2000);
  }

  onCreateServer() {
    this.serverCreationStatus = "Server was created. Name is '" + this.serverName + "'.";
    this.serverCreated = true;
    this.servers.push(this.serverName);
    this.serverName = '';
  }

  toggleDetails() {
    this.hideDetails = !this.hideDetails;
    this.detailsClicks.push(new Date());
  }
}
