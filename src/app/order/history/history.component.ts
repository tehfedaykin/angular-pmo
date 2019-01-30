import { Component, OnInit } from '@angular/core';
import { OrderService, Order } from '../order.service';
import { Config } from '../../restaurant/restaurant.service';

interface Data<T> {
  value: Array<T>;
  isPending: boolean;
}

@Component({
  selector: 'pmo-order-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class OrderHistoryComponent implements OnInit {
  public orders: Data<Order> = {
    value: [],
    isPending: true
  }

  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.orderService.getOrders().subscribe((res: Config<Order>) => {
      this.orders.value = res.data;
    })

    //subscribe to events for orders
  }

  get newOrders() {
    let orders =  this.orders.value.filter((order) => {
      return order.status === "new";
    });
    return orders;
  }

   get preparingOrders() {
    let orders =  this.orders.value.filter((order) => {
      return order.status === "preparing";
    });
    return orders;
   }

   get deliveryOrders() {
    let orders =  this.orders.value.filter((order) => {
      return order.status === "delivery";
    });
    return orders;
   }

   get deliveredOrders() {
    let orders =  this.orders.value.filter((order) => {
      return order.status === "delivered";
    });
    return orders;
   }

}
