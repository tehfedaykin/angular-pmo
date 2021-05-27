import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderService } from '../order.service';

import { OrderDetailsComponent } from './details.component';

describe('OrderDetailsComponent', () => {
  let component: OrderDetailsComponent;
  let fixture: ComponentFixture<OrderDetailsComponent>;

  let orderServiceSpy: jasmine.SpyObj<OrderService>;
  let fakeOrder: any;

  beforeEach(() => {
    orderServiceSpy = jasmine.createSpyObj('OrderService', ['getTotal']);
    orderServiceSpy.getTotal.and.returnValue(2);

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
      declarations: [ OrderDetailsComponent ],
      providers: [
        {provide: OrderService, useValue: orderServiceSpy}
      ]
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
