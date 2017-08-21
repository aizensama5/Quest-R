import {Component, Injectable, OnInit} from '@angular/core';
import {RoomModel} from '../../../models/room.model';
// import {RoomService} from '../../../service/http/room.service';
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

  constructor(
    private route: ActivatedRoute
    // private roomService: RoomService
  ) {
    let getId = this.route.snapshot.params.id;
    getId = parseInt(getId, 10);
    // this.room = this.roomService.getRoomById(getId);
  }
}
