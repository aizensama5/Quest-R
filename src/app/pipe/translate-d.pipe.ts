import { Pipe, PipeTransform } from '@angular/core';
import { LanguageService } from "../service/language.service";
import { ActivatedRoute } from "@angular/router";
import {LanguageModel} from "../models/language.model";

@Pipe({
  name: 'translateD'
})
export class TranslateDPipe implements PipeTransform {
  currentLanguage: string;

  constructor(
    public activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.data.subscribe((data) => {
      this.currentLanguage = data['locale'];
    });
  }

  transform(value: LanguageModel): string {
    return value[this.currentLanguage] ? value[this.currentLanguage] : value.def;
  }

}
