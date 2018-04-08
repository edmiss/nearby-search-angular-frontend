import { Injectable } from '@angular/core';
import * as moment from 'moment';
@Injectable()
export class ConvertTimeService {

  constructor() { }

  getCurrentUTC(){
    console.log(moment.utc());
    return moment.utc();
  }

  getCurrentWithUTCOffset(){
    var input = 480;
    
    return moment.utc().utcOffset(input);
  }


  getPlaceDay(utcoffset){
    var output = (moment.utc().utcOffset(utcoffset).day()+6)%7;
    return output;
  }



}
