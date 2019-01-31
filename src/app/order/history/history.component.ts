import { Component, OnInit } from '@angular/core';
import { OrderService, Order } from '../order.service';
import { Config } from '../../restaurant/restaurant.service';
import * as io from 'socket.io-client';

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
  socket: SocketIOClient.Socket;

  constructor(
    private orderService: OrderService
    ) { 
      this.socket = io('http://localhost:7070');
      console.log(this.socket);
    }

  ngOnInit() {
    this.getOrders();

    this.socket.on('orders created', (msg: any) => {
      console.log('created', msg);
      this.getOrders();
    });

    this.socket.on('orders updated', (msg: any) => {
      console.log('updated', msg);
      this.getOrders();
    });

    this.socket.on('orders removed', (msg: any) => {
      console.log('removed', msg);
      this.getOrders();
    });
  }

  getOrders() {
    this.orderService.getOrders().subscribe((res: Config<Order>) => {
      this.orders.value = res.data;
    });
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
