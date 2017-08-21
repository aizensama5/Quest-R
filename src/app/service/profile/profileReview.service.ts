import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {ProfileReviewModel} from '../../models/profile/profileReview.model';

@Injectable()
export class ProfileReviewService {
  private userReviews: ProfileReviewModel[] = [
    {
      id: 1,
      user_id: 1,
      roomName: 'SCHRON BANKOWY',
      created: '03.05.2017',
      visited: '02.01.2017',
      description: 'Pokój niezwykle klimatyczny (piszę to chyba w każdej opinii haha). ' +
      'Powiedzielibyśmy nawet, że z efektem "WOW". Zagadki ciężkie, co wcale nie oznacza,' +
      ' iż nie mieliśmy frajdy w ich rozwiązywaniu. Poza tym ich rozmaitość tylko dopełniła całość klimatu.' +
      ' Zdecydowanie polecamy, ale już bardziej zaawansowanym graczom (my bez paru podpowiedzi na pewno byśmy nie wyszli!)'
    },
    {
      id: 2,
      user_id: 1,
      roomName: 'SCHRON BANKOWY',
      created: '03.05.2017',
      visited: '02.01.2017',
      description: 'Bardzo oryginalny klimat - egipski grobowiec. Rekwizyty i zagadki bardzo starannie wykonane, ' +
      'zadbano o każdy szczegół wystroju. Dla jednak nas trochę za łatwy :)'
    }
  ];

  constructor() { }

  /**
   * Get all user's reviews.
   * @returns <Observable<ReviewModel[]>>
   */
  all(): Observable<ProfileReviewModel[]> {
    return Observable.of(this.userReviews);
  }

}
