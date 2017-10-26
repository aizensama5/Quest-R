import { Component } from '@angular/core';
import { OrgRuleService } from '../../../service/org-rule.service';
import { LanguageModel } from "../../../models/language.model";

@Component({
    moduleId: module.id,
    selector: 'app-main-org-rule',
    templateUrl: 'org-rule.component.html',
    styleUrls: ['org-rule.component.scss']
})
export class OrgRuleComponent {
    orgRules: LanguageModel[] = [];
    constructor(orgRuleService: OrgRuleService) {
      orgRuleService.getOrgRules().subscribe((orgRules: LanguageModel[]) => {
        this.orgRules = orgRules;
      });
    }

}
