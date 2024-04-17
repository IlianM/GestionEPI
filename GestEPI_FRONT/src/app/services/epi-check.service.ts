import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, throwError} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EpiCheckService {
  private apiUrl = 'http://localhost:5501/epiCheck';

  constructor(private http: HttpClient) { }

  getEpiChecks(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getEpiCheckById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  addEpiCheck(epiCheck: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, epiCheck);
  }

  updateEpiCheck(id: number, epiCheck: any): Observable<any> {
    console.log('Sending PUT request for EpiCheck with ID:', id);
    if (id === undefined) {
      console.error('Attempted to update EpiCheck with undefined ID');
      return throwError(() => new Error('Undefined EpiCheck ID'));
    }
    return this.http.put<any>(`${this.apiUrl}/${id}`, epiCheck);
  }


  deleteEpiCheck(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
