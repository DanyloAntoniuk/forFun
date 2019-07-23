import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { User } from './user';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) { }

  // Log in user.
  login(email: string, password: string): Observable<User> {
    return this.http.post<any>(`${environment.endpoint}/login`, { email, password })
      .pipe(
        map(token => {
          // Store user data.
          localStorage.setItem('token', token.token);

          return token;
        })
      );
  }

  // Register new user.
  register(userData: {[key: string]: string | boolean}): Observable<User> {
    return this.http.post<any>(`${environment.endpoint}/register`, userData)
    .pipe(
      map(token => {
        // Store user data.
        localStorage.setItem('token', JSON.stringify(token));

        return token;
      })
    );
  }

  // Log out user.
  logout() {
    localStorage.removeItem('token');
  }
}
