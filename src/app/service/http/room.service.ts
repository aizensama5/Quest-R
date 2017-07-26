import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { RoomModel } from '../../models/room.model';

@Injectable()
export class RoomService {

    private rooms: RoomModel[] = [
        {name: 'SCHRON BANKOWY', img: 'https://s3.amazonaws.com/uploads.hipchat.com/531492/4408974/ISsLluSac5tg2ii/739cc73618ba7df0de238a4486132345.png', duration: '60 minut', countPerson: '2-5', level: 'Sredni', position: {latitude: 50.4666641, longitude: 30.5}},
        {name: 'Fantazja', img: 'https://s3.amazonaws.com/uploads.hipchat.com/531492/4408974/E1Oja5VCz4JTcH6/e85efdc584718c74adda00aac8691e5e.png', duration: '60 minut', countPerson: '2-5', level: 'Sredni', position: {latitude: 50.4666641, longitude: 30.1}},
        {name: 'Midnight killer mk II', img: 'https://s3.amazonaws.com/uploads.hipchat.com/531492/4408974/ww9WDbxwKJfWnX3/kontener_logo_pokoj_zdj_2%20copy.png', duration: '60 minut', countPerson: '2-5', level: 'Sredni', position: {latitude: 50.2, longitude: 30.2}},
        {name: 'Midnight killer mk II', img: 'https://s3.amazonaws.com/uploads.hipchat.com/531492/4408974/ISsLluSac5tg2ii/739cc73618ba7df0de238a4486132345.png', duration: '60 minut', countPerson: '2-5', level: 'Sredni', position: {latitude: 50.5, longitude: 30.4}},
        {name: 'Midnight killer mk II', img: 'https://s3.amazonaws.com/uploads.hipchat.com/531492/4408974/XpzFrlwyEuRgX9F/kontener_logo_pokoj_zdj_3.png', duration: '60 minut', countPerson: '2-5', level: 'Sredni', position: {latitude: 50.7, longitude: 30.7}}
    ];

    constructor() {}

    /**
     * Get all rooms.
     * @returns <Observable<RoomModel[]>>
     */
    all(): Observable<RoomModel[]> {
        return Observable.of(this.rooms);
    }
}
