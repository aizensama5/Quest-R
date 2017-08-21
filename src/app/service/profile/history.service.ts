import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HistoryModel } from '../../models/profile/history.model';

@Injectable()
export class HistoryService {
  private historyData: HistoryModel[] = [
    {
      roomName: 'SCHRON BANKOWY',
      date: '2017-03-23',
      passingTime: '00:45:06',
      review: 'Добавить отзыв',
      photo: 'Добавить фото'
    },
    {
      roomName: 'MIDNIGHT KILLER MK II',
      date: '2017-02-09',
      passingTime: '00:49:40',
      review: 'Читать отзыв',
      photo: 'Смотреть фото'
    },
    {
      roomName: 'FANTAZJA',
      date: '2016-12-14',
      passingTime: '00:55:31',
      review: 'Добавить отзыв',
      photo: 'Смотреть фото'
    }
  ];

  /**
   * Get all histories.
   * @returns <Observable<HistoryModel[]>>
   */
  all(): Observable<HistoryModel[]> {
    return Observable.of(this.historyData);
  }

  constructor() {
  }

}
