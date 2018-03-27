export class UserFavoritesModel {
  roomId: number;
  userId: string;
  isFavorite: boolean;

  constructor() {
    this.roomId = null;
    this.userId = '';
    this.isFavorite = false;
  }
}
