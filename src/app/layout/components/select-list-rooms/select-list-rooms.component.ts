import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RoomService } from '../../../service/http/room.service';
import { RoomModel } from '../../../models/room.model';

@Component({
    moduleId: module.id,
    selector: 'app-layout-select-list-rooms',
    templateUrl: 'select-list-rooms.component.html',
    styleUrls: ['select-list-rooms.component.scss']
})
export class SelectListRoomsComponent implements OnInit {

    @Output() selectedRoom: EventEmitter<RoomModel> = new EventEmitter<RoomModel>();
    sRoom: RoomModel;

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

    onSelectedRoom() {
      this.selectedRoom.emit(this.sRoom);
    }
}
