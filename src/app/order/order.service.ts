import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Item {
  name: string;
  price: number;
}

export interface Order {
  _id: string;
  name: string;
  address: string;
  phone: string;
  status: string;
  items: Array<Item>;
  total: number;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient: HttpClient) { }

  getOrders() {
    return this.httpClient.get('/api/orders');
  }

  createOrder(formData: Order) {
    formData.status = 'new';
    return this.httpClient.post('/api/orders', formData)
  }

  deleteOrder() {
    return this.httpClient.delete('/api/orders')
  }

}
