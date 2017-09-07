import { Component, Input, OnInit } from '@angular/core';
import { RoomModel } from '../../../../models/room.model';
import {AngularFireModule} from 'angularfire2';
import {RoomService} from '../../../../service/http/room.service';

@Component({
    moduleId: module.id,
    selector: 'app-main-list-rooms',
    templateUrl: 'list-rooms.component.html',
    styleUrls: ['list-rooms.component.scss']
})
export class ListRoomsComponent implements OnInit {

    @Input() rooms: RoomModel[] = [];

    constructor() {}

    ngOnInit() {
    }
}
