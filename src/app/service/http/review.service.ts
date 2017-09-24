import { Injectable } from '@angular/core';
import { ReviewModel } from '../../models/review.model';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Injectable()
export class ReviewService {
  private static readonly dataBaseName = 'review/';

  constructor(private dataBaseService: AngularFireDatabase) {}

  addReview(review: ReviewModel): Promise<void> {
    return <Promise<void>>this.dataBaseService
      .object(ReviewService.dataBaseName + review.id)
      .set(review.toJSON());
  }

  all(): FirebaseListObservable<ReviewModel[]> {
    return <FirebaseListObservable<ReviewModel[]>>this.dataBaseService
      .list(ReviewService.dataBaseName)
      .map((items) => items.map(ReviewModel.fromJSON));
  }
}
