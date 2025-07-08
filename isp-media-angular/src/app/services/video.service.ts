import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Musica } from '../models/Musica';
import { Video } from '../models/Video';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  constructor() { }

  private readonly baseUrl = 'http://localhost:8080/Video';
  private httpClient = inject(HttpClient);

  getAllVideos() {
      return this.httpClient.get<Video[]>(`${this.baseUrl}/getAll`);
    }
}
