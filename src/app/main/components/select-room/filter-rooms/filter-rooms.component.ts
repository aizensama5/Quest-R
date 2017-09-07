import {Component, OnInit} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-main-filter-rooms',
  templateUrl: 'filter-rooms.component.html',
  styleUrls: ['filter-rooms.component.scss'],
})
export class FilterRoomsComponent implements OnInit {

  isDisplayPlayersCircle = false;
  isDisplayPriceCircle = false;
  isDisplayGenreCircle = true;

  complexity: string[] = [
    'Na pierwszy raz',
    'Początkujący',
    'Śr. zaawansowani',
    'Doświadczeni',
    'Eksperci'
  ];

  marking: string[] = [
    'Pokój przyjazny dzieciom',
    'Pokój przyjazny niepełnosprawnym',
    'Możliwość gry po angielsku',
    'Pokój klimatyzowany',
    'Płatność kartą na miejscu',
    'Od 18 lat',
    'Od 16 lat',
    'Pokój nieodpowiedni dla osób z epilepsją',
    'Pokój nieodpowiedni dla kobiet w ciąży',
    'Pokój zły dla osób z klaustrofobią'
  ];

  displayPlayersCircle() {
    this.isDisplayPlayersCircle = true;
    this.isDisplayGenreCircle = false;
    this.isDisplayPriceCircle = false;
  }

  displayGenreCircle() {
    this.isDisplayPlayersCircle = false;
    this.isDisplayGenreCircle = true;
    this.isDisplayPriceCircle = false;
  }

  displayPriceCircle() {
    this.isDisplayPlayersCircle = false;
    this.isDisplayGenreCircle = false;
    this.isDisplayPriceCircle = true;
  }


  constructor() {
  }

  ngOnInit() {
  }
}
