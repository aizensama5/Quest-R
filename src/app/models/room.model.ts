import { Marker } from './marker.model';
import { FirebaseUtils } from '../shared/firebase.utils';
import {GenreModel} from './genre.model';

export class RoomModel {
  id: number;
  description: string;
  name: string;
  img: string;
  duration: string;
  level: string;
  position: Marker;
  additionalAbilities: string;
  prevention: string;
  ganre: GenreModel;
  displayOnMain: boolean;
  minCountPlayers: number;
  maxCountPlayers: number;

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
    this.level = '';
    this.position = new Marker();
    this.additionalAbilities = '';
    this.prevention = '';
    this.ganre = new GenreModel();
    this.displayOnMain = false;
    this.minCountPlayers = null;
    this.maxCountPlayers = null;
  }
}
