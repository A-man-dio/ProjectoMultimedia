import { Component, inject, OnInit } from '@angular/core';
import { UtilizadorService } from '../../services/utilizador.service';
import { Utilizador } from '../../models/Utilizador';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gerir-utilizadores',
  imports: [CommonModule],
  templateUrl: './gerir-utilizadores.component.html',
  styleUrl: './gerir-utilizadores.component.scss'
})
export class GerirUtilizadoresComponent implements OnInit {

  
  utilizadores: Utilizador[] = [];

  utilizadorService = inject(UtilizadorService);

  ngOnInit(): void {
    this.loadUtilizadores();
  }

  loadUtilizadores() {
    this.utilizadorService.getAllUtilizadores().subscribe(data => {
      this.utilizadores = data;
    });
  }

  apagarConta(utilizador: Utilizador) {
    if (confirm('Tem certeza que deseja apagar esta conta?')) {
      this.utilizadorService.deleteUtilizador(utilizador).subscribe(() => {
        alert('Utilizador desativado!');
        this.loadUtilizadores();
      });
    }
  }

}
