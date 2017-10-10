import { Component, OnInit } from '@angular/core';
import { RoomModel } from '../../../models/room.model';
import { RoomService } from '../../../service/http/room.service';

@Component({
  moduleId: module.id,
  selector: 'app-main-swiper-room',
  templateUrl: 'swiper-room.component.html',
  styleUrls: ['swiper-room.component.scss']
})
export class SwiperRoomComponent implements OnInit {

  rooms: RoomModel[] = [];

  config: Object = {
    pagination: '.swiper-pagination',
    paginationClickable: true,
    loop: true,
    loopedSlides: 3,
    slidesPerView: 3,
    centeredSlides: true,
    speed: 1000,
    lazyLoading: true
  };

  constructor(private _roomService: RoomService) {}

  ngOnInit() {
    this.roomsCollection();
  }

  roomsCollection(): void {
    this._roomService.allActive().subscribe((rooms: RoomModel[]) => {
      this.rooms = rooms;
    });
  }
}
