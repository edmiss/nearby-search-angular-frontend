import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { KeywordComponent } from './keyword/keyword.component';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { SearchService } from './search.service';
import { HttpClientModule } from '@angular/common/http';
import { GetdetailService } from './getdetail.service';
import { SearchFormComponent } from './search-form/search-form.component';
import { FormsModule } from '@angular/forms';
import { GetLocalLocationService } from './get-local-location.service';
import { GetInputLocationService } from './get-input-location.service';
import { ResultTableComponent } from './result-table/result-table.component';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { DetailBtnComponent } from './detail-btn/detail-btn.component';
import { DisplayService } from './display.service';
import { DetailTableComponent } from './detail-table/detail-table.component';
import { FavouriteTableComponent } from './favourite-table/favourite-table.component';
import { ConvertTimeService } from './convert-time.service';
import { ParseOpenPeriodsPipe } from './parse-open-periods.pipe';
import { SinglePeriodPipe } from './single-period.pipe';
import { FormatTimePipe } from './format-time.pipe';
import { InfoComponent } from './info/info.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { PhotosComponent } from './photos/photos.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';
import { LockerModule, Locker, DRIVERS } from 'angular-safeguard';
import { FavouriteService } from './favourite.service';
import { FavouriteBtnComponent } from './favourite-btn/favourite-btn.component';

@NgModule({
  declarations: [
    AppComponent,
    KeywordComponent,
    SearchFormComponent,
    ResultTableComponent,
    DetailBtnComponent,
    DetailTableComponent,
    FavouriteTableComponent,
    ParseOpenPeriodsPipe,
    SinglePeriodPipe,
    FormatTimePipe,
    InfoComponent,
    ReviewsComponent,
    PhotosComponent,
    FavouriteBtnComponent
  ],
  imports: [
    BrowserModule,
    GooglePlaceModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    NgbModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD-iAfq93nOWgS24ZXO4VhAAx8uWsVfiEw',
      libraries: ["places",'geometry']
    }),
    AgmDirectionModule,
    LockerModule
    ],
    
  providers: [
    SearchService,
    GetdetailService,
    GetLocalLocationService,
    GetInputLocationService,
    DisplayService,
    ConvertTimeService,
    FavouriteService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
