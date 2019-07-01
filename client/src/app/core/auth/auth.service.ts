import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { User } from './user';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  private currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  // Log in user.
  login(email: string, password: string): Observable<User> {
    return this.http.post<User>(`${environment.endpoint}/login`, { email, password })
      .pipe(
        map(user => {
          // Store user data.
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);

          return user;
        })
      );
  }

  // Register new user.
  register(userData: {[key: string]: string | boolean}): Observable<User> {
    return this.http.post<User>(`${environment.endpoint}/register`, userData)
    .pipe(
      map(user => {
        // Store user data.
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);

        return user;
      })
    );
  }

  // Log out user.
  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
