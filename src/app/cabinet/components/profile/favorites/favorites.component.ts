import { Component } from '@angular/core';
import { RoomModel } from '../../../../models/room.model';
import { FavoritesService } from '../../../../service/profile/favorites.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent {
  favoritesData: RoomModel[];

  constructor(favoritesService: FavoritesService) {
    favoritesService.all().subscribe((favData) => {
      this.favoritesData = favData;
    });
  }

}
