import { Component, OnInit } from '@angular/core';
import { DescriptionService } from '../../../service/description.service';
import { LanguageModel } from "../../../models/language.model";
import { LoaderService } from "../../../service/loader.service";

@Component({
    moduleId: module.id,
    selector: 'app-main',
    templateUrl: 'main.component.html',
    styleUrls: ['main.component.scss']
})
export class MainComponent implements OnInit {
  description: LanguageModel = new LanguageModel();
  constructor(
    public descService: DescriptionService,
    public loaderService: LoaderService
  ) {
    this.loaderService.show();
    descService.getCurrentDescription().subscribe((description: LanguageModel[]) => {
      this.description = description[0];
    });
  }

  ngOnInit() {
    this.loaderService.hide(2500);
  }
}
