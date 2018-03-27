import { Pipe, PipeTransform } from '@angular/core';
import { HttpService } from "../service/http/http.service";
import {LanguageService} from "../service/language.service";
import {Observable} from "rxjs/Observable";
import {ActivatedRoute} from "@angular/router";

@Pipe({
  name: 'translateS'
})
export class TranslateSPipe implements PipeTransform {
  currentLanguage: string;

  constructor(
    private httpService: HttpService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.data.subscribe((data) => {
      this.currentLanguage = data['locale'];
    });
  }

  transform(value: string) {
    return this.translate(value);
  }

  translate(value: string) {
    return this.httpService.getTranslationsJSON(value, this.currentLanguage);
  }

}
