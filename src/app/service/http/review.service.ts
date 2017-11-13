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

  changeReviews(reviews: ReviewModel[]): Promise<void> {
    return <Promise<void>>this.dataBaseService
      .object(ReviewService.dataBaseName)
      .set(reviews);
  }

  orderByIdDESC(reviews: ReviewModel[]): ReviewModel[] {
    return reviews.sort(function(a, b) {
      return b.id - a.id;
    });
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

  userReviews(reviews: ReviewModel[], userId: string): Promise<ReviewModel[]> {
    return new Promise((resolve) => {
      let userReviews: ReviewModel[] = [];
      reviews.forEach((review: ReviewModel) => {
        if (review.userId === userId) {
          userReviews.push(review);
        }
      });
      resolve(userReviews);
    });
  }

  userReviewByOrderId(reviews: ReviewModel[], userId: string, orderId: string): ReviewModel {
    return reviews.filter((review: ReviewModel) => review.userId === userId && review.visited === orderId)[0];
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
