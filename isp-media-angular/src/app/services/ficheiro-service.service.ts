import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FicheiroService {
  private baseUrl = 'http://localhost:8080/api/ficheiros';
  private httpClient = inject(HttpClient);

  uploadFicheiro(file: File, tipo: 'musica' | 'video') {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('tipo', tipo);

    return this.httpClient.post<string>(`${this.baseUrl}/upload`, formData, {
      responseType: 'text' as 'json',
    });
  }
}