import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class GetInputLocationService {

  inputAddress: string = 'Your Location';
  constructor(private http:HttpClient) { }
  url = 'http://nearby-search.mpnpsaczki.us-west-1.elasticbeanstalk.com/geocoding?address=';
  url2 = '';

  getResult(address){
    //console.log(postObj);
    this.inputAddress = address;
    return this.http.get<string>(this.url+address);
  }

  clearInput(){
    this.inputAddress ='Your Location';
  }
 

}
