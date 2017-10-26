import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Http } from "@angular/http";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class HttpService {

  constructor(private http: Http) { }

  public getTranslationsJSON(value: string, language: string): Observable<string> {
    return this.http.get("assets/i18n/translate.json")
      .map((res:any) => res.json()[language][value] || value);
  }
}
