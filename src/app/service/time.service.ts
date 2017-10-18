import { Injectable } from '@angular/core';

@Injectable()
export class TimeService {

  constructor() { }

  public uniqueIdByTimestamp (date?: string): number {
    if (date) {
      return Date.parse(date);
    } else {
      return Date.now();
    }
  }
}
