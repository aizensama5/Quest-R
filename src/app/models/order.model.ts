import { BookerInfoModel } from './booker-info.model';
import { FirebaseUtils } from '../shared/firebase.utils';

export class OrderModel {
  id: number;
  roomId: number;
  is_passed: boolean;
  bookerData: BookerInfoModel;

  static fromJSON(values) {
    const order = new OrderModel();

    for (const value in values) {
      if (order.hasOwnProperty(value)) {
        order[value] = values[value];
      }
    }
    return order;
  }

  static fromJsonArray(json: any[]): OrderModel[] {
    return json.map(OrderModel.fromJSON);
  }

  public toJSON(): object {
    return FirebaseUtils.prepareObject(this);
  }

  constructor() {
    this.id = null;
    this.roomId = null;
    this.is_passed = false;
    this.bookerData = new BookerInfoModel();
  }
}
