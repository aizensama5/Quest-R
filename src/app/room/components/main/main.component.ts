import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'app-room',
  templateUrl: 'main.component.html',
  styleUrls: ['main.component.scss']
})

export class RoomMainComponent implements OnInit {
  constructor(
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
  }
}
