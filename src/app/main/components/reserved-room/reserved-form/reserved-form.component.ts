import { Component, Input, OnInit } from '@angular/core';
import { RoomModel } from '../../../../models/room.model';

@Component({
    moduleId: module.id,
    selector: 'app-main-reserved-form',
    templateUrl: 'reserved-form.component.html',
    styleUrls: ['reserved-form.component.scss']
})
export class ReservedFormComponent implements OnInit {

    @Input() room: RoomModel = new RoomModel();

    constructor() {
    }

    ngOnInit() {
    }
}
