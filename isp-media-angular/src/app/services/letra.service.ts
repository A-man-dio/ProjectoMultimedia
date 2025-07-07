import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LetraService {

  constructor() { }

  private baseUrl = `http://${window.location.hostname}:8080`;
  private http = inject(HttpClient);


  carregarLetra(caminhoLetra: string) {
    return this.http.get(`${this.baseUrl}${caminhoLetra}`, {
      responseType: 'text',
    });
  }

}
