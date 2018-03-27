import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CabinetMainComponent } from './components/main/main.component';
import { FavoritesComponent } from './components/profile/favorites/favorites.component';
import { HistoryComponent } from './components/profile/history/history.component';
import { FriendsComponent } from './components/profile/friends/friends.component';
import { GalleryComponent } from './components/profile/gallery/gallery.component';
import { ReviewsComponent } from './components/profile/reviews/reviews.component';
import {UserHistoryResolverService} from "../service/user-history-resolver.service";

@NgModule({
  imports: [
    RouterModule.forChild([
      {path: '', redirectTo: 'history', pathMatch: 'full'},
      {path: '', component: CabinetMainComponent, resolve: {'userHistory': UserHistoryResolverService}, children: [
        {path: 'history', component: HistoryComponent, resolve: {'userHistory': UserHistoryResolverService}},
        {path: 'gallery', component: GalleryComponent, resolve: {'userHistory': UserHistoryResolverService}},
        {path: 'favorites', component: FavoritesComponent},
        {path: 'friends', component: FriendsComponent},
        {path: 'reviews', component: ReviewsComponent, resolve: {'userHistory': UserHistoryResolverService}}
      ]},
    ])
  ],
  exports: [RouterModule]
})
export class CabinetRoutingModule {
}
