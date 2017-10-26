import { Component, OnInit } from '@angular/core';
import { DescriptionService } from '../../../service/description.service';
import { LanguageModel } from "../../../models/language.model";

@Component({
    moduleId: module.id,
    selector: 'app-main',
    templateUrl: 'main.component.html',
    styleUrls: ['main.component.scss']
})
export class MainComponent implements OnInit {
  description: LanguageModel = new LanguageModel();
  constructor(public descService: DescriptionService) {
    descService.getCurrentDescription().subscribe((description: LanguageModel[]) => {
      this.description = description[0];
    });
  }

  ngOnInit() {
    document.body.style.backgroundColor = 'none';
    document.body.style.backgroundImage = 'linear-gradient(214deg, #000000, #2a2c2e 54%, #131313);';
  }
}
