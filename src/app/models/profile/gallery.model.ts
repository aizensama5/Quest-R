import { PhotoModel } from './photo.model';
import {FirebaseUtils} from '../../shared/firebase.utils';

export class GalleryModel {
  id: number;
  userId: string;
  roomId: number;
  date: string;
  photo: PhotoModel[];

  static fromJSON(values) {
  const photo = new GalleryModel();

  for (const value in values) {
    if (photo.hasOwnProperty(value)) {
      photo[value] = values[value];
    }
  }
    return photo;
  }

  static fromJsonArray(json: any[]): GalleryModel[] {
    return json.map(GalleryModel.fromJSON);
  }

  public toJSON(): object {
    return FirebaseUtils.prepareObject(this);
  }

  constructor() {
    this.id = null;
    this.userId = '';
    this.roomId = null;
    this.date = '';
    this.photo = [];
}
}
