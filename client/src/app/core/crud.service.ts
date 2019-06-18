import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PostApi, Post } from '../modules/admin/posts/posts';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';

@Injectable()
export class CrudService {
  resourceName: string;

  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.url.subscribe((urlSegment: UrlSegment[]) => this.resourceName = urlSegment[0].path);
  }

  getRecords(queryParams: {}): Observable<any> {
    return this.http.get<object[]>(`${environment.endpoint}/${this.resourceName}`, { params: new HttpParams({ fromObject: queryParams }) });
  }

  getRecord(title: string): Observable<object> {
    console.log(this.resourceName, title);
    return this.http.get<object>(`${environment.endpoint}/${this.resourceName}/${title}`);
  }

  deleteRecord(id: string, resourceName?: string): Observable<object> {
    if (resourceName) {
      return this.http.delete<object>(`${environment.endpoint}/${resourceName}/${id}`);
    }

    return this.http.delete<object>(`${environment.endpoint}/${this.resourceName}/${id}`);
  }

  createRecord(post: Post): Observable<object> {
    return this.http.post<object>(`${environment.endpoint}/${this.resourceName}`, post);
  }

  deleteManyRecords(ids: string[]): Observable<object> {
    return this.http.request<object>('delete', `${environment.endpoint}/${this.resourceName}`, { body: ids });
  }
}
