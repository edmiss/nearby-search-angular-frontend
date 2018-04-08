import { Component, NgZone, OnInit, NgModule, Output, EventEmitter, Input,ViewChild  } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
import { ElementRef } from '@angular/core';
import { GetdetailService } from '../getdetail.service';
import { DisplayService } from '../display.service';



@Component({
  selector: 'search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {


  @ViewChild ("autocomplete")
  public searchElementRef: ElementRef;

  keyword:string = '';
  types:string = 'default';
  radius:number = null;
  from:string = 'here';
  location:string = '';
  displayInput:boolean;
  @Input() lat:number;
  @Input() lng:number;
  @Output() emitter = new EventEmitter<boolean>();

  constructor(private mapsAPILoader: MapsAPILoader,private ngZone:NgZone, private getDetail:GetdetailService, private display:DisplayService) {

  }

  search(f){
    this.emitter.emit(f);
  }

  ngOnInit() {
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener('place_changed',()=>{
        let place = autocomplete.getPlace();
        this.ngZone.run(
          ()=>{
            this.location = place.formatted_address;
          });
      });
    });
  }

  clearAll(){
    this.display.showNone();
    this.getDetail._detail.next({});
    this.getDetail.place_id = '';
  }

  keywordTrimCheck(){
    if(!this.keyword)
    return false;
    if(typeof this.keyword == 'undefined'||this.keyword == null)
    return false;
    if(this.keyword.trim() == '')
    return false;
    else
    return true;
  }

  locationTrimCheck(){

    if(!this.location)
    return false;
    if(typeof this.location == 'undefined'||this.location == null)
    return false;
    if(this.location.trim() == '')
    return false;
    else{
      return true;
    }
    
  }

}
