import { BrowserModule } from '@angular/platform-browser';
import { DEFAULT_CURRENCY_CODE, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { TabsModule } from 'ngx-bootstrap/tabs';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { HomeComponent } from './home/home.component';
import { RestaurantDetailComponent } from './restaurant/detail/detail.component';
import { ImageUrlPipe } from './shared/image-url.pipe';
import { OrderComponent } from './order/order.component';
import { OrderDetailsComponent } from './order/details/details.component';
import { MenuItemsComponent } from './order/menu-items/menu-items.component';
import { OrderListComponent } from './order/list/list.component';
import { OrderHistoryComponent } from './order/history/history.component';
import { OnlyNumbersDirective } from './shared/only-numbers.directive';
import { ItemTotalPipe } from './shared/item-total.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    RestaurantComponent,
    HomeComponent,
    RestaurantDetailComponent,
    ImageUrlPipe,
    OrderComponent,
    OrderDetailsComponent,
    MenuItemsComponent,
    OrderListComponent,
    OrderHistoryComponent,
    OnlyNumbersDirective,
    ItemTotalPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    TabsModule.forRoot()
  ],
  providers: [
    ItemTotalPipe,
    {provide: DEFAULT_CURRENCY_CODE, useValue: 'USD'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
