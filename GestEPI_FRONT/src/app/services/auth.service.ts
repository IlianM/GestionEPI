import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = 'http://localhost:4200'; // Remplacer avec l'URL de ton API

    constructor(private httpClient: HttpClient) {} // Assure-toi que HttpClient est injecté ici

    login(credentials: { firstName: string; lastName: string }): Observable<any> {
        return this.httpClient.post(`${this.apiUrl}/login`, credentials);
    }
}
