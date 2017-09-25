import { FirebaseUtils } from '../shared/firebase.utils';

export class ReviewModel {
  id: number;
  roomId: number;
  userId: number;
  created: string;
  visited: string;
  review: string;

  static fromJSON(values) {
    const room = new ReviewModel();

    for (const value in values) {
      if (room.hasOwnProperty(value)) {
        room[value] = values[value];
      }
    }
    return room;
  }

  static fromJsonArray(json: any[]): ReviewModel[] {
    return json.map(ReviewModel.fromJSON);
  }

  public toJSON(): object {
    return FirebaseUtils.prepareObject(this);
  }

  constructor () {
    this.id = null;
    this.roomId = null;
    this.userId = null;
    this.created = '';
    this.visited = '';
    this.review = '';
  }
}
