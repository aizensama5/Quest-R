import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor (private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): boolean {
    if (localStorage.getItem('admin')) {
      return true;
    }
    this.router.navigate(['/admin/login/'], {queryParams: {returnUrl: state.url}});
    return false;
  }
}
