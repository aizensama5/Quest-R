import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { LanguageService } from "../../service/language.service";
import { LanguageModel } from "../../models/language.model";

@Component({
  selector: 'app-tabset',
  templateUrl: './tabset.component.html',
})
export class LanguageTabsetComponent {
  @Input() useTabsetWithTextarea: boolean;
  @Input() useTabsetWithInput: boolean;
  @Input() tabsetModel: LanguageModel;
  @Output() onTabsetChanged: EventEmitter<LanguageModel> = new EventEmitter<LanguageModel>();

  constructor(public languageService: LanguageService) {}

  onTabsetModelChange(value: any, lang: string) {
    switch (lang) {
      case 'en':
        this.tabsetModel.en = value;
        break;
      case 'pl':
        this.tabsetModel.pl = value;
        break;
      default:
        this.tabsetModel.def = value;
    }
    this.onTabsetChanged.emit(this.tabsetModel);
  }

}
