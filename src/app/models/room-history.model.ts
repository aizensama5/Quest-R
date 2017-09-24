import { UserReviewModel } from './user-review.model';

export class RoomHistoryModel {
  date: string;
  duration: string;
  photos: string[];
  review: UserReviewModel;

  constructor() {
    this.date = '';
    this.duration = '';
    this.photos = [];
    this.review = new UserReviewModel();
  }
}
