import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  collapsed = true;
  @Output() viewSelected = new EventEmitter<string>();

  onSelectView(view: string) {
    this.viewSelected.emit(view);
  }
}
