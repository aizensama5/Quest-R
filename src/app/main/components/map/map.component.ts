import {  Component, OnInit } from '@angular/core';
import { Marker } from '../../../models/marker.model';
import { RoomService } from '../../../service/http/room.service';
import { RoomModel } from '../../../models/room.model';
import 'rxjs/add/operator/map';


@Component({
    moduleId: module.id,
    selector: 'app-main-map',
    templateUrl: 'map.component.html',
    styleUrls: ['map.component.scss']
})
export class MapComponent implements OnInit {

    marksRoom: Marker[] = [];
    firstMarkRoom: Marker;

    constructor(
        private _roomService: RoomService,
    ) { }

    ngOnInit() {
        this.getMarksRooms();
    }

    getMarksRooms() {
        this._roomService.all()
        .map((roomList: RoomModel[]) => roomList.map((room: RoomModel) => room.position))
        .subscribe((positionList: Marker[]) => {
            this.marksRoom = positionList;
            if (this.marksRoom.length > 0) {
                this.firstMarkRoom = this.marksRoom[0];
            }
        });
    }


}
