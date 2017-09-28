// import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
// import {Observable} from 'rxjs/Observable';
// import {Injectable} from '@angular/core';
// import { AuthenticationService } from '../service/http/authentication.service';
//
// @Injectable()
// export class AdminGuard implements CanActivate {
//
//   constructor (private authService: AuthenticationService,
//                private router: Router) {}
//
//   canActivate(route: ActivatedRouteSnapshot,
//               state: RouterStateSnapshot): Observable<boolean> {
//     return this.authService.currentUser().subscribe((user) => {
//       if (!!(user && user.email)) {
//         return true;
//       } else {
//         this.router.navigate(['admin/login']);
//       }
//       return false;
//     });
//   }
// }
