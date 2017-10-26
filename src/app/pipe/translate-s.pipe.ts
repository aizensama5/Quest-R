import { Pipe, PipeTransform } from '@angular/core';
import { HttpService } from "../service/http/http.service";

@Pipe({
  name: 'translateS'
})
export class TranslateSPipe implements PipeTransform {
  currentLanguage: string = 'pl';

  constructor(private httpService: HttpService) {}

  transform(value: string) {
    return this.translate(value);
  }

  translate(value: string) {
    return this.httpService.getTranslationsJSON(value, this.currentLanguage);
  }

}
