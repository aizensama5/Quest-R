import {Component, EventEmitter, OnInit, Output, Input} from '@angular/core';
import {RoomService} from '../../../service/http/room.service';
import {RoomModel} from '../../../models/room.model';
import {Store} from '@ngrx/store';
import * as mainReducer from '../../../reducers';
import {Observable} from 'rxjs/Observable';
import * as roomAction from '../../../action/room.action';

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
  @Input() isMobile: boolean;
  @Input() isFormSubmited: boolean;
  preSelectedRoom: RoomModel;
  options: Array<any>;
  isOptionsReady = false;

  sRoom: string;

  rooms: RoomModel[] = [];

  constructor(private roomService: RoomService,
              private store: Store<mainReducer.State>) {
    this.checkIsFormSubmited();
    this.preSelectedRoom$ = this.store.select(mainReducer.getRoom);
    this.preSelectedRoom$.subscribe((room: RoomModel) => {
      this.preSelectedRoom = room;
      if (room) {
        this.sRoom = room.id.toString();
      }
    });
  }

  checkIsFormSubmited() {
    this.sRoom = this.isFormSubmited ? '' : this.sRoom;
  }

  ngOnInit() {
    this.getAllActiveRooms()
      .then((rooms: RoomModel[]) => {
        this.rooms = rooms;
        this.prepareOptions(rooms);
      });
  }

  prepareOptions(rooms) {
    this.options = [];
    rooms.forEach((room: RoomModel) => {
      this.options.push({value: room.id.toString(), label: room.name.def});
    });
    this.isOptionsReady = true;
  }

  getAllActiveRooms() {
    return new Promise((resolve, reject) => {
      this.roomService.allActive().subscribe((rooms: RoomModel[]) => {
        resolve(rooms);
      });
    });
  }

  onSelectedRoom() {
    this.store.dispatch(new roomAction.Select(this.roomService.getRoomById(+this.sRoom, this.rooms)));
  }
}
