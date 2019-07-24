import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Router, NavigationEnd, Event } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Injectable()
export class CrudService {
  resourceName: string;

  constructor(private http: HttpClient, private router: Router) {
    this.router.events
      .pipe(
        filter((event: Event) => event instanceof NavigationEnd),
        map((event: NavigationEnd) => {
          const urlSegments = event.url.split('/');

          // Asume entity name is third element in array.
          return urlSegments[2];
        }),
      )
      .subscribe((path: string) => this.resourceName = path);
  }

  getRecords(queryParams: {[key: string]: any}, resourceName?: string): Observable<any> {
    if (resourceName) {
      return this.http.get<any[]>(`${environment.endpoint}/${resourceName}`, { params: new HttpParams({ fromObject: queryParams }) });
    }

    return this.http.get<any[]>(`${environment.endpoint}/${this.resourceName}`, { params: new HttpParams({ fromObject: queryParams }) });
  }

  getRecord(title: string, resourceName?: string): Observable<any> {
    if (resourceName) {
      return this.http.get<any>(`${environment.endpoint}/${resourceName}/${title}`);
    }

    return this.http.get<any>(`${environment.endpoint}/${this.resourceName}/${title}`);
  }

  deleteRecord(id: string, resourceName?: string): Observable<any> {
    if (resourceName) {
      return this.http.delete<any>(`${environment.endpoint}/${resourceName}/${id}`);
    }

    return this.http.delete<any>(`${environment.endpoint}/${this.resourceName}/${id}`);
  }

  createRecord(data: any, url?: string): Observable<any> {
    if (url) {
      return this.http.post<any>(url, data);
    }

    return this.http.post<any>(`${environment.endpoint}/${this.resourceName}`, data);
  }

  deleteManyRecords(ids: string[]): Observable<any> {
    return this.http.request<any>('delete', `${environment.endpoint}/${this.resourceName}`, { body: ids });
  }

  updateRecord(title: string, data: {[key: string]: any}, url?: string) {
    if (url) {
      return this.http.post<any>(url, data);
    }
  
    return this.http.put(`${environment.endpoint}/${this.resourceName}/${title}`, data);
  }
}
