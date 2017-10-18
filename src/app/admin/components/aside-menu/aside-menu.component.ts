import {Component, Input, OnInit} from '@angular/core';
import {RoomService} from '../../../service/http/room.service';
import {RoomModel} from '../../../models/room.model';

@Component({
  selector: 'app-aside-menu',
  templateUrl: './aside-menu.component.html',
  styleUrls: ['./aside-menu.component.scss']
})
export class AsideMenuComponent implements OnInit {
  rooms: RoomModel[] = [];

  constructor(
    private roomService: RoomService
  ) {
    roomService.all().subscribe((rooms: RoomModel[]) => {
      this.rooms = rooms;
    });
  }

  ngOnInit() {
  }

}
