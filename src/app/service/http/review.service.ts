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
      .list(ReviewService.dataBaseName);
  }

  lastId(reviews: ReviewModel[]): number {
    if (reviews.length) {
      const reviewsIds: number[] = [];
      reviews.forEach((review: ReviewModel) => {
        reviewsIds.push(review.id);
      });
      return Math.max.apply(null, reviewsIds);
    }
    return 0;
  }

  userReviews(userId: string): FirebaseListObservable<ReviewModel[]> {
    return <FirebaseListObservable<ReviewModel[]>>this.dataBaseService
      .list(ReviewService.dataBaseName + userId)
      .map((items) => items.map(ReviewModel.fromJSON));
  }

  roomReviews (roomId: number, reviews?: ReviewModel[]) {
    let allReviews: ReviewModel[] = [];
    if (reviews.length) {
      allReviews = reviews;
    } else {
      this.all().subscribe((rev: ReviewModel[]) => {
        allReviews = rev;
      });
    }
    return allReviews.filter((rev: ReviewModel) => rev.roomId === roomId)[0];
  }
}
