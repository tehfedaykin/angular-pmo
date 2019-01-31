import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDetailsComponent } from './details.component';

let fakeOrder = {
  address: "285 W Adams Ave",
  phone: '555-555-5555',
  items: [
    {name: "Spinach Fennel Watercress Ravioli", price: 35.99}, 
    {name: "Truffle Noodles", price: 14.99},
  ],
  name: "Justin Meyer",
  slug: "cheese-curd-city",
  status: "delivered",
  _id: "2CM3Qbs5toq3Dq0x"
};
describe('OrderDetailsComponent', () => {
  let component: OrderDetailsComponent;
  let fixture: ComponentFixture<OrderDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.order = fakeOrder;
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });
});
