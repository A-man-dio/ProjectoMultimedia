import { Component, inject } from '@angular/core';
import { Artista } from '../../models/Artista';
import { ArtistaService } from '../../services/artista.service';
import { CommonModule } from '@angular/common';
import { SharedDataService } from '../../services/shared-data.service';
import { Album } from '../../models/Album';
import { AlbumService } from '../../services/album.service';
import { GrupoService } from '../../services/grupo.service';
import { MembroGrupoService } from '../../services/membro-grupo.service';
import { Grupo } from '../../models/Grupo';
import { MembroGrupo } from '../../models/MembroGrupo';
import { Utilizador } from '../../models/Utilizador';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagina-inicial',
  imports: [CommonModule],
  templateUrl: './pagina-inicial.component.html',
  styleUrl: './pagina-inicial.component.scss'
})
export class PaginaInicialComponent {

  
  constructor(private router: Router) { }

  conjuntoArtistas: Artista[] = [];
  conjuntoAlbuns: Album[] = [];
  conjuntoGrupos: Grupo[] = [];
  conjuntoMembroGrupo: MembroGrupo[] =[];
  mostrarGrupos: boolean = false;


  username: string = "";

  artistaService = inject(ArtistaService);
  albumService = inject(AlbumService);
  grupoService = inject(GrupoService);
  membroGrupoService = inject(MembroGrupoService);
  sharedDataService = inject(SharedDataService);

  ngOnInit() {
    
    this.carregarItens();
    this.username = this.sharedDataService.usuarioLogado.username;
    this.membroGrupoService.getMembrosGrupoByUtilizadorId(this.sharedDataService.usuarioLogado.id!)
  .subscribe(data => {
    this.conjuntoMembroGrupo = data;
  });
  this.conjuntoGrupos = this.conjuntoMembroGrupo.map(mg => mg.grupo);

  const userTeste = new Utilizador(
    1,
    'Administrador',
    'admin',
    'senha123',
    'admin@email.com',
    '2025-06-28',
    2, // tipo = administrador
    1  // ativo = 1
  );

  this.conjuntoGrupos = [
    new Grupo(1, 'Grupo Alpha', 'Primeiro grupo de teste', '2025-06-28', userTeste),
    new Grupo(2, 'Grupo Beta', 'Segundo grupo de teste', '2025-06-28', userTeste),
    new Grupo(3, 'Grupo Gamma', 'Terceiro grupo de teste', '2025-06-28', userTeste)
  ];


  }

  carregarItens(): void {
    this.artistaService.getAllArtistas().subscribe(artistas => {
      this.conjuntoArtistas = artistas;
      console.log(this.conjuntoArtistas);
    });

    this.albumService.getAllAlbuns().subscribe(albuns => {
      this.conjuntoAlbuns = albuns;
      console.log(this.conjuntoAlbuns);
    });


  }

  verGrupos() {
  this.mostrarGrupos = true;
  }
  verPagInicial(){
    this.mostrarGrupos = false;
  }

  abrirGrupo(idGrupo: number | null) {
  if (idGrupo !== null) {
    
    this.router.navigate(['/grupo', idGrupo]);
  } else {
    console.error('ID do grupo inválido.');
  }
}


}
