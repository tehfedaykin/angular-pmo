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
      console.log(res.data);
      this.orders.value = res.data;
    })
  }

}
