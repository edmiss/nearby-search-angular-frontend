import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'parseOpenPeriods'
})
export class ParseOpenPeriodsPipe implements PipeTransform {

  transform(values: string[], localDay: number): any {
    let newArray = [];
    let array2 = values.slice(0,localDay);
    let array1 = values.slice(localDay);

    for(let i = 0; i<array1.length;i++)
    {
      newArray.push(array1[i].split(': '));
    }
    for(let j = 0; j<array2.length;j++)
    {
      newArray.push(array2[j].split(': '));
    }

    console.log(newArray);
    return newArray;


  }

}
