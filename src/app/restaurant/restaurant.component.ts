import { Component, OnInit } from '@angular/core';
import { RestaurantService, Config } from './restaurant.service';
import { Restaurant } from './restaurant';

export interface data {
  value: any[];
  isPending: boolean;
}

@Component({
  selector: 'pmo-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.less']
})
export class RestaurantComponent implements OnInit {
  public restaurants: data = {
    value: [],
    isPending: true
  }
  public states: data = {
    value: [],
    isPending: true
  }

  public cities: data = {
    value: [],
    isPending: true
  }

  config: Config;
  constructor(private restaurantService: RestaurantService) {
  }

  ngOnInit() {
    this.restaurants.isPending = true;

    this.restaurantService.getRestaurants().subscribe((res: Config) => {
      this.restaurants.value = res.data;
      this.restaurants.isPending = false;
    });

    this.restaurantService.getStates().subscribe((res: Config) => {
      this.states.value = res.data;
      this.states.isPending = false;
    });
  }

}
