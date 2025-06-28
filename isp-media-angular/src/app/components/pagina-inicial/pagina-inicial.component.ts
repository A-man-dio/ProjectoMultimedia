import { Component, inject } from '@angular/core';
import { Artista } from '../../models/Artista';
import { ArtistaService } from '../../services/artista.service';
import { CommonModule } from '@angular/common';
import { SharedDataService } from '../../services/shared-data.service';
import { Album } from '../../models/Album';
import { AlbumService } from '../../services/album.service';

@Component({
  selector: 'app-pagina-inicial',
  imports: [CommonModule],
  templateUrl: './pagina-inicial.component.html',
  styleUrl: './pagina-inicial.component.scss'
})
export class PaginaInicialComponent {

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




}
