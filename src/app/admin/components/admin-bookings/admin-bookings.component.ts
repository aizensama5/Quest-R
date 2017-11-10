import { Component, OnInit } from '@angular/core';
import { OrderService} from "../../../service/http/order.service";
import { OrderModel} from "../../../models/order.model";
import { DatePipe} from "@angular/common";

@Component({
  selector: 'app-admin-bookings',
  templateUrl: './admin-bookings.component.html',
  styleUrls: ['./admin-bookings.component.scss']
})
export class AdminBookingsComponent implements OnInit {
  ordersData: OrderModel[] = [];
  orders: OrderModel[] = [];
  isShowLoader: boolean;
  isShowNotificationPopup = false;
  notificationPopupMessage = '';
  areErrors: boolean;

  constructor(
    private orderService: OrderService
  ) {
    this.isShowLoader = true;
    this.orderService.all().subscribe((orderData: any[]) => {
      this.ordersData = orderData;
      this.orders = [];
      orderData.forEach((oData: any[]) => {
        for (let o in oData) {
          oData[o].bookingDate = new Date(+oData[o].id.split('_')[1]);
          this.orders.push(oData[o]);
        }
      });
      this.isShowLoader = false;
    });
  }

  ngOnInit() {
  }

  save() {
    let ordersCount = 0;
    this.areErrors = false;
    this.isShowLoader = true;
    this.orders.forEach((order: OrderModel) => {
      this.orderService.addOrder(order)
        .then(() => {
          ordersCount++;
          if (ordersCount === this.orders.length) {
            this.isShowNotificationPopup = true;
            this.isShowLoader = false;
            this.notificationPopupMessage = 'Saved successfully!';
          }
        })
        .catch(() => {
          ordersCount++;
          if (ordersCount === this.orders.length) {
            this.isShowNotificationPopup = true;
            this.isShowLoader = false;
            this.notificationPopupMessage = 'Error!';
          }
        });
    });
  }

  closePopup() {
    this.areErrors = false;
    this.isShowNotificationPopup = false;
    this.notificationPopupMessage = '';
  }

}
