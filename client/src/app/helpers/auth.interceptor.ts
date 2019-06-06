import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { AuthService } from '../login/auth.service';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // if (this.router.url === '/login') {
    //   return next.handle(request);
    // }

    return next.handle(request)
      // .pipe(
      //   catchError(err => {
      //     if (err.status === 401) {
      //       this.authService.logout();
      //       this.router.navigate(['/login']);
      //     }

      //     const error = err.error.message || err.statusText;
      //     return throwError(error);
      //   })
      // );
  }
}
