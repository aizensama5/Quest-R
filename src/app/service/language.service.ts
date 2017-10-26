import { Injectable} from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { HttpService } from "./http/http.service";

@Injectable()
export class LanguageService {
  private static readonly dataBaseName = 'language/';
  public currentLang: string = 'en';
  private translations: any;
  public langsObj: any = [
    {
      langKey: 'def'
    },
    {
      langKey: 'en'
    },
    {
      langKey: 'pl'
    }
  ];

  constructor(
    private databaseService: AngularFireDatabase,
    private httpService: HttpService
  ) {

  }

  addTranslatedDep(langKey: string, language: string): Promise<void> {
    return <Promise<void>>this.databaseService
      .object(LanguageService.dataBaseName + language + '/' + langKey).set(langKey);
  }

  all(): FirebaseListObservable<any[]> {
    return <FirebaseListObservable<any[]>>this.databaseService
      .list(LanguageService.dataBaseName);
  }

  allByLanguage(language: string): FirebaseListObservable<any[]> {
    return <FirebaseListObservable<any[]>>this.databaseService
      .list(LanguageService.dataBaseName + language);
  }




}
