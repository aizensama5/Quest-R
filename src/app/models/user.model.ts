import { FirebaseUtils } from '../shared/firebase.utils';

export class UserModel {
  id: string;
  name: string;
  photo: string;
  email: string;

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
    this.id = '';
    this.name = '';
    this.photo = '';
    this.email = '';
  }
}
