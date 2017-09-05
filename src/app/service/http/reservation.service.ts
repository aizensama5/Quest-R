import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ReservationModel } from '../../models/reservation.model';
import { MainReservationModel } from '../../models/main-reservation.model';
import { TimeModel } from '../../models/time.model';
import * as moment from 'moment';
import _date = moment.unitOfTime._date;
import {forEach} from '@angular/router/src/utils/collection';

@Injectable()
export class ReservationService {
  private daysInWeek = 7;
  private reservationData: MainReservationModel[] = [
    {
      id: 1,
      reservation: [
        {
          day: '2017-03-05',
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
          day: '2017-03-06',
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
          day: '2017-03-07',
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
          day: '2017-03-08',
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
          day: '2017-03-09',
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
          day: '2017-03-10',
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
          day: '2017-03-11',
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
      ]
    },
    {
      id: 2,
      reservation: [
        {
          day: '2017-03-05',
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
          day: '2017-03-06',
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
          day: '2017-03-07',
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
          day: '2017-03-08',
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
          day: '2017-03-09',
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
          day: '2017-03-10',
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
          day: '2017-03-11',
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
      ]
    },
    {
      id: 3,
      reservation: [
        {
          day: '2017-03-05',
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
          day: '2017-03-06',
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
          day: '2017-03-07',
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
          day: '2017-03-08',
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
          day: '2017-03-09',
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
          day: '2017-03-10',
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
          day: '2017-03-11',
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
      ]
    },
    {
      id: 4,
      reservation: [
        {
          day: '2017-03-05',
          time: [
            {
              timeSlotId: 1,
              time: '10:00',
              is_past: false,
              is_booked: false,
              is_bought: false,
              price: 80,
              currency: 'złoty',
              background: '#ff9200'
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
          day: '2017-03-06',
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
          day: '2017-03-07',
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
          day: '2017-03-08',
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
          day: '2017-03-09',
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
          day: '2017-03-10',
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
          day: '2017-03-11',
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
      ]
    }
  ];

  /**
   * Get all rooms reservation data.
   * @returns <Observable<MainReservationData[]>>
   */
  all(): Observable<MainReservationModel[]> {
    return Observable.of(this.reservationData);
  }


  getMonthsName() {
    return [
      'января',
      'февраля',
      'марта',
      'апреля',
      'мая',
      'июня',
      'июля',
      'августа',
      'сентября',
      'октября',
      'ноября',
      'декября'
    ];
  }

  checkDayMonthFormat (el) {
    return el.length > 1 ? el : '0' + el;
  }

  convertDateSeparatedBySlash (date: string) {
    const fullDate = new Date(date);
    let day = fullDate.getDate().toString(10),
        month = (fullDate.getMonth() + 1).toString(10);
    day = this.checkDayMonthFormat(day);
    month = this.checkDayMonthFormat(month);
    return day + '/' + month;
  }

  convertDateToString (date: string) {
    const fullDate = new Date(date);
    let day = fullDate.getDate().toString(10);
    const monthIndex = fullDate.getMonth(),
          monthsName = this.getMonthsName();
    day = this.checkDayMonthFormat(day);
    return day + ' ' + monthsName[monthIndex];
  }
}
