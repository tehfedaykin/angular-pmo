import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { RestaurantService } from '../restaurant.service';
import { Restaurant } from '../restaurant';

@Component({
  selector: 'pmo-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class RestaurantDetailComponent implements OnInit {
  restaurant?: Restaurant;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private restaurantService: RestaurantService
  ) { }

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug') as string;
    this.restaurantService.getRestaurant(slug)
     .subscribe((data: Restaurant) => {
       this.restaurant = data;
       this.isLoading = false;
      });
  }

  getUrl(image: string): string {
    return image.replace('node_modules/place-my-order-assets', './assets');
  }

}
