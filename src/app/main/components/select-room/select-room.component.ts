import { Component, OnInit } from '@angular/core';
import { RoomModel } from '../../../models/room.model';

@Component({
    moduleId: module.id,
    selector: 'app-main-select-room',
    templateUrl: 'select-room.component.html',
    styleUrls: ['select-room.component.scss']
})
export class SelectRoomComponent implements OnInit {

    private roomsMock: RoomModel[] = [
        {
            name: 'SCHRON BANKOWY',
            img: 'http://loremflickr.com/500/500/dog',
            duration: '60 minut',
            countPerson: '2-4',
            level: 'Średni',
            position: {
                latitude: 40,
                longitude: 30
            }
        },
        {
            name: 'SCHRON BANKOWY',
            img: 'http://loremflickr.com/500/500/dog',
            duration: '60 minut',
            countPerson: '2-4',
            level: 'Średni',
            position: {
                latitude: 40,
                longitude: 30
            }
        },
        {
            name: 'SCHRON BANKOWY',
            img: 'http://loremflickr.com/500/500/dog',
            duration: '60 minut',
            countPerson: '2-4',
            level: 'Średni',
            position: {
                latitude: 40,
                longitude: 30
            }
        },
        {
            name: 'SCHRON BANKOWY',
            img: 'http://loremflickr.com/500/500/dog',
            duration: '60 minut',
            countPerson: '2-4',
            level: 'Średni',
            position: {
                latitude: 40,
                longitude: 30
            }
        }
    ];

    rooms: RoomModel[] = this.roomsMock;

    constructor() {}

    ngOnInit() {
    }
}
