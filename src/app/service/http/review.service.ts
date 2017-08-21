import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ReviewModel } from '../../models/review.model';

@Injectable()
export class ReviewService {

    private reviews: ReviewModel[] = [
        {
            id: 1,
            name: 'Name S.',
            created: '03.05.2017',
            visited: '02.01.2017',
            img: 'http://loremflickr.com/100/100/paris',
            title: 'Z efektem «WOW1»!',
            description: 'Pokój niezwykle klimatyczny (piszę to chyba w każdej opinii haha). Powiedzielibyśmy nawet, że z efektem "WOW". Zagadki ciężkie, co wcale nie oznacza, iż nie mieliśmy frajdy w ich rozwiązywaniu. Poza tym ich rozmaitość tylko dopełniła całość klimatu. Zdecydowanie polecamy, ale już bardziej zaawansowanym graczom (my bez paru podpowiedzi na pewno byśmy nie wyszli!)'
        },
        {
            id: 1,
            name: 'Name S.',
            created: '03.05.2017',
            visited: '02.01.2017',
            img: 'http://loremflickr.com/100/100/paris',
            title: 'Z efektem «WOW2»!',
            description: 'Pokój niezwykle klimatyczny (piszę to chyba w każdej opinii haha). Powiedzielibyśmy nawet, że z efektem "WOW". Zagadki ciężkie, co wcale nie oznacza, iż nie mieliśmy frajdy w ich rozwiązywaniu. Poza tym ich rozmaitość tylko dopełniła całość klimatu. Zdecydowanie polecamy, ale już bardziej zaawansowanym graczom (my bez paru podpowiedzi na pewno byśmy nie wyszli!)'
        },
        {
            id: 1,
            name: 'Name S.',
            created: '03.05.2017',
            visited: '02.01.2017',
            img: 'http://loremflickr.com/100/100/paris',
            title: 'Z efektem «WOW3»!',
            description: 'Pokój niezwykle klimatyczny (piszę to chyba w każdej opinii haha). Powiedzielibyśmy nawet, że z efektem "WOW". Zagadki ciężkie, co wcale nie oznacza, iż nie mieliśmy frajdy w ich rozwiązywaniu. Poza tym ich rozmaitość tylko dopełniła całość klimatu. Zdecydowanie polecamy, ale już bardziej zaawansowanym graczom (my bez paru podpowiedzi na pewno byśmy nie wyszli!)'
        },
        {
            id: 1,
            name: 'Name S.',
            created: '03.05.2017',
            visited: '02.01.2017',
            img: 'http://loremflickr.com/100/100/paris',
            title: 'Z efektem «WOW4»!',
            description: 'Pokój niezwykle klimatyczny (piszę to chyba w każdej opinii haha). Powiedzielibyśmy nawet, że z efektem "WOW". Zagadki ciężkie, co wcale nie oznacza, iż nie mieliśmy frajdy w ich rozwiązywaniu. Poza tym ich rozmaitość tylko dopełniła całość klimatu. Zdecydowanie polecamy, ale już bardziej zaawansowanym graczom (my bez paru podpowiedzi na pewno byśmy nie wyszli!)'
        },
        {
            id: 1,
            name: 'Name S.',
            created: '03.05.2017',
            visited: '02.01.2017',
            img: 'http://loremflickr.com/100/100/paris',
            title: 'Z efektem «WOW5»!',
            description: 'Pokój niezwykle klimatyczny (piszę to chyba w każdej opinii haha). Powiedzielibyśmy nawet, że z efektem "WOW". Zagadki ciężkie, co wcale nie oznacza, iż nie mieliśmy frajdy w ich rozwiązywaniu. Poza tym ich rozmaitość tylko dopełniła całość klimatu. Zdecydowanie polecamy, ale już bardziej zaawansowanym graczom (my bez paru podpowiedzi na pewno byśmy nie wyszli!)'
        },
        {
            id: 1,
            name: 'Name S.',
            created: '03.05.2017',
            visited: '02.01.2017',
            img: 'http://loremflickr.com/100/100/paris',
            title: 'Z efektem «WOW6»!',
            description: 'Pokój niezwykle klimatyczny (piszę to chyba w każdej opinii haha). Powiedzielibyśmy nawet, że z efektem "WOW". Zagadki ciężkie, co wcale nie oznacza, iż nie mieliśmy frajdy w ich rozwiązywaniu. Poza tym ich rozmaitość tylko dopełniła całość klimatu. Zdecydowanie polecamy, ale już bardziej zaawansowanym graczom (my bez paru podpowiedzi na pewno byśmy nie wyszli!)'
        },
        {
            id: 1,
            name: 'Name S.',
            created: '03.05.2017',
            visited: '02.01.2017',
            img: 'http://loremflickr.com/100/100/paris',
            title: 'Z efektem «WOW7»!',
            description: 'Pokój niezwykle klimatyczny (piszę to chyba w każdej opinii haha). Powiedzielibyśmy nawet, że z efektem "WOW". Zagadki ciężkie, co wcale nie oznacza, iż nie mieliśmy frajdy w ich rozwiązywaniu. Poza tym ich rozmaitość tylko dopełniła całość klimatu. Zdecydowanie polecamy, ale już bardziej zaawansowanym graczom (my bez paru podpowiedzi na pewno byśmy nie wyszli!)'
        },
        {
            id: 1,
            name: 'Name S.',
            created: '03.05.2017',
            visited: '02.01.2017',
            img: 'http://loremflickr.com/100/100/paris',
            title: 'Z efektem «WOW8»!',
            description: 'Pokój niezwykle klimatyczny (piszę to chyba w każdej opinii haha). Powiedzielibyśmy nawet, że z efektem "WOW". Zagadki ciężkie, co wcale nie oznacza, iż nie mieliśmy frajdy w ich rozwiązywaniu. Poza tym ich rozmaitość tylko dopełniła całość klimatu. Zdecydowanie polecamy, ale już bardziej zaawansowanym graczom (my bez paru podpowiedzi na pewno byśmy nie wyszli!)'
        },
        {
            id: 1,
            name: 'Name S.',
            created: '03.05.2017',
            visited: '02.01.2017',
            img: 'http://loremflickr.com/100/100/paris',
            title: 'Z efektem «WOW9»!',
            description: 'Pokój niezwykle klimatyczny (piszę to chyba w każdej opinii haha). Powiedzielibyśmy nawet, że z efektem "WOW". Zagadki ciężkie, co wcale nie oznacza, iż nie mieliśmy frajdy w ich rozwiązywaniu. Poza tym ich rozmaitość tylko dopełniła całość klimatu. Zdecydowanie polecamy, ale już bardziej zaawansowanym graczom (my bez paru podpowiedzi na pewno byśmy nie wyszli!)'
        }
    ];

    constructor() {}

    /**
     * Get all rooms.
     * @returns <Observable<ReviewModel[]>>
     */
    all(): Observable<ReviewModel[]> {
        return Observable.of(this.reviews);
    }
}
