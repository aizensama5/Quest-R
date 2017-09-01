import {Component, Input, OnInit} from '@angular/core';
import { RoomModel } from '../../../models/room.model';
import { RoomService } from '../../../service/http/room.service';
import {ReservationModel} from '../../../models/reservation.model';

@Component({
    moduleId: module.id,
    selector: 'app-main-reserved-room',
    templateUrl: 'reserved-room.component.html',
    styleUrls: ['reserved-room.component.scss']
})
export class ReservedRoomComponent implements OnInit {

    @Input() title: string;
    rooms: RoomModel[] = [];
    reserveData: ReservationModel = new ReservationModel();
    selectedRoom: RoomModel = new RoomModel();
    showReservationTable = false;
    showOrderingTable = false;

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

    onSelectRoom(room: RoomModel) {
      this.selectedRoom = room;
      this.showReservationTable = true;
      this.showOrderingTable = false;
    }

    onSelectItem(item: ReservationModel) {
      this.reserveData = item;
      this.showOrderingTable = true;
    }
}
