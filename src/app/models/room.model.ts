import { Marker } from './marker.model';
import { FirebaseUtils } from '../shared/firebase.utils';

export class RoomModel {
  id: number;
  description: string;
  name: string;
  img: string;
  duration: string;
  countPerson: string;
  level: string;
  position: Marker;
  additionalAbilities: string;
  prevention: string;

  static fromJSON(values) {
    const room = new RoomModel();

    for (const value in values) {
      if (room.hasOwnProperty(value)) {
        room[value] = values[value];
      }
    }
    return room;
  }

  static fromJsonArray(json: any[]): RoomModel[] {
    return json.map(RoomModel.fromJSON);
  }

  public toJSON(): object {
    return FirebaseUtils.prepareObject(this);
  }

  constructor() {
    this.id = null;
    this.description = '';
    this.name = '';
    this.img = '';
    this.duration = '';
    this.countPerson = '';
    this.level = '';
    this.position = new Marker();
    this.additionalAbilities = '';
    this.prevention = '';
  }
}
