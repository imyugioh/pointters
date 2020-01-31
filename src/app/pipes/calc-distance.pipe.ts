import { Pipe, PipeTransform } from '@angular/core';
import turf from "@turf/distance";


@Pipe({
  name: 'calcDistance'
})
export class CalcDistancePipe implements PipeTransform {

  transform(value1, value2, value3): any {
    return turf(value2,  value3);
  }

}
