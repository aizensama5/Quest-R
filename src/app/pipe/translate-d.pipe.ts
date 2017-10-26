import { Pipe, PipeTransform } from '@angular/core';
import { LanguageService } from "../service/language.service";
import {HttpService} from "../service/http/http.service";

@Pipe({
  name: 'translateD'
})
export class TranslateDPipe implements PipeTransform {
  currentLang: string;

  constructor(
    public languageService: LanguageService,
    ) {
    this.currentLang = languageService.currentLang;
    console.log(this.currentLang);
  }

  transform(value: string): string {
    return '';
    // return this.languageService.getTranslated(value, this.currentLang)[0];
  }

}
