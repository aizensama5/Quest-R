import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isActive'
})
export class IsActivePipe implements PipeTransform {

  transform(value: boolean): string {
    if (value) {
      return 'YES';
    } else {
      return 'NO';
    }
  }

}
