import { Component, Input, OnInit } from '@angular/core';
import { RoomModel } from '../../../models/room.model';
import { RoomService } from '../../../service/http/room.service';
import { ReservationModel } from '../../../models/reservation.model';
import { ReservationService } from '../../../service/http/reservation.service';
import { MainReservationModel } from '../../../models/main-reservation.model';
import * as mainReducer from '../../../reducers';
import { Store } from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import * as roomAction from '../../../action/room.action';

@Component({
    moduleId: module.id,
    selector: 'app-main-reserved-room',
    templateUrl: 'reserved-room.component.html',
    styleUrls: ['reserved-room.component.scss']
})
export class ReservedRoomComponent implements OnInit {

    @Input() title: string;
    @Input() selectedRoom: RoomModel = new RoomModel();
    allReservationData: MainReservationModel[];
    roomReservationData: ReservationModel[];
    rooms: RoomModel[] = [];
    timeList = [];
    reserveData: ReservationModel = new ReservationModel();
    showReservationTable = false;
    showOrderingTable = false;
    selectedRoom$: Observable<RoomModel>;

    constructor(
        private roomService: RoomService,
        private reservationService: ReservationService,
        private store: Store<mainReducer.State>
    ) {
      this.selectedRoom$ = this.store.select(mainReducer.getRoom);
      this.selectedRoom$.subscribe((room: RoomModel) => {
        if (room) {
          this.onSelectRoom(room);
        }
      });
      reservationService.all().subscribe((response) => {
        this.allReservationData = response;
      });
    }

    /**
     * Get List of time
     * @returns array>
     */

    getTime(id: number) {
      const timeList = [];
      this.allReservationData.forEach((roomReservationData) => {
        if (roomReservationData.id === id) {
          roomReservationData.reservation[0].time.forEach((dayResInfo) => {
            timeList.push(dayResInfo.time);
          });
        }
      });
      return timeList;
    }

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
      this.roomReservationData = this.roomReservation(room.id);
      this.timeList = this.getTime(room.id);
      this.showReservationTable = true;
      this.showOrderingTable = false;
    }

    roomReservation(id: number) {
      let resData = [];
      this.allReservationData.forEach((roomReservationData) => {
        if (roomReservationData.id === id) {
          resData = roomReservationData.reservation;
        }
      });
      return resData;
    }

    onSelectItem(item: ReservationModel) {
      this.reserveData = item;
      this.showOrderingTable = true;
    }
}
