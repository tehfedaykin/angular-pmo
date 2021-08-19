import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, AbstractControl } from '@angular/forms';

import { RestaurantService } from '../restaurant/restaurant.service';
import { Restaurant } from '../restaurant/restaurant';
import { OrderService, Order } from './order.service';
import { Subject } from 'rxjs';
import { takeUntil } from "rxjs/operators";


const minLengthArray = (min: number) => (c: AbstractControl): {[key: string]: any} | null => {
  if (c.value.length >= min) {
    return null;
  }
  return { minLengthArray: {valid: false }};
};

@Component({
  selector: 'pmo-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.less']
})
export class OrderComponent implements OnInit, OnDestroy {
  orderForm!: FormGroup;
  restaurant?: Restaurant;
  isLoading = true;
  orderTotal = 0.0;
  completedOrder?: Order;
  orderComplete = false;
  orderProcessing = false;
  private unSubscribe = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private restaurantService: RestaurantService,
    private orderService: OrderService,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug') as string;

    this.restaurantService.getRestaurant(slug).subscribe((data: Restaurant) => {
      this.restaurant = data;
      this.isLoading = false;
      this.createOrderForm();
    });
  }

  ngOnDestroy(): void {
    this.unSubscribe.next();
    this.unSubscribe.complete();
  }

  createOrderForm() {
    const restaurantId = this.restaurant && this.restaurant._id || null;
    this.orderForm = this.formBuilder.group({
      restaurant: [restaurantId],
      name: [null],
      address:  [null],
      phone: [null],
      items: [[], minLengthArray(1)]
    });
    this.onChanges();
  }

  onChanges() {
    this.orderForm.get('items')?.valueChanges.pipe(takeUntil(this.unSubscribe)).subscribe(val => {
      this.orderTotal = this.orderService.getTotal(val);
    });
  }

  onSubmit() {
    this.orderProcessing = true;
    this.orderService.createOrder(this.orderForm.value).subscribe(newOrder => {
      this.completedOrder = newOrder;
      this.orderComplete = true;
      this.orderProcessing = false;
    });
  }

  startNewOrder() {
    this.orderComplete = false;
    this.createOrderForm();
  }

}
