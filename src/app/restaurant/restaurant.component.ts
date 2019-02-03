import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

import { RestaurantService, Config, City, State } from './restaurant.service';
import { Restaurant } from './restaurant';

export interface Data<T> {
  value: Array<T>;
  isPending: boolean;
}

@Component({
  selector: 'pmo-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.less']
})
export class RestaurantComponent implements OnInit, OnDestroy {
  form: FormGroup;
  private subscription: Subscription;

  public restaurants: Data<Restaurant> = {
    value: [],
    isPending: false
  }
  public states: Data<State> = {
    value: [],
    isPending: true
  }

  public cities: Data<City> = {
    value: [],
    isPending: true
  }

  constructor(
    private restaurantService: RestaurantService,
    private fb: FormBuilder
    ) {
  }

  ngOnInit() {
    this.createForm();
    this.states.isPending = true;
    this.restaurantService.getStates().subscribe((res: Config<State>) => {
      this.states.value = res.data;
      this.states.isPending = false;
      this.form.get('state').enable();
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  createForm() {
    this.form = this.fb.group({
      state: {value: '', disabled: true},
      city: {value: '', disabled: true},
    });

    this.onChanges();
  }

  onChanges(): void {
    let state:string;
    let stateChanges = this.form.get('state').valueChanges.subscribe(val => {
      console.log('state', state, val);
      if (val) {
        this.form.get('city').enable({
          onlySelf: true, 
          emitEvent: false
        });
        if (state != val) {
          this.form.get('city').patchValue('');
          this.restaurants.value = [];
        }
        this.getCities(val);
        state = val;
      }
      else {
        this.form.get('city').disable({
          onlySelf: true, 
          emitEvent: false
        });
        state = '';
        this.restaurants.value = [];
      }
    });
    this.subscription = stateChanges;

    let cityChanges = this.form.get('city').valueChanges.subscribe(val => {
      if (val) {
        this.getRestaurants(state, val);
      }
    });
    this.subscription.add(cityChanges)
  }

  getCities(state:string) {
    this.cities.isPending = true;
    this.restaurantService.getCities(state).subscribe((res: Config<City>) => {
      this.cities.value = res.data;
      this.cities.isPending = false;
      this.form.get('city').enable({
        onlySelf: true, 
        emitEvent: false
      });
    });
  }

  getRestaurants(state:string, city:string) {
    this.restaurantService.getRestaurants(state, city).subscribe((res: Config<Restaurant>) => {
      this.restaurants.value = res.data;
      this.restaurants.isPending = false;
    });
  }

}
