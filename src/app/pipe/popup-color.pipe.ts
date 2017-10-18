import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'popupColor'
})
export class PopupColorPipe implements PipeTransform {

  transform(value: boolean): string {
    return value ? '#1AB360' : '#c21313';
  }

}
