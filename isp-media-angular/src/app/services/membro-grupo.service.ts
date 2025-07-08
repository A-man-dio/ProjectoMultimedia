import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MembroGrupo } from '../models/MembroGrupo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MembroGrupoService {

  private baseUrl = 'http://localhost:8080/MembroGrupo';
  private httpClient = inject(HttpClient);

  constructor() { }

  saveMembroGrupo(membroGrupo: MembroGrupo): Observable<MembroGrupo> {
    return this.httpClient.post<MembroGrupo>(`${this.baseUrl}/save`, membroGrupo);
  }

  deleteMembroGrupo(membroGrupo: MembroGrupo): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/delete`, {
      body: membroGrupo
    });
  }

  getAllMembrosGrupo(): Observable<MembroGrupo[]> {
    return this.httpClient.get<MembroGrupo[]>(`${this.baseUrl}/getAll`);
  }

  getMembrosGrupoByUtilizadorId(idUtilizador: number): Observable<MembroGrupo[]> {
    return this.httpClient.get<MembroGrupo[]>(`${this.baseUrl}/getMembrosGrupoByUtilizadorId?idUtilizador=${idUtilizador}`);
  }

  getMembrosGrupoByGrupoId(idGrupo: number): Observable<MembroGrupo[]> {
    return this.httpClient.get<MembroGrupo[]>(`${this.baseUrl}/getMembrosGrupoByGrupoId?idGrupo=${idGrupo}`);
  }

  getMembrosGrupoByPapel(papel: number): Observable<MembroGrupo[]> {
    return this.httpClient.get<MembroGrupo[]>(`${this.baseUrl}/getMembrosGrupoByPapel?papel=${papel}`);
  }

  getMembrosGrupoByEstado(estado: number): Observable<MembroGrupo[]> {
    return this.httpClient.get<MembroGrupo[]>(`${this.baseUrl}/getMembrosGrupoByEstado?estado=${estado}`);
  }

  getMembroGrupoById(id: number): Observable<MembroGrupo> {
    return this.httpClient.get<MembroGrupo>(`${this.baseUrl}/getMembroGrupoById?id=${id}`);
  }

  getMembroGrupoByGrupoIdAndUtilizadorId(idGrupo: number, idUtilizador: number) {
    return this.httpClient.get<MembroGrupo>(`${this.baseUrl}/getMembroGrupoByGrupoIdAndUtilizadorId?idGrupo=${idGrupo}&idUtilizador=${idUtilizador}`);
  }

}
