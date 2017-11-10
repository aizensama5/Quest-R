import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { OrderService } from "./http/order.service";
import {OrderModel} from "../models/order.model";

@Injectable()
export class EditBookingResolverService {

  constructor(public orderService: OrderService) {}

  resolve(
    router: ActivatedRouteSnapshot
  ): Observable<any>|Promise<any>|any {
    return new Promise((resolve, reject) => {
      const orderId = router.params.id;
      const roomId = orderId.split('_')[0];
      this.orderService.orderById(roomId, orderId).subscribe((orderInfo: OrderModel[]) => {
        console.log(orderInfo);
        resolve(orderInfo[0]);
      })
    });
  }

}
