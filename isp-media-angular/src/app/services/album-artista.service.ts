import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AlbumArtista } from '../models/AlbumArtista';

@Injectable({
  providedIn: 'root'
})
export class AlbumArtistaService {

  constructor() { }

  private baseUrl = 'http://localhost:8080/AlbumArtista';
  private httpClient = inject(HttpClient);

  saveAlbumArtista(albumArtista: AlbumArtista) {
    return this.httpClient.post<AlbumArtista>(`${this.baseUrl}/save`, albumArtista);
  }

  deleteAlbumArtista(albumArtista: AlbumArtista) {
    return this.httpClient.delete<void>(`${this.baseUrl}/delete`, { body: albumArtista });
  }

  getAllAlbunsArtistas() {
    return this.httpClient.get<AlbumArtista[]>(`${this.baseUrl}/getAll`);
  }

  getAlbunsArtistasByArtistaId(idArtista: number) {
    return this.httpClient.get<AlbumArtista[]>(`${this.baseUrl}/getAlbunsArtistasByArtistaId?idArtista=${idArtista}`);
  }

  getAlbunsArtistasByAlbumId(idAlbum: number) {
    return this.httpClient.get<AlbumArtista[]>(`${this.baseUrl}/getAlbunsArtistasByAlbumId?idAlbum=${idAlbum}`);
  }

  getAlbumArtistaById(id: number) {
    return this.httpClient.get<AlbumArtista>(`${this.baseUrl}/getAlbumArtistaById?id=${id}`);
  }


}
