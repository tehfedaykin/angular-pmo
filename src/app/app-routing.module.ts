import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { RestaurantComponent } from './restaurant/restaurant.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  //{ path: '',   redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'restaurants',
    component: RestaurantComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
