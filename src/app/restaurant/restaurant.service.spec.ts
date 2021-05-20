import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { RestaurantService } from './restaurant.service';

// let fakeStates = {
//   "data":
//   [{"short":"IL","name":"Illinois"},
//   {"short":"WI","name":"Wisconsin"},
//   {"short":"MI","name":"Michigan"}
// ]};

describe('RestaurantService', () => {
  let restaurantService: RestaurantService;
  //let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        RestaurantService
      ]
    });

    restaurantService = TestBed.get(RestaurantService);
    //httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(restaurantService).toBeTruthy();
  });
});
