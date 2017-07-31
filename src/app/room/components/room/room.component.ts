import {Component, OnInit} from '@angular/core';
import {RoomModel} from '../../../models/room.model';


@Component({
  moduleId: module.id,
  selector: 'app-room-info',
  templateUrl: 'room.component.html',
  styleUrls: ['room.component.scss']
})

export class RoomInfoComponent implements OnInit {

  private roomMock: RoomModel = {
    id: 1,
    name: 'SCHRON BANKOWY',
    description: 'Zawsze zastanawiałem się, jak to jest, aby włamać się do skarbca banku?\n' +
    'Teraz starają się stamtąd wydostać, a ta produkcja.\n',
    img: 'http://loremflickr.com/500/500/dog',
    duration: '60 minut',
    countPerson: '2-4',
    level: 'Średni',
    position: {
      latitude: 40,
      longitude: 30
    }
  };
  room: RoomModel;

  constructor() {
    console.log(this.roomMock);
  }

  ngOnInit() {
    this.room = this.roomMock;
  }
}
