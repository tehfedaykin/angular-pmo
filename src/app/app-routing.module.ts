import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { RestaurantDetailComponent } from './restaurant/detail/detail.component';
import { OrderComponent } from './order/order.component';
import { OrderHistoryComponent } from './order/history/history.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  //{ path: '',   redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'restaurants',
    component: RestaurantComponent,
  },
  {
    path: 'restaurants/:slug',
    component: RestaurantDetailComponent,
  },
  {
    path: 'restaurants/:slug/:order',
    component: OrderComponent,
  },
  {
    path: 'order-history',
    component: OrderHistoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
