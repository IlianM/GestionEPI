import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5501/epiUser'; // URL de ton API pour la connexion

  constructor(private http: HttpClient) {}

  // Dans AuthenticationService
  login(credentials: { firstName: string; lastName: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials);
  }

}
