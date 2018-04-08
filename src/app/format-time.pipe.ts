import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'formatTime'
})
export class FormatTimePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(typeof value == 'number')
      return moment.unix(value).format('YYYY-MM-DD HH:mm:ss');
    else if (typeof value =='string')
      return moment(value).format('YYYY-MM-DD HH:mm:ss');
  }

}
