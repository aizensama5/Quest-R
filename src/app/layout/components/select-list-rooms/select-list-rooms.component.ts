import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { RoomService } from '../../../service/http/room.service';
import { RoomModel } from '../../../models/room.model';
import { Store } from '@ngrx/store';
import * as mainReducer from '../../../reducers';
import {Observable} from 'rxjs/Observable';

@Component({
    moduleId: module.id,
    selector: 'app-layout-select-list-rooms',
    templateUrl: 'select-list-rooms.component.html',
    styleUrls: ['select-list-rooms.component.scss']
})
export class SelectListRoomsComponent implements OnInit {

    @Output() selectedRoom: EventEmitter<RoomModel> = new EventEmitter<RoomModel>();
    @Input() preSelectedRoom$: Observable<RoomModel>;
    @Input() isOpenedRoomPage: boolean;
    preSelectedRoom: RoomModel;

    sRoom: RoomModel;

    rooms: RoomModel[] = [];

    constructor(
        private roomService: RoomService,
        private store: Store<mainReducer.State>

    ) {
      this.preSelectedRoom$ = this.store.select(mainReducer.getRoom);
      this.preSelectedRoom$.subscribe((room: RoomModel) => {
          this.preSelectedRoom = room;
      });
    }

    ngOnInit() {
        this.getAllActiveRooms();
    }

    getAllActiveRooms() {
      this.roomService.allActive().subscribe((rooms: RoomModel[]) => {
        this.rooms = rooms;
      });
    }

    onSelectedRoom() {
      this.selectedRoom.emit(this.sRoom);
    }
}
