import {Injectable} from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {DaysModel} from '../models/days.model';

@Injectable()
export class DaysSettingsService {
  private static readonly dataBaseName = 'week-days/';
  static readonly weekDays: any[] = [
    {
      id: 1,
      weekDay: 'Monday'
    },
    {
      id: 2,
      weekDay: 'Tuesday'
    },
    {
      id: 3,
      weekDay: 'Wednesday'
    },
    {
      id: 4,
      weekDay: 'Thursday'
    },
    {
      id: 5,
      weekDay: 'Friday'
    },
    {
      id: 6,
      weekDay: 'Saturday'
    },
    {
      id: 7,
      weekDay: 'Sunday'
    }
  ];

  constructor(private databaseService: AngularFireDatabase) {
  }

  addDaySetting(daysSettings: DaysModel): Promise<void> {
    return <Promise<void>>this.databaseService
      .object(DaysSettingsService.dataBaseName + daysSettings.roomId + '_' + daysSettings.id)
      .set(daysSettings);
  }

  all(): FirebaseListObservable<DaysModel[]> {
    return <FirebaseListObservable<DaysModel[]>>this.databaseService
      .list(DaysSettingsService.dataBaseName);
  }

  roomDaysSettings(roomId: number): FirebaseListObservable<DaysModel[]> {
    return <FirebaseListObservable<DaysModel[]>>this.databaseService
      .list(DaysSettingsService.dataBaseName, {
        query: {
          orderByChild: 'roomId',
          equalTo: roomId
        }
      });
  }

  removeHourItem(roomId, dayId, hourId): Promise<void> {
    console.log(roomId, dayId, hourId);
    return <Promise<void>>this.databaseService
      .object(DaysSettingsService.dataBaseName + roomId + '_' + dayId + '/availableHours/' + (hourId - 1))
      .remove();
  }
}
