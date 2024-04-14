import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EpiService {
  private apiUrl = '/epi/'; // Assurez-vous que cette URL est correcte pour votre environnement de développement

  constructor(private http: HttpClient) { }

  // Obtenir tous les EPI
  getEpi(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Mettre à jour un EPI spécifique par son ID
  updateEpi(id: number, epiData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}${id}`, epiData);
  }

  // Méthode pour ajouter un nouvel EPI à la base de données
  addEpi(epiData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, epiData);
  }
  // Méthode pour supprimer un EPI de la base de données
  deleteEpi(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

}
