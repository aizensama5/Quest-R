import { Component } from '@angular/core';
import { HistoryModel } from '../../../../models/profile/history.model';
import { HistoryService } from '../../../../service/profile/history.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent {
  historyData: HistoryModel[];

  constructor(historyService: HistoryService) {
   this.historyData = historyService.getHistoryData();
  }
}
