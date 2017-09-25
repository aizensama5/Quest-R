import { Component } from '@angular/core';
import { DescriptionService } from '../../../service/description.service';

@Component({
    moduleId: module.id,
    selector: 'app-main',
    templateUrl: 'main.component.html',
    styleUrls: ['main.component.scss']
})
export class MainComponent {
  description = [];
  constructor(public descService: DescriptionService) {
    descService.getCurrentDescription().subscribe((description: any[]) => {
      this.description = description[0].$value;
    });
  }
}
