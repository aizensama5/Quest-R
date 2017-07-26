import { ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'app-main-filter-circle',
    templateUrl: 'filter-circle.component.html',
    styleUrls: ['filter-circle.component.scss']
})
export class FilterCircleComponent implements OnInit {

    minCountPlayers = 0;
    maxCountPlayers = 8;
    genres: any;

    @ViewChild('input') input: ElementRef;

    private _value = 0;
    private _genre: any;

    set value(value: number) {
        if (value > this.maxCountPlayers) {
            this._value = this.maxCountPlayers;
        } else if (value < this.minCountPlayers) {
            this._value = this.minCountPlayers;
        } else {
            this._value = value;
        }
        setTimeout(() => {
            this.input.nativeElement.value = this._value;
        });
    }

    get value(): number {
        return this._value;
    }

    set selectedGenre(genre: any) {
        this._genre = genre;
    }

    get selectedGenre(): any {
        return this._genre;
    }

    private mockGenres: any = [
        {legend: 'С актерами', color: '#00ff00'},
        {legend: 'Веселые', color: '#00ffff'},
        {legend: 'Для детей', color: '#0080ff'},
        {legend: 'Приключения', color: '#0000ff'},
        {legend: 'Детектив', color: '#ffff00'},
        {legend: 'Мистика', color: '#ff8000'},
        {legend: 'Ужасы', color: '#ff0000'},
        {legend: 'Книги/кино', color: '#ff0080'}
    ];

    constructor(
    ) {}

    ngOnInit() {
        this.genres = this.mockGenres;
    }

}
