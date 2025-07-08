import { Component, inject } from '@angular/core';
import { Album } from '../../models/Album';
import { Artista } from '../../models/Artista';
import { AlbumService } from '../../services/album.service';
import { ArtistaService } from '../../services/artista.service';
import { SharedDataService } from '../../services/shared-data.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Musica } from '../../models/Musica';
import { Video } from '../../models/Video';
import { MusicaService } from '../../services/musica.service';
import { VideoService } from '../../services/video.service';

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
  conjuntoMusicas: Musica[] = [];
  conjuntoVideos: Video[] = [];
  username: string = "";

  artistaService = inject(ArtistaService);
  albumService = inject(AlbumService);
  musicaService = inject(MusicaService);
  videoService = inject(VideoService);
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

    this.musicaService.getAllMusicas().subscribe(musicas => {
      this.conjuntoMusicas = musicas;
      console.log(this.conjuntoMusicas);
    });
    this.videoService.getAllVideos().subscribe(videos => {
      this.conjuntoVideos = videos;
      console.log(this.conjuntoVideos);
    });
  }
  irParaEditarMidia(tipo: string, idMidia: number | null) {
    this.router.navigate(['/editar-midia', tipo, idMidia]);
  }

  gerirUtilizadores(){
    this.router.navigate(['/gerir-utilizadores']);
  }
}
