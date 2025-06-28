import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Album } from '../models/Album';

@Injectable({
  providedIn: 'root'
})

export class AlbumService {

  constructor() { }

  private baseUrl = "http://localhost:8080/Album";
  private httpClient = inject(HttpClient);

  createAlbum(album: Album) {
    return this.httpClient.post<Album>(`${this.baseUrl}/save`, album);
  }

  deleteAlbum(album: Album) {
    return this.httpClient.delete<void>(`${this.baseUrl}/delete`, {
      body: album
    });
  }

  getAllAlbuns() {
    return this.httpClient.get<Album[]>(`${this.baseUrl}/getAll`);
  }

  getAlbunsByTituloContendo(titulo: string) {
    return this.httpClient.get<Album[]>(`${this.baseUrl}/getAlbunsByTituloContendo?titulo=${titulo}`);
  }

  getAlbumById(id: number) {
    return this.httpClient.get<Album>(`${this.baseUrl}/getAlbumById?id=${id}`);
  }

}
