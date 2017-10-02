import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isActive'
})
export class IsActivePipe implements PipeTransform {

  transform(value: boolean): string {
    return value ? 'YES' : 'NO';
  }

}
