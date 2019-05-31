import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Posts } from './posts';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

@Injectable()
export class PostsService {
  constructor(private http: HttpClient) {}

  getPosts(): Observable<Posts[]> {
    return this.http.get<Posts[]>('http://localhost:3001/api/posts?page=10')
      .pipe(
        map(data => data.posts)
      );
  }

  getPost(id: string): Observable<Posts> {
    return this.http.get<Posts>(`http://localhost:3001/api/posts/${id}`);
  }
}