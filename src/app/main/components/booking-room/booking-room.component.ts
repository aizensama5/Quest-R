import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RoomService } from '../../../service/http/room.service';
import { RoomModel } from '../../../models/room.model';

@Component({
    moduleId: module.id,
    selector: 'app-main-booking-room',
    templateUrl: 'booking-room.component.html',
    styleUrls: ['booking-room.component.scss']
})
export class BookingRoomComponent implements OnInit {
  @Output() selectedRoom: EventEmitter<RoomModel> = new EventEmitter<RoomModel>();
  @Output() selectedDate: EventEmitter<string> = new EventEmitter<string>();

  rooms: RoomModel[] = [];

  constructor(
    private roomService: RoomService,
  ) {}

  ngOnInit() {
    this.getAllRooms();
  }

  getAllRooms() {
    this.roomService.all().subscribe((rooms: RoomModel[]) => {
      this.rooms = rooms;
    });
  }

  onSelectedRoom(room: RoomModel) {
    this.selectedRoom.emit(room);

  }

  reserve(date) {
    this.selectedDate.emit(date);
  }
}
