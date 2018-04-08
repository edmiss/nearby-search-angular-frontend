import { Component, OnInit, Input, NgZone, ViewChild, ElementRef, ChangeDetectorRef, AfterViewInit, OnChanges } from '@angular/core';
import { GetdetailService } from '../getdetail.service';
import { ConvertTimeService } from '../convert-time.service';
import * as moment from 'moment';
import { Observable } from 'rxjs/Observable';
import "rxjs/add/operator/map";
import { GetLocalLocationService } from '../get-local-location.service';
// import {} from '@types/googlemaps';
import { MapsAPILoader } from '@agm/core';
import { NgForm } from '@angular/forms';
import { GetInputLocationService } from '../get-input-location.service';
import { DisplayService } from '../display.service';
import { AgmMap } from '@agm/core';
import { SearchService } from '../search.service';

@Component({
  selector: 'detail-table',
  templateUrl: './detail-table.component.html',
  styleUrls: ['./detail-table.component.css']
})
export class DetailTableComponent implements OnInit{

  @Input() data:Observable<any>;

  //public searchElementRef: ElementRef;


  @ViewChild ("start")  public searchElementRef: ElementRef;
  @ViewChild('agmMap') public agmMap : AgmMap;

  // funcActivatedByParentComponentOnAccordionOpen() {
  //   this.agmMap.triggerResize();
  // }

  photos: Observable<any>;
  info: Observable<any>;
  reviews: Observable<any>;


  //user location
  localLat:number;
  localLng:number;
  latitude:number;
  longitude:number;
  mapOptions:any;

  placeId:string;
  address:string;
  placeLat:any;
  placeLng:any;
  dir:any;
  panorama:any;

  testLat:number;
  testLng:number;
  showDir:boolean;
  showMarker:boolean;
  result:any;
  
  constructor(private detail:GetdetailService,
     private convertTime:ConvertTimeService,
     public localLocation : GetLocalLocationService,
     private inputLocation : GetInputLocationService,
     private mapsAPILoader: MapsAPILoader,
     private ngZone: NgZone,
     private display:DisplayService,
     private changeDetector: ChangeDetectorRef,
     private search:SearchService
    ) {

  }

  ngOnInit() {



    this.testLat =1;
    this.testLng = 1;

    this.mapOptions = {
      mapTypeId:'HYBRID'
    }
    //setup auto complete


    //reload map
    this.photos = this.data.map(x => x.photorefs);
    this.info = this.data.map(x => x.info);
    this.reviews = this.data.map(x=>x.reviews);
    //for the map
    // this.placeId = this.data.map(x=>x.place_id);
    // this.address =  this.data.map(x=>x.address);
    this.placeLat = this.data.map(x=>x.lat);
    this.placeLng = this.data.map(x=>x.lng);


    //get user local loc, subscribe to the serive
    this.localLocation.getResponse().subscribe(data=>{
      this.localLat = data['latitude'];
      this.localLng = data['longitude'];
    });

    this.data.subscribe(data=>{
      this.placeId = data['place_id'];
      this.address = data['address'];
      this.placeLat = data['lat'];
      this.placeLng = data['lng'];

    //create the result for the favourite btn
    this.result = {
      index : 1,
      name: data['name'],
      icon: data['icon'],
      place_id: data['place_id'],
      address: data['address']
    }


    });


    
  }

  getDirection(mapForm){    
    this.showDir = true;
    this.showMarker = false;
    if(mapForm.value.origin == 'Your Location'){
      this.dir = {
        origin: { lat: this.localLat, lng: this.localLng },
        destination: { lat: this.placeLat, lng: this.placeLng },
        travelMode: mapForm.value.travelMode
      }
    }
    else{
      this.inputLocation.getResult(mapForm.value.origin).subscribe(
        locString=>{
          let locList = locString.split(',');
          this.dir = {
            origin:{lat: parseFloat(locList[0]), lng: parseFloat(locList[1])},
            destination: { lat: this.placeLat, lng: this.placeLng },
            travelMode: mapForm.value.travelMode
          }
        }
      );
    }
  }

  


  hideDirection(){
    this.showDir = false;
  }

  hideMarker(){
    this.showMarker = false;
  }

  enterMap() {
    setTimeout(()=>{ this.agmMap.triggerResize(); },500)
    this.hideDirection();
    this.showMarker = true;

    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener('place_changed',()=>{
        let place = autocomplete.getPlace();
        this.ngZone.run(
          ()=>{
            this.inputLocation.inputAddress = place.formatted_address;
          });
      });
    });
  }

  constructTwitter(){
    let tweetLink = 'https://twitter.com/intent/tweet?text=';

  }


  startCheck(){
    if(!this.inputLocation.inputAddress)
    return false;
    if(typeof this.inputLocation.inputAddress == 'undefined'||this.inputLocation.inputAddress == null)
    return false;
    if(this.inputLocation.inputAddress.trim() == '')
    return false;
    else{
      return true;
    }
  }

  // genPara(){
  //   var map = new google.maps.Map(document.getElementById('dirmap'), {
  //     center: {lat: 40.729884, lng: -73.990988},
  //     zoom: 18,
  //     streetViewControl: false
  //   });

  //     this.panorama = map.getStreetView();
  //     this.panorama.setPosition({lat: 40.729884, lng: -73.990988});
  // }

  // toggleStreetView(){

  //   console.log('button works');
  //   var toggle = this.panorama.getVisible();
  //   if (toggle == false) {
  //     this.panorama.setVisible(true);
  //   } else {
  //     this.panorama.setVisible(false);
  //   }
  // }

}