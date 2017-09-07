import {FirebaseUtils} from '../shared/firebase.utils';

export class SharesModel {
  id: number;
  img: string;
  descriptions: string;

  static fromJSON(values) {
    const user = new SharesModel();

    for (const value in values) {
      if (user.hasOwnProperty(value)) {
        user[value] = values[value];
      }
    }
    return user;
  }

  static fromJsonArray(json: any[]): SharesModel[] {
    return json.map(SharesModel.fromJSON);
  }

  public toJSON(): object {
    return FirebaseUtils.prepareObject(this);
  }

  constructor() {
    this.id = null;
    this.img = '';
    this.descriptions = '';
  }
}
