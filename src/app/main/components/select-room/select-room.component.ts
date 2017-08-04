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
      description: 'Zawsze zastanawiałem się, jak to jest, aby włamać się do skarbca banku?\n' +
      'Teraz starają się stamtąd wydostać, a ta produkcja.\n',
      img: 'http://loremflickr.com/500/500/dog',
      duration: '60 minut',
      countPerson: '2-5',
      level: 'Sredni',
      position: {latitude: 50.4666641, longitude: 30.5},
      additionalAbilities: 'Możliwość gry po angielsku',
      prevention: 'Możliwość gry po angielsku'
    },
    {
      id: 2,
      name: 'Fantazja',
      description: 'Zawsze zastanawiałem się, jak to jest, aby włamać się do skarbca banku?\n' +
      'Teraz starają się stamtąd wydostać, a ta produkcja.\n',
      img: 'http://loremflickr.com/500/500/dog',
      duration: '60 minut',
      countPerson: '2-5',
      level: 'Sredni',
      position: {latitude: 50.4666641, longitude: 30.1},
      additionalAbilities: 'Możliwość gry po angielsku',
      prevention: 'Możliwość gry po angielsku'
    },
    {
      id: 3,
      name: 'Midnight killer mk II',
      description: 'Zawsze zastanawiałem się, jak to jest, aby włamać się do skarbca banku?\n' +
      'Teraz starają się stamtąd wydostać, a ta produkcja.\n',
      img: 'http://loremflickr.com/500/500/dog',
      duration: '60 minut',
      countPerson: '2-5',
      level: 'Sredni',
      position: {latitude: 50.2, longitude: 30.2},
      additionalAbilities: 'Możliwość gry po angielsku',
      prevention: 'Możliwość gry po angielsku'
    },
    {
      id: 4,
      name: 'Midnight killer mk II',
      description: 'Zawsze zastanawiałem się, jak to jest, aby włamać się do skarbca banku?\n' +
      'Teraz starają się stamtąd wydostać, a ta produkcja.\n',
      img: 'http://loremflickr.com/500/500/dog',
      duration: '60 minut',
      countPerson: '2-5',
      level: 'Sredni',
      position: {latitude: 50.5, longitude: 30.4},
      additionalAbilities: 'Możliwość gry po angielsku',
      prevention: 'Możliwość gry po angielsku'
    }
  ];

  rooms: RoomModel[] = this.roomsMock;

  constructor() {
  }

  ngOnInit() {
  }
}
