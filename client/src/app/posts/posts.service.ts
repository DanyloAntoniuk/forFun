import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Posts } from './posts';

@Injectable()
export class PostsService {
  constructor(private http: HttpClient) {}

  getPosts(): Observable<Posts[]> {
    return this.http.get<Posts[]>('http://localhost:3001/api/posts?page=10');
  }
}