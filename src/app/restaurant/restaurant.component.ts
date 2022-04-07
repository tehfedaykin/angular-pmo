import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';

import { RestaurantService, Config, City, State } from './restaurant.service';
import { Restaurant } from './restaurant';
import { takeUntil, tap } from 'rxjs/operators';

export interface Data<T> {
  value: Array<T>;
  isPending: boolean;
}

@Component({
  selector: 'pmo-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.less'],
})
export class RestaurantComponent implements OnInit, OnDestroy {
  form!: FormGroup;

  public restaurants: Data<Restaurant> = {
    value: [],
    isPending: false,
  };
  public states: Data<State> = {
    value: [],
    isPending: true,
  };

  public cities: Data<City> = {
    value: [],
    isPending: true,
  };

  private unSubscribe = new Subject<void>();

  constructor(
    private restaurantService: RestaurantService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.createForm();
    this.states.isPending = true;
    this.restaurantService.getStates().pipe(
      takeUntil(this.unSubscribe),
      tap((res: Config<State>) => {
        this.states.value = res.data;
        this.states.isPending = false;
        this.form.get('state')?.enable();
      })
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.unSubscribe.next();
    this.unSubscribe.complete();
  }

  createForm() {
    this.form = this.fb.group({
      state: { value: '', disabled: true },
      city: { value: '', disabled: true },
    });

    this.onChanges();
  }

  onChanges(): void {
    let state: string;
    this.form
      .get('state')
      ?.valueChanges.pipe(takeUntil(this.unSubscribe))
      .subscribe((val) => {
        console.log('state', state, val);
        if (val) {
          this.form.get('city')?.enable({
            onlySelf: true,
            emitEvent: false,
          });
          // eslint-disable-next-line eqeqeq
          if (state != val) {
            this.form.get('city')?.patchValue('');
            this.restaurants.value = [];
          }
          this.getCities(val);
          state = val;
        } else {
          this.form.get('city')?.disable({
            onlySelf: true,
            emitEvent: false,
          });
          state = '';
          this.restaurants.value = [];
        }
      });

    this.form
      .get('city')
      ?.valueChanges.pipe(takeUntil(this.unSubscribe))
      .subscribe((val) => {
        if (val) {
          this.getRestaurants(state, val);
        }
      });
  }

  getCities(state: string) {
    this.cities.isPending = true;
    this.restaurantService.getCities(state).pipe(
      takeUntil(this.unSubscribe),
      tap((res: Config<City>) => {
        this.cities.value = res.data;
        this.cities.isPending = false;
        this.form.get('city')?.enable({
          onlySelf: true,
          emitEvent: false
        });
      })
    ).subscribe();
  }

  getRestaurants(state: string, city: string) {
    this.restaurantService
      .getRestaurants(state, city)
      .subscribe((res: Config<Restaurant>) => {
        this.restaurants.value = res.data;
        this.restaurants.isPending = false;
      });
  }
}
