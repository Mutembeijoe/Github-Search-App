import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'summary'
})
export class SummaryPipe implements PipeTransform {

  transform(value: string, length: number): any {
    if (!value) {
      return null;
    } else {
      const lastIndex =  length ? length : 70;
      if (value.length < 70 ) {
        return value;
      } else {
        return `${value.substr(0, lastIndex )}....`;
      }
    }
  }

}
