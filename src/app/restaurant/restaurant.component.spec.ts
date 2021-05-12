import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { of } from 'rxjs';

import { RestaurantService } from './restaurant.service';
import { RestaurantComponent } from './restaurant.component';

let fakeStates = {
  "data":
  [{"short":"IL","name":"Illinois"},
  {"short":"WI","name":"Wisconsin"},
  {"short":"MI","name":"Michigan"}
]};

let fakeCities = {
  "data":
  [{"name":"Chicago","state":"IL"},
  {"name":"Peoria","state":"IL"}]
};

let fakeRestaurants = {
  "data":
  [{"name":"Crab Place",
  "slug":"crab-place",
  "images":
  {"thumbnail":"node_modules/place-my-order-assets/images/3-thumbnail.jpg",
  "owner":"node_modules/place-my-order-assets/images/4-owner.jpg",
  "banner":"node_modules/place-my-order-assets/images/3-banner.jpg"},
  "menu":
  {"lunch":
  [{"name":"Garlic Fries","price":15.99},
  {"name":"Crab Pancakes with Sorrel Syrup","price":35.99},
  {"name":"Ricotta Gnocchi","price":15.99}],
  "dinner":[{"name":"Spinach Fennel Watercress Ravioli","price":35.99},
  {"name":"Roasted Salmon","price":23.99},
  {"name":"Herring in Lavender Dill Reduction","price":45.99}]},
  "address":{"street":"2451 W Washburne Ave","city":"Chicago","state":"IL","zip":"60632"},
  "_id":"30KN1UX5eZ1GTEiR"},
  {"name":"Brunch Restaurant",
  "slug":"brunch-restaurant",
  "images":
  {"thumbnail":"node_modules/place-my-order-assets/images/3-thumbnail.jpg",
  "owner":"node_modules/place-my-order-assets/images/2-owner.jpg",
  "banner":"node_modules/place-my-order-assets/images/3-banner.jpg"},
  "menu":
  {"lunch":[{"name":"Spinach Fennel Watercress Ravioli","price":35.99},
  {"name":"Crab Pancakes with Sorrel Syrup","price":35.99},
  {"name":"Steamed Mussels","price":21.99}],
  "dinner":[{"name":"Truffle Noodles","price":14.99},
  {"name":"Charred Octopus","price":25.99},
  {"name":"Ricotta Gnocchi","price":15.99}]},
  "address":{"street":"1601-1625 N Campbell Ave","city":"Chicago","state":"IL","zip":"53205"},
  "_id":"AAwDVaoNge824m8N"},
  {"name":"Pig Shack",
  "slug":"pig-shack",
  "images":{"thumbnail":"node_modules/place-my-order-assets/images/4-thumbnail.jpg",
  "owner":"node_modules/place-my-order-assets/images/3-owner.jpg",
  "banner":"node_modules/place-my-order-assets/images/2-banner.jpg"},
  "menu":{"lunch":[{"name":"Crab Pancakes with Sorrel Syrup","price":35.99},
  {"name":"Onion fries","price":15.99},
  {"name":"Charred Octopus","price":25.99}],
  "dinner":[{"name":"Gunthorp Chicken","price":21.99},
  {"name":"Spinach Fennel Watercress Ravioli","price":35.99},
  {"name":"Garlic Fries","price":15.99}]},
  "address":{"street":"1601-1625 N Campbell Ave","city":"Chicago","state":"IL","zip":"53205"},
  "_id":"KPL90tWDr9REhn8U"}]
}

class MockRestaurantService {
  getStates() {
    return of(fakeStates);
  }

  getCities() {
    return of(fakeCities);
  }

  getRestaurants() {
    return of(fakeRestaurants)
  }
}

describe('RestaurantComponent', () => {
  let component: RestaurantComponent;
  let fixture: ComponentFixture<RestaurantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ RestaurantComponent ],
      imports: [ReactiveFormsModule, RouterModule],
      providers: [
        { provide: RestaurantService, useClass: MockRestaurantService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get a list of states', () => {
    expect(component.states.value).toEqual([{"short":"IL","name":"Illinois"},
    {"short":"WI","name":"Wisconsin"},
    {"short":"MI","name":"Michigan"}])
  });

  it('should enable the state input when states have been fetched', () => {
    expect(component.form.get('state').enabled).toBeTruthy();
  });

  it('should enable the cities input when state has a value', () => {
    component.form.get('state').patchValue('IL');
    expect(component.form.get('city').enabled).toBeTruthy();
  });

  it('should fetch a list of cities when state has a value', () => {
    component.form.get('state').patchValue('IL');
    expect(component.cities.value).toEqual([{"name":"Chicago","state":"IL"},
    {"name":"Peoria","state":"IL"}])
  });

  it('should fetch a list of restaurants when state and city have values', () => {
    component.form.get('state').patchValue('IL');
    component.form.get('city').patchValue('Chicago');
    expect(component.restaurants.value).toEqual(fakeRestaurants.data)
  });
});
