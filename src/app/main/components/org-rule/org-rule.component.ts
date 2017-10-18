import { Component } from '@angular/core';
import { OrgRuleService } from '../../../service/org-rule.service';

@Component({
    moduleId: module.id,
    selector: 'app-main-org-rule',
    templateUrl: 'org-rule.component.html',
    styleUrls: ['org-rule.component.scss']
})
export class OrgRuleComponent {
    orgRules: string[] = [];
    constructor(orgRuleService: OrgRuleService) {
      orgRuleService.getOrgRules().subscribe((orgRules: string[]) => {
        this.orgRules = orgRules;
        this.orgRules = this.orgRules.map((rule: any) => {
          return rule.$value;
        });
      });
    }

}
