import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor() { }

  private baseUrl = "http://localhost:8080/Upload";
  private httpClient = inject(HttpClient);

  uploadImagem(formData: FormData) {
    return this.httpClient.post(`${this.baseUrl}/imagem`, formData, {
      responseType: 'text' 
    });
  }
}
