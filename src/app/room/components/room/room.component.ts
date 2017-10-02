import {Component, Injectable, OnInit} from '@angular/core';
import {RoomModel} from '../../../models/room.model';
import {RoomService} from '../../../service/http/room.service';
import {ActivatedRoute} from '@angular/router';


@Component({
  moduleId: module.id,
  selector: 'app-room-info',
  templateUrl: 'room.component.html',
  styleUrls: ['room.component.scss']
})
@Injectable()
export class RoomInfoComponent {
  room: RoomModel;
  rooms: RoomModel[] = [];

  constructor(
    private route: ActivatedRoute,
    private roomService: RoomService
  ) {
    this.roomService.all().subscribe((rooms: RoomModel[]) => {
      this.rooms = rooms;
      let roomId = this.route.snapshot.params.id;
      roomId = parseInt(roomId, 10);
      this.roomService.roomById(roomId).subscribe((room: RoomModel[]) => {
        this.room = room[0];
      });
    });
  }
}
