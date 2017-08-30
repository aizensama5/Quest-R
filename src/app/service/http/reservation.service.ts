import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ReservationModel } from '../../models/reservation.model';
import { TimeModel } from '../../models/time.model';

@Injectable()
export class ReservationService {
  daysInWeek = 7;
  private reservationData: ReservationModel[] = [
    {
      day: '05/03',
      time: [
        {
          timeSlotId: 1,
          time: '10:00',
          is_past: true,
          is_booked: true,
          is_bought: true,
          price: 80,
          currency: 'złoty',
          background: '#949494'
        },
        {
          timeSlotId: 2,
          time: '11:45',
          is_past: true,
          is_booked: true,
          is_bought: false,
          price: 80,
          currency: 'złoty',
          background: '#949494'
        },
        {
          timeSlotId: 3,
          time: '13:30',
          is_past: true,
          is_booked: false,
          is_bought: true,
          price: 100,
          currency: 'złoty',
          background: '#949494'
        },
        {
          timeSlotId: 4,
          time: '15:15',
          is_past: true,
          is_booked: false,
          is_bought: false,
          price: 100,
          currency: 'złoty',
          background: '#949494'
        },
        {
          timeSlotId: 5,
          time: '17:15',
          is_past: false,
          is_booked: false,
          is_bought: false,
          price: 140,
          currency: 'złoty',
          background: '#ff9200'
        },
        {
          timeSlotId: 6,
          time: '19:15',
          is_past: false,
          is_booked: false,
          is_bought: false,
          price: 140,
          currency: 'złoty',
          background: '#ff9200'
        },
        {
          timeSlotId: 7,
          time: '21:00',
          is_past: false,
          is_booked: false,
          is_bought: false,
          price: 140,
          currency: 'złoty',
          background: '#ff9200'
        }
      ]
    },
    {
      day: '06/03',
      time: [
        {
          timeSlotId: 8,
          time: '10:00',
          is_past: false,
          is_booked: false,
          is_bought: false,
          price: 80,
          currency: 'złoty',
          background: '#ffe381'
        },
        {
          timeSlotId: 9,
          time: '11:45',
          is_past: false,
          is_booked: false,
          is_bought: false,
          price: 80,
          currency: 'złoty',
          background: '#ffe381'
        },
        {
          timeSlotId: 3,
          time: '13:30',
          is_past: false,
          is_booked: false,
          is_bought: false,
          price: 100,
          currency: 'złoty',
          background: '#f6ae2d'
        },
        {
          timeSlotId: 4,
          time: '15:15',
          is_past: false,
          is_booked: false,
          is_bought: false,
          price: 100,
          currency: 'złoty',
          background: '#f6ae2d'
        },
        {
          timeSlotId: 5,
          time: '17:15',
          is_past: false,
          is_booked: false,
          is_bought: false,
          price: 140,
          currency: 'złoty',
          background: '#ff9200'
        },
        {
          timeSlotId: 6,
          time: '19:15',
          is_past: false,
          is_booked: false,
          is_bought: false,
          price: 140,
          currency: 'złoty',
          background: '#ff9200'
        },
        {
          timeSlotId: 7,
          time: '21:00',
          is_past: false,
          is_booked: false,
          is_bought: false,
          price: 140,
          currency: 'złoty',
          background: '#ff9200'
        }
      ]
    },
    {
      day: '07/03',
      time: [
        {
          timeSlotId: 8,
          time: '10:00',
          is_past: false,
          is_booked: false,
          is_bought: false,
          price: 80,
          currency: 'złoty',
          background: '#ffe381'
        },
        {
          timeSlotId: 9,
          time: '11:45',
          is_past: false,
          is_booked: false,
          is_bought: false,
          price: 80,
          currency: 'złoty',
          background: '#ffe381'
        },
        {
          timeSlotId: 3,
          time: '13:30',
          is_past: false,
          is_booked: false,
          is_bought: false,
          price: 100,
          currency: 'złoty',
          background: '#f6ae2d'
        },
        {
          timeSlotId: 4,
          time: '15:15',
          is_past: false,
          is_booked: false,
          is_bought: false,
          price: 100,
          currency: 'złoty',
          background: '#f6ae2d'
        },
        {
          timeSlotId: 5,
          time: '17:15',
          is_past: false,
          is_booked: false,
          is_bought: false,
          price: 140,
          currency: 'złoty',
          background: '#ff9200'
        },
        {
          timeSlotId: 6,
          time: '19:15',
          is_past: false,
          is_booked: false,
          is_bought: false,
          price: 140,
          currency: 'złoty',
          background: '#ff9200'
        },
        {
          timeSlotId: 7,
          time: '21:00',
          is_past: false,
          is_booked: false,
          is_bought: false,
          price: 140,
          currency: 'złoty',
          background: '#ff9200'
        }
      ]
    },
    {
      day: '08/03',
      time: [
        {
          timeSlotId: 8,
          time: '10:00',
          is_past: false,
          is_booked: false,
          is_bought: false,
          price: 80,
          currency: 'złoty',
          background: '#ffe381'
        },
        {
          timeSlotId: 9,
          time: '11:45',
          is_past: false,
          is_booked: false,
          is_bought: false,
          price: 80,
          currency: 'złoty',
          background: '#ffe381'
        },
        {
          timeSlotId: 3,
          time: '13:30',
          is_past: false,
          is_booked: false,
          is_bought: false,
          price: 100,
          currency: 'złoty',
          background: '#f6ae2d'
        },
        {
          timeSlotId: 4,
          time: '15:15',
          is_past: false,
          is_booked: false,
          is_bought: false,
          price: 100,
          currency: 'złoty',
          background: '#f6ae2d'
        },
        {
          timeSlotId: 5,
          time: '17:15',
          is_past: false,
          is_booked: false,
          is_bought: false,
          price: 140,
          currency: 'złoty',
          background: '#ff9200'
        },
        {
          timeSlotId: 6,
          time: '19:15',
          is_past: false,
          is_booked: false,
          is_bought: false,
          price: 140,
          currency: 'złoty',
          background: '#ff9200'
        },
        {
          timeSlotId: 7,
          time: '21:00',
          is_past: false,
          is_booked: false,
          is_bought: false,
          price: 140,
          currency: 'złoty',
          background: '#ff9200'
        }
      ]
    },
    {
      day: '09/03',
      time: [
        {
          timeSlotId: 8,
          time: '10:00',
          is_past: false,
          is_booked: false,
          is_bought: false,
          price: 80,
          currency: 'złoty',
          background: '#ffe381'
        },
        {
          timeSlotId: 9,
          time: '11:45',
          is_past: false,
          is_booked: false,
          is_bought: false,
          price: 80,
          currency: 'złoty',
          background: '#ffe381'
        },
        {
          timeSlotId: 3,
          time: '13:30',
          is_past: false,
          is_booked: false,
          is_bought: false,
          price: 100,
          currency: 'złoty',
          background: '#f6ae2d'
        },
        {
          timeSlotId: 4,
          time: '15:15',
          is_past: false,
          is_booked: false,
          is_bought: false,
          price: 100,
          currency: 'złoty',
          background: '#f6ae2d'
        },
        {
          timeSlotId: 5,
          time: '17:15',
          is_past: false,
          is_booked: false,
          is_bought: false,
          price: 140,
          currency: 'złoty',
          background: '#ff9200'
        },
        {
          timeSlotId: 6,
          time: '19:15',
          is_past: false,
          is_booked: false,
          is_bought: false,
          price: 140,
          currency: 'złoty',
          background: '#ff9200'
        },
        {
          timeSlotId: 7,
          time: '21:00',
          is_past: false,
          is_booked: false,
          is_bought: false,
          price: 140,
          currency: 'złoty',
          background: '#ff9200'
        }
      ]
    },
    {
      day: '10/03',
      time: [
        {
          timeSlotId: 8,
          time: '10:00',
          is_past: false,
          is_booked: false,
          is_bought: false,
          price: 80,
          currency: 'złoty',
          background: '#ffe381'
        },
        {
          timeSlotId: 9,
          time: '11:45',
          is_past: false,
          is_booked: false,
          is_bought: false,
          price: 80,
          currency: 'złoty',
          background: '#ffe381'
        },
        {
          timeSlotId: 3,
          time: '13:30',
          is_past: false,
          is_booked: false,
          is_bought: false,
          price: 100,
          currency: 'złoty',
          background: '#f6ae2d'
        },
        {
          timeSlotId: 4,
          time: '15:15',
          is_past: false,
          is_booked: false,
          is_bought: false,
          price: 100,
          currency: 'złoty',
          background: '#f6ae2d'
        },
        {
          timeSlotId: 5,
          time: '17:15',
          is_past: false,
          is_booked: false,
          is_bought: false,
          price: 140,
          currency: 'złoty',
          background: '#ff9200'
        },
        {
          timeSlotId: 6,
          time: '19:15',
          is_past: false,
          is_booked: false,
          is_bought: false,
          price: 140,
          currency: 'złoty',
          background: '#ff9200'
        },
        {
          timeSlotId: 7,
          time: '21:00',
          is_past: false,
          is_booked: false,
          is_bought: false,
          price: 140,
          currency: 'złoty',
          background: '#ff9200'
        }
      ]
    },
    {
      day: '11/03',
      time: [
        {
          timeSlotId: 8,
          time: '10:00',
          is_past: false,
          is_booked: false,
          is_bought: false,
          price: 80,
          currency: 'złoty',
          background: '#ffe381'
        },
        {
          timeSlotId: 9,
          time: '11:45',
          is_past: false,
          is_booked: false,
          is_bought: false,
          price: 80,
          currency: 'złoty',
          background: '#ffe381'
        },
        {
          timeSlotId: 3,
          time: '13:30',
          is_past: false,
          is_booked: false,
          is_bought: false,
          price: 100,
          currency: 'złoty',
          background: '#f6ae2d'
        },
        {
          timeSlotId: 4,
          time: '15:15',
          is_past: false,
          is_booked: false,
          is_bought: false,
          price: 100,
          currency: 'złoty',
          background: '#f6ae2d'
        },
        {
          timeSlotId: 5,
          time: '17:15',
          is_past: false,
          is_booked: false,
          is_bought: false,
          price: 140,
          currency: 'złoty',
          background: '#ff9200'
        },
        {
          timeSlotId: 6,
          time: '19:15',
          is_past: false,
          is_booked: false,
          is_bought: false,
          price: 140,
          currency: 'złoty',
          background: '#ff9200'
        },
        {
          timeSlotId: 7,
          time: '21:00',
          is_past: false,
          is_booked: false,
          is_bought: false,
          price: 140,
          currency: 'złoty',
          background: '#ff9200'
        }
      ]
    }
  ];

  /**
   * Get room reservation data.
   * @returns <Observable<ReservationData[]>>
   */
  all(): Observable<ReservationModel[]> {
    return Observable.of(this.reservationData);
  }

  /**
   * Get List of time
   * @returns <Observable<ReservationData[]>>
   */

  getTime(): Observable<ReservationModel[]> {
    const timeList = [];
    for (let i = 0; i < this.daysInWeek; i++) {
      timeList.push(this.reservationData[0].time[i].time);
    }
    return Observable.of(timeList);
  }
}
