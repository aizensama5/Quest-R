import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { LanguageModel } from "../models/language.model";

@Injectable()
export class OrgRuleService {
  private static readonly dataBaseName = 'org-rule';

  constructor(private databaseService: AngularFireDatabase) {}

  changeOrgRule(orgRule: LanguageModel): Promise<void> {
    return <Promise<void>>this.databaseService.object(OrgRuleService.dataBaseName).set(orgRule);
  }

  getOrgRules(): FirebaseListObservable<LanguageModel[]> {
    return <FirebaseListObservable<LanguageModel[]>>this.databaseService
      .list(OrgRuleService.dataBaseName);
  }
}
