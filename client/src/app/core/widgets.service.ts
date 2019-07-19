import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const WIDGETS_API_URL = `${environment.endpoint}/widgets`;

@Injectable()
export class WidgetsService {

  constructor(private http: HttpClient) { }

  getRecords(resourceName: string, queryParams: {}): Observable<any> {
    return this.http.get<any[]>(`${WIDGETS_API_URL}/${resourceName}`, { params: new HttpParams({ fromObject: queryParams }) });
  }

  getRecord(resourceName: string, title: string): Observable<any> {
    return this.http.get<any>(`${WIDGETS_API_URL}/${resourceName}/${title}`);
  }

  deleteRecord(resourceName: string, id: string): Observable<any> {
    return this.http.delete<any>(`${WIDGETS_API_URL}/${resourceName}/${id}`);
  }

  createRecord(resourceName: string, data: any): Observable<any> {
    return this.http.post<any>(`${WIDGETS_API_URL}/${resourceName}`, data);
  }

  deleteManyRecords(resourceName: string, ids: string[]): Observable<any> {
    return this.http.request<any>('delete', `${WIDGETS_API_URL}/${resourceName}`, { body: ids });
  }

  updateRecord(resourceName: string, title: string, data: { [key: string]: any }) {
    return this.http.put(`${WIDGETS_API_URL}/${resourceName}/${title}`, data);
  }
}
