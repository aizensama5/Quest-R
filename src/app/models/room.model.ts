import { Marker } from './marker.model';
import { FirebaseUtils } from '../shared/firebase.utils';
import { GenreModel } from './genre.model';
import { PlayerModel } from './player.model';
import { PriceModel } from './price.model';
import { ComplexityModel } from './complexity.model';
import { MarkingModel } from './marking.model';
import { PhotoModel } from './profile/photo.model';

export class RoomModel {
  id: number;
  description: string;
  name: string;
  active: boolean;
  companyId: number;
  img: string;
  duration: number;
  level: string;
  openingDate: string;
  position: Marker;
  ganre: GenreModel;
  displayOnMain: boolean;
  countPlayers: PlayerModel;
  price: PriceModel;
  complexity: ComplexityModel[];
  marking: MarkingModel[];
  gallery: PhotoModel[];

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
    this.active = false;
    this.companyId = null;
    this.duration = null;
    this.level = '';
    this.openingDate = '';
    this.position = new Marker();
    this.ganre = new GenreModel();
    this.displayOnMain = false;
    this.countPlayers = new PlayerModel();
    this.price = new PriceModel();
    this.complexity = [];
    this.marking = [];
    this.gallery = [];
  }
}
