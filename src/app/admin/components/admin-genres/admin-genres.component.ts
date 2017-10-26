import { Component, OnInit } from '@angular/core';
import {GenreModel} from "../../../models/genre.model";
import {GenreService} from "../../../service/genre.service";
import {LanguageModel} from "../../../models/language.model";

@Component({
  selector: 'app-admin-genres',
  templateUrl: './admin-genres.component.html',
  styleUrls: ['./admin-genres.component.css']
})
export class AdminGenresComponent implements OnInit {
  genres: GenreModel[] = [];
  isShowLoader: boolean;
  isShowNotificationPopup = false;
  notificationPopupMessage = '';
  areErrors: boolean;
  useTabsetWithTextarea: boolean;
  constructor(public genreService: GenreService) {
    this.genreService.all().subscribe((genres: GenreModel[]) => {
    this.genres = genres;
  });}

  ngOnInit() {
  }

  closePopup () {
    this.isShowNotificationPopup = false;
    this.notificationPopupMessage = '';
  }

  onTabsetChanged(tabsetInfo: LanguageModel) {
    this.genres[0].legend = tabsetInfo;
  }

}
