import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate() {
    if (!localStorage.getItem('currentUser')) {
      this.router.navigate(['/login']);

      return false;
    }

    const user = JSON.parse(localStorage.getItem('currentUser'));

    if (user.user.role !== 'admin') {
      // this.router.navigate(['/401']);
      this.router.navigate(['/login']);

      return false;
    }

    return true;
  }
}
