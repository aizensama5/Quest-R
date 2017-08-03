import {Component, Input, OnInit} from '@angular/core';
import { RoomModel } from '../../../models/room.model';
import { RoomService } from '../../../service/http/room.service';

@Component({
    moduleId: module.id,
    selector: 'app-main-reserved-room',
    templateUrl: 'reserved-room.component.html',
    styleUrls: ['reserved-room.component.scss']
})
export class ReservedRoomComponent implements OnInit {

  @Input() title: string;
    rooms: RoomModel[] = [];

    constructor(
        private roomService: RoomService
    ) {}

    ngOnInit() {
        this.getAllRooms();
    }

    getAllRooms() {
        this.roomService.all().subscribe((rooms: RoomModel[]) => {
            this.rooms = rooms;
        });
    }
}
