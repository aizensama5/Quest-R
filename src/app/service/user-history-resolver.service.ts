import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {UserHistoryService} from "./user-history.service";
import * as firebase from "firebase/app";
import {AuthenticationService} from "./http/authentication.service";
import {UserHistoryModel} from "../models/user-history.model";

@Injectable()
export class UserHistoryResolverService {
  user$: Observable<firebase.User>;
  private user: any;

  constructor(private userHistoryService: UserHistoryService,
              private authService: AuthenticationService,) {
  }

  resolve(router: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return new Promise((resolve, reject) => {
      this.user$ = this.authService.currentUser();
      this.user$.subscribe((user: any) => {
        this.userHistoryService.getUserHistoriesById(user.uid).subscribe((userHistories: UserHistoryModel[]) => {
          resolve(userHistories);
        });
      });
    });
  }


}
