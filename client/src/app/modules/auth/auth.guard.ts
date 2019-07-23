import { Injectable } from '@angular/core';
import { CanActivate, Router, CanLoad } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
  currentUser: any;

  constructor(private router: Router) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  canActivate() {
    // return this.checkAccess();
    return true;
  }

  canLoad() {
    // const isLoggedIn = this.checkAccess();

    // if (isLoggedIn) {
    //   if (this.currentUser.user.role === 'admin') {
    //     // this.router.navigate(['/401']);
    //     return true;
    //   }
    // }

    // this.router.navigate(['/login']);
    // return false;
    return true;
  }

  private checkAccess() {
    // if (!this.currentUser) {
    //   this.router.navigate(['/login']);

    //   return false;
    // }

    // return true;
  }
}
