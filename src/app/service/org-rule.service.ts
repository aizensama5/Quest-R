import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Injectable()
export class OrgRuleService {
  private static readonly dataBaseName = 'org-rule';

  constructor(private databaseService: AngularFireDatabase) {}

  changeOrgRule(orgRule: string): Promise<void> {
    return <Promise<void>>this.databaseService.object(OrgRuleService.dataBaseName).set(orgRule);
  }

  getOrgRules(): FirebaseListObservable<string[]> {
    return <FirebaseListObservable<string[]>>this.databaseService
      .list(OrgRuleService.dataBaseName);
  }
}
