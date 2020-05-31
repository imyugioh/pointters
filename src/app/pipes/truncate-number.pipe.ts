import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateNumber'
})
export class TruncateNumberPipe implements PipeTransform {

  transform(value: number, args?: any): any {
    return Math.trunc(value);
  }

}
