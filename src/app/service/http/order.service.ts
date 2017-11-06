import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { OrderModel } from '../../models/order.model';

@Injectable()
export class OrderService {
  private static readonly dataBaseName = 'order/';

  constructor(private dataBaseService: AngularFireDatabase) {}

  addOrder(order: OrderModel): Promise<void> {
    return <Promise<void>>this.dataBaseService
      .object(OrderService.dataBaseName + order.roomId + '/' + order.id)
      .set(order);
  }

  roomOrders(roomId: number): FirebaseListObservable<OrderModel[]> {
    return <FirebaseListObservable<OrderModel[]>>this.dataBaseService
      .list(OrderService.dataBaseName + roomId)
      .map((items) => items.map(OrderModel.fromJSON));
  }

  userOrders(orderList: OrderModel[], userId: string): OrderModel[] {
    const userOrdersInfo: OrderModel[] = [];
    orderList.forEach((order: OrderModel) => {
      if (order.bookerData.userId === userId && order.is_passed) {
        userOrdersInfo.push(order);
      }
    });
    return userOrdersInfo;
  }

  all(): FirebaseListObservable<OrderModel[]> {
    return <FirebaseListObservable<OrderModel[]>>this.dataBaseService
      .list(OrderService.dataBaseName)
      .map((items) => items.map(OrderModel.fromJSON));
  }
}
