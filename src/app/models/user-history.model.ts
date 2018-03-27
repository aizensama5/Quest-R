import {PhotoModel} from "./profile/photo.model";
import {ReviewModel} from "./review.model";

export class UserHistoryModel {
  id: string;
  userId: string;
  roomId: number;
  duration: string;
  photos: PhotoModel[];
  bookingDate?: any;
  review?: ReviewModel;

  constructor() {
    this.id = '';
    this.userId = '';
    this.roomId = null;
    this.duration = '';
    this.photos = [];
  }
}
