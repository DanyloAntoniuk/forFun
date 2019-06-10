import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PostApi, Post } from './posts';
import { environment } from '../../environments/environment';

@Injectable()
export class PostsService {
  constructor(private http: HttpClient) {}

  getPosts(queryParams: {}): Observable<PostApi> {
    return this.http.get<PostApi>(`${environment.endpoint}/posts`, { params: new HttpParams({ fromObject: queryParams }) }
    );
  }

  getPost(title: string): Observable<PostApi> {
    return this.http.get<PostApi>(`${environment.endpoint}/post/${title}`);
  }

  deletePost(id: string): Observable<object> {
    return this.http.delete<any>(`${environment.endpoint}/post/${id}`);
  }

  createPost(post: Post): Observable<object> {
    return this.http.post(`${environment.endpoint}/posts`, post);
  }

  deleteManyPosts(posts: string[]): Observable<object> {
    return this.http.request('delete', `${environment.endpoint}/posts`, { body: posts });
  }
}
