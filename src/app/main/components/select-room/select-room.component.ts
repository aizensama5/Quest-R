import { Component, OnInit } from '@angular/core';
import { RoomModel } from '../../../models/room.model';
import { RoomService } from '../../../service/http/room.service';
import {GenreModel} from '../../../models/genre.model';

@Component({
  moduleId: module.id,
  selector: 'app-main-select-room',
  templateUrl: 'select-room.component.html',
  styleUrls: ['select-room.component.scss']
})
export class SelectRoomComponent implements OnInit {
  rooms: RoomModel[] = [];
  ganre = {id: 1, legend: 'С актерами', color: '#00ff00'};

  constructor(roomService: RoomService) {
    roomService.displayedOnMainPage().subscribe((rooms: RoomModel[]) => {
      this.rooms = rooms;
    });
    roomService.filterByGanre(this.ganre.id).subscribe((filteredRoom) => {
      console.log(filteredRoom);
    });
  }

  ngOnInit() {
  }
}
