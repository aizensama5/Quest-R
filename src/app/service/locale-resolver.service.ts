import { Injectable } from '@angular/core';
import {Router, RouterStateSnapshot, UrlSegment} from "@angular/router";
import { Observable } from "rxjs/Observable";
import { LanguageService } from "./language.service";

@Injectable()
export class LocaleResolverService {

  constructor(public languageService: LanguageService) {
  }

  resolve(
    state: RouterStateSnapshot,
    router: Router
  ): Observable<any> | Promise<any> | any {
    switch (router.url.split('/')[1] || '') {
      case 'en':
        return new Promise((resolve) => {
          resolve('en');
        });
      case 'pl':
        return new Promise((resolve) => {
          resolve('pl');
        });
      default:
        return new Promise((resolve) => {
          this.languageService.getCurrentLocale().subscribe((response: any) => {
            resolve(response[0].$value);
          });
        });
    }
  }
}

