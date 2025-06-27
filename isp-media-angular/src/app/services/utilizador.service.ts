import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Utilizador } from '../models/Utilizador';

@Injectable({
  providedIn: 'root'
})
export class UtilizadorService {

  constructor() { }

  httpClient = inject(HttpClient);

  createUtilizador(utilizador: Utilizador) {
    return this.httpClient.post<Utilizador>("http://localhost:8080/Utilizador/save", utilizador);
  }

  getUtilizadorByUserName(username: string) {
    return this.httpClient.get<Utilizador>(`http://localhost:8080/Utilizador/getUtilizadorByUsername?username=${username}`);
  }

  getUtilizadorByEmail(email: string) {
    return this.httpClient.get<Utilizador>(`http://localhost:8080/Utilizador/getUtilizadorByEmail?email=${email}`);
  }

  getUtilizadorByUserNameAndSenha(username: string, senha: string) {
    return this.httpClient.get<Utilizador>(`http://localhost:8080/Utilizador/getUtilizadorByUsernameAndSenha?username=${username}&senha=${senha}`);
  }

  getAllUtilizadores() {
    return this.httpClient.get<Array<Utilizador>>("http://localhost:8080/Utilizador/getAll");
  }


}
