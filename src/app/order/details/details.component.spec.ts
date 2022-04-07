import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDetailsComponent } from './details.component';
import {ItemTotalPipe} from "../../shared/item-total.pipe";

describe('OrderDetailsComponent', () => {
  let component: OrderDetailsComponent;
  let fixture: ComponentFixture<OrderDetailsComponent>;

  let fakeOrder: any;

  beforeEach(() => {

    fakeOrder = {
      address: '285 W Adams Ave',
      phone: '555-555-5555',
      items: [
        {name: 'Spinach Fennel Watercress Ravioli', price: 35.99},
        {name: 'Truffle Noodles', price: 14.99},
      ],
      name: 'Justin Meyer',
      slug: 'cheese-curd-city',
      status: 'delivered',
      _id: '2CM3Qbs5toq3Dq0x'
    };

  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ],
      declarations: [ OrderDetailsComponent, ItemTotalPipe ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderDetailsComponent);
    component = fixture.componentInstance;
    component.order = fakeOrder;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.order = fakeOrder;
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });
});
