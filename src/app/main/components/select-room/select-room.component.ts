import {Component, OnInit} from '@angular/core';
import {RoomModel} from '../../../models/room.model';
import {RoomService} from '../../../service/http/room.service';

@Component({
  moduleId: module.id,
  selector: 'app-main-select-room',
  templateUrl: 'select-room.component.html',
  styleUrls: ['select-room.component.scss']
})
export class SelectRoomComponent implements OnInit {
  rooms: RoomModel[] = [];

  constructor(roomService: RoomService) {
    roomService.all().subscribe((rooms: RoomModel[]) => {
      this.rooms = rooms;
    });
  }

  ngOnInit() {
  }
}
