import { Component, OnInit, Input } from '@angular/core';
import { Order, OrderService } from '../order.service';


@Component({
  selector: 'pmo-order-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class OrderListComponent implements OnInit {
  @Input() orders?: [];
  @Input() listTitle?: string;
  @Input() status?: string;
  @Input() statusTitle?: string;
  @Input() action?: string;
  @Input() actionTitle?: string;
  @Input() emptyMessage?: string;
  isPending = false;

  constructor(private orderService: OrderService) { }

  ngOnInit() {}

  markAs(order: Order, action: string) {
    this.orderService.updateOrder(order, action).subscribe(() => {
    });
  }

  delete(id: string) {
    this.orderService.deleteOrder(id).subscribe(() => {
    });
  }

  total(items: []) {
    return this.orderService.getTotal(items);
  }
}
