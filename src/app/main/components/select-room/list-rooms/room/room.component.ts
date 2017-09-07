import { Component, Input, OnInit } from '@angular/core';
import { RoomModel } from '../../../../../models/room.model';
import * as mainReducer from '../../../../../reducers';
import { Store } from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import * as roomAction from '../../../../../action/room.action';


@Component({
    moduleId: module.id,
    selector: 'app-main-room',
    templateUrl: 'room.component.html',
    styleUrls: ['room.component.scss']
})
export class RoomComponent implements OnInit {

    @Input() room: RoomModel = new RoomModel();

    constructor(private store: Store<mainReducer.State>) {}

    ngOnInit() {
    }

    reserve () {
      this.store.dispatch(new roomAction.Select(this.room));
      document.getElementById('reserved-room').scrollIntoView({
        block: 'start',
        behavior: 'smooth'
      });
    }

}
