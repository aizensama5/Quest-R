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

  orderById(roomId: number, orderId: string): FirebaseListObservable<OrderModel[]> {
    return <FirebaseListObservable<OrderModel[]>>this.dataBaseService
      .list(OrderService.dataBaseName + roomId, {
        query: {
          orderByChild: 'id',
          equalTo: orderId
        }
      });
  }

  roomOrders(roomId: number): FirebaseListObservable<OrderModel[]> {
    return <FirebaseListObservable<OrderModel[]>>this.dataBaseService
      .list(OrderService.dataBaseName + roomId);
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

  all(): FirebaseListObservable<any[]> {
    return <FirebaseListObservable<any[]>>this.dataBaseService
      .list(OrderService.dataBaseName)
  }
}
