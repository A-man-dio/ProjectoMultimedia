import { Component, inject, OnInit } from '@angular/core';
import { UtilizadorService } from '../../services/utilizador.service';
import { Utilizador } from '../../models/Utilizador';
import { CommonModule } from '@angular/common';
import { SharedDataService } from '../../services/shared-data.service';
import { Router } from '@angular/router';
import { Grupo } from '../../models/Grupo';
import { GrupoService } from '../../services/grupo.service';
import { MembroGrupoService } from '../../services/membro-grupo.service';
import { MembroGrupo } from '../../models/MembroGrupo';

@Component({
  selector: 'app-gerir-utilizadores',
  imports: [CommonModule],
  templateUrl: './gerir-utilizadores.component.html',
  styleUrl: './gerir-utilizadores.component.scss'
})
export class GerirUtilizadoresComponent implements OnInit {

  //filtrar apenas unitilizadores
  utilizadores: Utilizador[] = [];
  username: string = "";
  grupos : Grupo[] =[];
  grupoP = new Grupo(
  null,         // id
  '',           // nome
  '',           // descricao
  '',           // dataCriacao
  new Utilizador(
    null, '', '', '', '', '', 0, 0 // id, nome, username, senha, email, dataRegisto, tipo, ativo
  )
);


  router = inject(Router);

  utilizadorService = inject(UtilizadorService);
  gruposService = inject(GrupoService);
  sharedDataService = inject(SharedDataService);
  membroGrupoService = inject(MembroGrupoService);

  ngOnInit(): void {
    this.loadUtilizadores();
    this.loadGrupos();
    this.username = this.sharedDataService.usuarioLogado.username;
    this.grupoP = this.grupos.find(g => g.nome ==='Publico')!;
  }

  loadUtilizadores() {
    this.utilizadorService.getAllUtilizadores().subscribe(data => {
      this.utilizadores = data.filter(u => u.tipo === 1 && u.ativo === 1);
    });
  }

    loadGrupos() {
    this.gruposService.getAllGrupos().subscribe(data => {
      this.grupos = data;
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

  tornarEditor(utilizador:Utilizador){
    let membroGrupo: MembroGrupo;
     this.membroGrupoService.getMembroGrupoByGrupoIdAndUtilizadorId(this.grupoP.id!, utilizador.id!)
    .subscribe(membro => {
      membroGrupo = membro;
      console.log('Membro Grupo:', membroGrupo);
      membroGrupo.papel =2;

      this.membroGrupoService.saveMembroGrupo(membroGrupo);
    });
  }

  voltar() {
    this.router.navigate(['/pagina-inicial-adm']);
  }

}
