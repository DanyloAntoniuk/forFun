import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PostApi } from './posts';
import { environment } from '../../environments/environment';

@Injectable()
export class PostsService {
  constructor(private http: HttpClient) {}

  getPosts(page: number): Observable<PostApi> {
    return this.http.get<PostApi>(`${environment.endpoint}/posts?limit=5&page=${page}`);
  }

  getPost(id: string): Observable<PostApi> {
    return this.http.get<PostApi>(`${environment.endpoint}/posts/${id}`);
  }
}