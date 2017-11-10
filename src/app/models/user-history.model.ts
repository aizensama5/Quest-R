import {PhotoModel} from "./profile/photo.model";

export class UserHistoryModel {
  id: string;
  userId: string;
  roomId: number;
  duration: string;
  photos: PhotoModel[];

  constructor() {
    this.id = '';
    this.userId = '';
    this.roomId = null;
    this.duration = '';
    this.photos = [];
  }
}
