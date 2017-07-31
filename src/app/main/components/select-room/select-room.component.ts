import {Component, OnInit} from '@angular/core';
import {RoomModel} from '../../../models/room.model';

@Component({
  moduleId: module.id,
  selector: 'app-main-select-room',
  templateUrl: 'select-room.component.html',
  styleUrls: ['select-room.component.scss']
})
export class SelectRoomComponent implements OnInit {

  private roomsMock: RoomModel[] = [
    {
      id: 1,
      name: 'SCHRON BANKOWY',
      description: '',
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
      id: 2,
      name: 'SCHRON BANKOWY',
      description: '',
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
      id: 3,
      name: 'SCHRON BANKOWY',
      description: '',
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
      id: 4,
      name: 'SCHRON BANKOWY',
      description: '',
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

  constructor() {
  }

  ngOnInit() {
  }
}
