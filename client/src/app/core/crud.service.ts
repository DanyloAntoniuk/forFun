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
    this.activatedRoute.url.subscribe((urlSegment: UrlSegment[]) => {
      console.log(this.activatedRoute);
      this.resourceName = urlSegment[0].path;
    });
  }

  getRecords(queryParams: {}): Observable<any> {
    return this.http.get<any[]>(`${environment.endpoint}/${this.resourceName}`, { params: new HttpParams({ fromObject: queryParams }) });
  }

  getRecord(title: string): Observable<any> {
    return this.http.get<any>(`${environment.endpoint}/${this.resourceName}/${title}`);
  }

  deleteRecord(id: string, resourceName?: string): Observable<any> {
    if (resourceName) {
      return this.http.delete<any>(`${environment.endpoint}/${resourceName}/${id}`);
    }

    return this.http.delete<any>(`${environment.endpoint}/${this.resourceName}/${id}`);
  }

  createRecord(post: Post): Observable<any> {
    return this.http.post<any>(`${environment.endpoint}/${this.resourceName}`, post);
  }

  deleteManyRecords(ids: string[]): Observable<any> {
    return this.http.request<any>('delete', `${environment.endpoint}/${this.resourceName}`, { body: ids });
  }
}
