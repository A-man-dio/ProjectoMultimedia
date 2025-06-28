import { Injectable } from '@angular/core';
import { Utilizador } from '../models/Utilizador';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  private _usuarioLogado!: Utilizador;

  get usuarioLogado(): Utilizador {
    return this._usuarioLogado;
  }

  set usuarioLogado(valor: Utilizador) {
    this._usuarioLogado = valor;
  }

  constructor() { }

}
