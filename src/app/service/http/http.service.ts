import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Http } from "@angular/http";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {LanguageService} from "../language.service";

@Injectable()
export class HttpService {

  constructor(
    private http: Http,
  ) {}

  public getTranslationsJSON(value: string, language: string): Observable<string> {
    return value && language ? this.http.get("assets/i18n/translate.json")
      .map((res:any) => res.json()[language][value] || value) : Observable.of(value);
  }
}
