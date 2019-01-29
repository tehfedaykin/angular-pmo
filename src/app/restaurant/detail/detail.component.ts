import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
//import { switchMap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';

import { RestaurantService, Config } from '../restaurant.service';
import { Restaurant } from '../restaurant';

@Component({
  selector: 'pmo-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  isPending$: BehaviorSubject<boolean> = new BehaviorSubject(true);
  restaurant$: Observable<Config<Restaurant>>;
  restaurant: Config<Restaurant>;
  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute, 
    private restaurantService: RestaurantService
  ) { }

  ngOnInit() {
    // this.restaurant$ = this.route.paramMap.pipe(
    //   switchMap((params: ParamMap) =>
    //     this.restaurantService.getRestaurant(params.get('slug')))
    // );

    const slug = this.route.snapshot.paramMap.get('slug');
    this.restaurantService.getRestaurant(slug)
     .subscribe((data:Config<Restaurant>) => {
       this.restaurant = data;
       this.isLoading = false;
      });
  }

  getUrl(image:string): string {
    return image.replace('node_modules/place-my-order-assets', './assets')
  }

}
