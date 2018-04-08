import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
import { NgZone } from '@angular/core';
import "rxjs/add/operator/take";


@Injectable()
export class GetdetailService {
  //define behaviorsubject
  url = 'http://nearby-search.mpnpsaczki.us-west-1.elasticbeanstalk.com/detail?place_id=';
  public _detail: BehaviorSubject<any>;
  public detail: Observable<any>;
  map:google.maps.Map;
  public place_id:string;

  //map:google.maps.Map;
  constructor(private http:HttpClient, private ngZone:NgZone, private _mapsAPILoader: MapsAPILoader){
    this._detail = new BehaviorSubject<any>([]);
    this.detail = this._detail.asObservable();
    this.place_id = 'not received';


    //empty map
    this._mapsAPILoader.load().then(() => {
      this.map = new google.maps.Map(document.createElement('div'));
    });
  }

  clearResult(){
    this._detail.next({});
  }

  fetchResults(input:string){
    this.place_id = input;
    this._mapsAPILoader.load().then(() => {
      this.http.get(this.url+input).subscribe(data=>{
        var service = new google.maps.places.PlacesService(this.map);
        service.getDetails({placeId:data['place_id']},(place,status)=>{
          if(status == google.maps.places.PlacesServiceStatus.OK){
            let photos = place.photos;
            if(!photos){ 
              console.log('no photos'); 
              this.ngZone.run(()=>this._detail.next(Object.assign({}, data)));
            }
            else
            {
              for(let i in place.photos){
                let newPhoto = photos[i].getUrl({'maxWidth': 750, 'maxHeight': 750});
                data['photorefs'].push(newPhoto);
                console.log('photoadded');
              }
              this.ngZone.run(()=>this._detail.next(Object.assign({}, data)));
              console.log(this.detail);
            }
          }
        });
      });
    });
  }
}