import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateToWord'
})
export class TruncateToWordPipe implements PipeTransform {
  transform(value: String, args?: any): any {
    let trimmedString = value.substr(0, args);

    trimmedString = trimmedString.substr(
      0,
      Math.min(trimmedString.length, trimmedString.lastIndexOf(' '))
    );
    return trimmedString;
  }
}
