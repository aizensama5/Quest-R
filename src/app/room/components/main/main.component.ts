import {Component, OnInit} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-room',
  templateUrl: 'main.component.html',
  styleUrls: ['main.component.scss']
})

export class RoomMainComponent implements OnInit {
  target = 'toolbar';
  ngOnInit() {
    if (document.getElementById(this.target)) {
      document.getElementById(this.target).scrollIntoView({
        block: 'start'
      });
    }
  }
}
