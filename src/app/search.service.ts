import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { Observable } from 'rxjs/Observable';
@Injectable()
export class SearchService {
  //url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=5000&types=food&name=harbour&key=AIzaSyD-iAfq93nOWgS24ZXO4VhAAx8uWsVfiEw';
  url = 'http://nearby-search.mpnpsaczki.us-west-1.elasticbeanstalk.com/search';
  nexturl = 'http://nearby-search.mpnpsaczki.us-west-1.elasticbeanstalk.com/searchnext';
  calledNum:number;
  constructor(private http: HttpClient){
    this.calledNum = 0;
  }

  getResults(postObj){
    this.calledNum = this.calledNum+1;
    console.log(postObj);
    // return this.http.post<SearchObj>(this.url, postObj);
    let getStr = this.url+'?location='+postObj.location+'&radius='+postObj.radius+'&types='+postObj.types+'&keyword='+postObj.keyword;
    console.log(getStr);
    return this.http.get<SearchObj>(getStr);
  }

  getNextResult(pagetoken){
    this.calledNum = this.calledNum+1;
    console.log('pagetoken is '+pagetoken);
    return this.http.get<SearchObj>(this.nexturl+'?pagetoken='+pagetoken);
  }


}

interface result{
  index:number;
  lat:number;
  lng:number;
  icon:string;
  place_id:string;
  address:string;
}

interface objectArray{
  [index:number]:result;
}


export interface SearchObj{
  results?:objectArray;
  error:string;
  next_page_token?:string;
}
