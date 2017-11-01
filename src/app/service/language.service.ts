import { Injectable} from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";

@Injectable()
export class LanguageService {
  private static readonly dataBaseName = 'language/';
  public currentLang: string = 'en';
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
    private databaseService: AngularFireDatabase
  ) {}

  changeCurrentLocale(locale: string): Promise<void> {
    return <Promise<void>>this.databaseService
      .object(LanguageService.dataBaseName + 'defaultLocale/').set(locale);
  }

  getCurrentLocale(): FirebaseListObservable<any[]> {
    return <FirebaseListObservable<any[]>>this.databaseService
      .list(LanguageService.dataBaseName);
  }

}
