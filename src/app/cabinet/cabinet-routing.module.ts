import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CabinetMainComponent } from './components/main/main.component';
import { FavoritesComponent } from './components/profile/favorites/favorites.component';
import { HistoryComponent } from './components/profile/history/history.component';
import { FriendsComponent } from './components/profile/friends/friends.component';
import { GalleryComponent } from './components/profile/gallery/gallery.component';
import { ReviewsComponent } from './components/profile/reviews/reviews.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {path: ':id', component: CabinetMainComponent, children: [
        {path: ':id', redirectTo: 'id:/history', pathMatch: 'full'},
        {path: 'history', component: HistoryComponent},
        {path: 'gallery', component: GalleryComponent},
        {path: 'favorites', component: FavoritesComponent},
        {path: 'friends', component: FriendsComponent},
        {path: 'reviews', component: ReviewsComponent}
      ]},
    ])
  ],
  exports: [RouterModule]
})
export class CabinetRoutingModule {
}
