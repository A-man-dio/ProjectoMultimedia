import { Component, inject } from '@angular/core';
import { Album } from '../../models/Album';
import { Artista } from '../../models/Artista';
import { AlbumService } from '../../services/album.service';
import { ArtistaService } from '../../services/artista.service';
import { SharedDataService } from '../../services/shared-data.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagina-inicial-adm',
  imports: [CommonModule],
  templateUrl: './pagina-inicial-adm.component.html',
  styleUrl: './pagina-inicial-adm.component.scss'
})
export class PaginaInicialAdmComponent {
  constructor(private router: Router) {}
  conjuntoArtistas: Artista[] = [];
  conjuntoAlbuns: Album[] = [];
  username: string = "";
  artistaService = inject(ArtistaService);
  albumService = inject(AlbumService);
  sharedDataService = inject(SharedDataService);

  ngOnInit() {
    this.carregarItens();
    this.username = this.sharedDataService.usuarioLogado.username;
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
  irParaEditarMidia(tipo: string, idMidia: number | null) {
    this.router.navigate(['/editar-midia', tipo, idMidia]);
  }
}
