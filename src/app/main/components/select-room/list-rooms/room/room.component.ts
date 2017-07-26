import { Component, Input, OnInit } from '@angular/core';
import { RoomModel } from '../../../../../models/room.model';

@Component({
    moduleId: module.id,
    selector: 'app-main-room',
    templateUrl: 'room.component.html',
    styleUrls: ['room.component.scss']
})
export class RoomComponent implements OnInit {

    @Input() room: RoomModel = new RoomModel();

    constructor() {}

    ngOnInit() {
    }

}
