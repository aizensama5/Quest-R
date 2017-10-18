import { AvailableHoursModel } from './available-hours.model';
import {FirebaseUtils} from '../shared/firebase.utils';

export class DaysModel {
  id: number;
  roomId: number;
  weekDay: string;
  availableHours: AvailableHoursModel[];

  constructor () {
    this.id = null;
    this.roomId = null;
    this.weekDay = '';
    this.availableHours = [];
  }
}
