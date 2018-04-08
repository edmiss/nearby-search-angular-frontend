import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'singlePeriod'
})
export class SinglePeriodPipe implements PipeTransform {

  transform(value: string, args?: any): string {
    let newArr = value.split(': ');
    return newArr[1];
  }

}
