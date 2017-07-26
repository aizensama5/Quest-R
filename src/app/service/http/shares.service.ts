import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Shares } from '../../models/shares.model';

@Injectable()
export class SharesService {

    private shares: Shares[] = [
        {
            img: 'https://s3.amazonaws.com/uploads.hipchat.com/531492/4408974/ojeVTzEVmC4wdYM/photodune-3561813.jpg',
            descriptions: 'Дорогие именинники и те, кто не знает, что подарить на День Рождения! Лучший подарок - это эмоции!Вы сможете за час стать героем невероятного приключения! Только в Ваш День Рождения мы дарим Вам скидку 100 грн. на каждую комнату!Акции и скидки не суммируются!'
        },
        {
            img: 'https://s3.amazonaws.com/uploads.hipchat.com/531492/4408974/ojeVTzEVmC4wdYM/photodune-3561813.jpg',
            descriptions: 'Дорогие именинники и те, кто не знает, что подарить на День Рождения! Лучший подарок - это эмоции!Вы сможете за час стать героем невероятного приключения! Только в Ваш День Рождения мы дарим Вам скидку 100 грн. на каждую комнату!Акции и скидки не суммируются!'
        },
        {
            img: 'https://s3.amazonaws.com/uploads.hipchat.com/531492/4408974/ojeVTzEVmC4wdYM/photodune-3561813.jpg',
            descriptions: 'Дорогие именинники и те, кто не знает, что подарить на День Рождения! Лучший подарок - это эмоции!Вы сможете за час стать героем невероятного приключения! Только в Ваш День Рождения мы дарим Вам скидку 100 грн. на каждую комнату!Акции и скидки не суммируются!'
        },
        {
            img: 'https://s3.amazonaws.com/uploads.hipchat.com/531492/4408974/ojeVTzEVmC4wdYM/photodune-3561813.jpg',
            descriptions: 'Дорогие именинники и те, кто не знает, что подарить на День Рождения! Лучший подарок - это эмоции!Вы сможете за час стать героем невероятного приключения! Только в Ваш День Рождения мы дарим Вам скидку 100 грн. на каждую комнату!Акции и скидки не суммируются!'
        },
        {
            img: 'https://s3.amazonaws.com/uploads.hipchat.com/531492/4408974/ojeVTzEVmC4wdYM/photodune-3561813.jpg',
            descriptions: 'Дорогие именинники и те, кто не знает, что подарить на День Рождения! Лучший подарок - это эмоции!Вы сможете за час стать героем невероятного приключения! Только в Ваш День Рождения мы дарим Вам скидку 100 грн. на каждую комнату!Акции и скидки не суммируются!'
        }
    ];

    constructor() {}

    /**
     * Get all shares.
     * @returns <Observable<Shares[]>>
     */
    all(): Observable<Shares[]> {
        return Observable.of(this.shares);
    }
}
