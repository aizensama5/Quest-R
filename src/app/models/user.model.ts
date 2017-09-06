import {FirebaseUtils} from '../shared/firebase.utils';

export class UserModel {
  id: number;
  name: string;
  surname: string;
  img: string;
  level: number;
  roomsPassed: number;

  static fromJSON(values) {
    const user = new UserModel();

    for (const value in values) {
      if (user.hasOwnProperty(value)) {
        user[value] = values[value];
      }
    }
    return user;
  }

  static fromJsonArray(json: any[]): UserModel[] {
    return json.map(UserModel.fromJSON);
  }

  public toJSON(): object {
    return FirebaseUtils.prepareObject(this);
  }

  constructor() {
    this.id = null;
    this.name = '';
    this.surname = '';
    this.img = '';
    this.level = null;
    this.roomsPassed = null;
  }
}
