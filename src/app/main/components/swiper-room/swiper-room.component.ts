import { Component, Input, OnInit } from '@angular/core';
import { RoomModel } from '../../../models/room.model';
import { RoomService } from '../../../service/http/room.service';

@Component({
    moduleId: module.id,
    selector: 'app-main-swiper-room',
    templateUrl: 'swiper-room.component.html',
    styleUrls: ['swiper-room.component.scss']
})
export class SwiperRoomComponent implements OnInit {

    @Input() rooms: RoomModel[] = [];

    config: Object = {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        slidesPerView: 3,
        centeredSlides: true,
        loop: true,
        speed: 1000,
        // Enable lazy loading
        lazyLoading: true
    };

    constructor(
        private _roomService: RoomService
    ) { }

    ngOnInit() {
        this.getAllRooms();
    }

    protected getAllRooms() {
        this._roomService.all().subscribe((rooms: RoomModel[]) => {
            this.rooms = rooms;
        });
    }
}
