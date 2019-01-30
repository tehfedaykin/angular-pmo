import { Component, OnInit, Input } from '@angular/core';
import {  Order } from '../order.service';


@Component({
  selector: 'pmo-order-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class OrderListComponent implements OnInit {
  @Input() orders: [];
  @Input() listTitle: string;
  @Input() status: string;
  @Input() statusTitle: string;
  @Input() action: string;
  @Input() actionTitle: string;
  @Input() emptyMessage: string;
  isPending: boolean = false;
  constructor() { }

  ngOnInit() {

  }

  markAs() {

  }
  
  delete(order:Order) {
    console.log('deleting', order);
  }

}
