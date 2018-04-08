import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from  'rxjs/Observable';

@Injectable()
export class GetLocalLocationService {

  constructor(private http:HttpClient) { 
  }

  getResponse(){
    return this.http.get('https://ipapi.co/json/');
  }


}
