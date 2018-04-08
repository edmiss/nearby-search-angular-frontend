import { Component, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { SearchService } from './search.service';
import { } from '@types/googlemaps';
import { GetdetailService } from './getdetail.service';
import { GetLocalLocationService } from './get-local-location.service';
import { GetInputLocationService } from './get-input-location.service';
import { DisplayService } from './display.service';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { ConvertTimeService } from './convert-time.service';
import { FavouriteService } from './favourite.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations:[
    trigger('toggle-left', [
      state('active', style({display:'block', opacity: 1, transform : 'translateX(0)'})),
      state('inactive', style({display:'none',opacity: 0,transform : 'translateX(-50px)'})),
      transition('inactive => active', animate('0.2s 200ms', style({opacity:1,transform : 'translateX(0px)'}))),
      transition('active => inactive', animate(200, style({opacity:0,transform : 'translateX(-50px)'})))
    ]),
    trigger('toggle-right', [
      state('active', style({display:'block', opacity: 1, transform : 'translateX(0)'})),
      state('inactive', style({display:'none',opacity: 0,transform : 'translateX(50px)'})),
      transition('inactive => active', animate('0.2s 200ms', style({opacity:1,transform : 'translateX(0px)'}))),
      transition('active => inactive', animate(200, style({opacity:0,transform : 'translateX(50px)'})))
    ])
  ]
})

export class AppComponent {

show = false;

get stateName(){
  return this.show? 'active':'inactive'
}

toggle(){
  this.show = !this.show;
  console.log(this.stateName);
}



  @ViewChild('gmap') gmapElement:any;
  title = 'Travel and Enterrtainment Search';
  map:google.maps.Map;
  detailResult:Observable<any>;
  searchResult:any;
  localLat:number;
  localLng:number;
  locError:boolean = false;
  
  constructor(public search: SearchService, 
              public detail : GetdetailService, 
              public localLocation : GetLocalLocationService,
              public inputLocation: GetInputLocationService,
              public display:DisplayService,
              public convertTime:ConvertTimeService,
              public favourite:FavouriteService){

    this.localLocation.getResponse().subscribe(data=>{
      this.localLat = data['latitude'];
      this.localLng = data['longitude'];
    });

    this.detailResult = this.detail.detail;
  }

  ngOnInit(){
    this.searchResult = {error : 'unload'};
    this.favourite.load();
    // this.detail.fetchResults("ChIJezN24o28woARcqiE5XHiRhc");
    // this.display.showDetail();
  }
  
  processForm(form){
    this.searchResult = {error : 'unload'};
    console.log(this.display.searchState);
    let reqObj = {};
    reqObj['keyword'] = form.value.keyword;
    reqObj['radius'] = (form.value.radius == null || typeof form.value.radius!='number' || form.value.radius>31 || form.value.radius<=0 )? 10: form.value.radius;
    reqObj['types'] = form.value.types;
    if(form.value.from == 'here'){
      this.display.showSearch();
      this.locError = false;
      this.inputLocation.clearInput();
      reqObj['location'] = this.localLat+','+this.localLng;
      this.search.getResults(reqObj).subscribe(data=>{
        console.log(data);
        this.searchResult = data;
      });
    }
    else{
      //using geolocation get the location then post
      this.inputLocation.getResult(form.value.location).subscribe(
        loc=>{
          console.log(loc);
          if(loc['error']){
            this.locError = true;
            this.display.showSearch();
            console.log(this.locError);
            return;
          }
          else{
            this.display.showSearch();
          reqObj['location'] = loc;
          this.locError = false;

           this.search.getResults(reqObj).subscribe(data=>{
             this.searchResult = data;
           });
          }

        }
      );

    }
  }
}
