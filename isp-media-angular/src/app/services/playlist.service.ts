import { inject, Injectable } from '@angular/core';
import { Playlist } from '../models/Playlist';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  constructor() { }

  private baseUrl = 'http://localhost:8080/Playlist';
  private httpClient = inject(HttpClient);

  createPlaylist(playlist: Playlist) {
    return this.httpClient.post<Playlist>(`${this.baseUrl}/save`, playlist);
  }

  deletePlaylist(playlist: Playlist) {
    return this.httpClient.delete<void>(`${this.baseUrl}/delete`, { body: playlist });
  }

  getAllPlaylists() {
    return this.httpClient.get<Playlist[]>(`${this.baseUrl}/getAll`);
  }

  getPlaylistsByTituloContendo(titulo: string) {
    return this.httpClient.get<Playlist[]>(`${this.baseUrl}/getPlaylistsByTituloContendo?titulo=${titulo}`);
  }

  getPlaylistsByUtilizadorId(idUtilizador: number) {
    return this.httpClient.get<Playlist[]>(`${this.baseUrl}/getPlaylistsByUtilizadorId?idUtilizador=${idUtilizador}`);
  }

  getPlaylistsByPrivada(privada: boolean) {
    return this.httpClient.get<Playlist[]>(`${this.baseUrl}/getPlaylistsByPrivada?privada=${privada}`);
  }

  getPlaylistById(id: number) {
    return this.httpClient.get<Playlist>(`${this.baseUrl}/getPlaylistById?id=${id}`);
  }



}
