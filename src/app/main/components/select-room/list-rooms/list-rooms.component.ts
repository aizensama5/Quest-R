import { Component, Input, OnInit } from '@angular/core';
import { RoomModel } from '../../../../models/room.model';

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
