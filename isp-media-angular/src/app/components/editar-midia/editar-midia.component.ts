import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Artista } from '../../models/Artista';
import { Album } from '../../models/Album';
import { Musica } from '../../models/Musica';
import { Video } from '../../models/Video';
import { Categoria } from '../../models/Categoria';
import { ArtistaService } from '../../services/artista.service';
import { AlbumService } from '../../services/album.service';
import { MusicaService } from '../../services/musica.service';
import { VideoService } from '../../services/video.service';
import { CategoriaService } from '../../services/categoria.service';
import { SharedDataService } from '../../services/shared-data.service';
import { UploadService } from '../../services/upload.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-editar-midia',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editar-midia.component.html',
  styleUrl: './editar-midia.component.scss'
})
export class EditarMidiaComponent implements OnInit {

  tipo: string | null = null;
  idMidia: number | null = null;

  artista: Artista = new Artista(null, '', '', '');
  album: Album = new Album(null, '', '', '', '');
  musica: Musica = new Musica(null, '', '', '', 0, '', '', '', '', null, null);
  video: Video = new Video(null, '', '', '', '', 0, '', '', '', null, null);

  categorias: Categoria[] = [];
  albuns: Album[] = [];
  musicas: Musica[] = [];

  selectedImage: File | null = null;
  previewUrl: string | null = null;

  artistaService = inject(ArtistaService);
  albumService = inject(AlbumService);
  musicaService = inject(MusicaService);
  videoService = inject(VideoService);
  categoriaService = inject(CategoriaService);
  uploadService = inject(UploadService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  sharedDataService = inject(SharedDataService);

  username: string = '';

  ngOnInit(): void {
    this.username = this.sharedDataService.usuarioLogado.username;

    this.tipo = this.route.snapshot.paramMap.get('tipo');
    this.idMidia = Number(this.route.snapshot.paramMap.get('id'));

    // Carregar selects
    this.categoriaService.getAllCategorias().subscribe(data => this.categorias = data);
    this.albumService.getAllAlbuns().subscribe(data => this.albuns = data);
    this.musicaService.getAllMusicas().subscribe(data => this.musicas = data);

    if (this.tipo === 'artista') {
      this.artistaService.getArtistaById(this.idMidia).subscribe(data => {
        this.artista = data;
        this.previewUrl = 'http://localhost:8080' + this.artista.caminhoFoto;
      });
    } else if (this.tipo === 'album') {
      this.albumService.getAlbumById(this.idMidia).subscribe(data => {
        this.album = data;
        this.previewUrl = 'http://localhost:8080' + this.album.caminhoFoto;
      });
    } else if (this.tipo === 'musica') {
      this.musicaService.getMusicaById(this.idMidia).subscribe(data => {
        this.musica = data;
        this.previewUrl = 'http://localhost:8080' + this.musica.caminhoFoto;
      });
    } /*else if (this.tipo === 'video') {
      this.videoService.getVideoById(this.idMidia).subscribe(data => {
        this.video = data;
      });
    }*/
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.selectedImage = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result as string;
      };
      reader.readAsDataURL(file);

      const formData = new FormData();
      formData.append('file', file);

      this.uploadService.uploadImagem(formData).subscribe({
        next: () => console.log('Upload concluído!'),
        error: (err) => console.error('Erro ao fazer upload:', err)
      });

      const caminho = `/files/imagens/${file.name}`;
      if (this.tipo === 'artista') {
        this.artista.caminhoFoto = caminho;
      } else if (this.tipo === 'album') {
        this.album.caminhoFoto = caminho;
      } else if (this.tipo === 'musica') {
        this.musica.caminhoFoto = caminho;
      }
    }
  }

  salvar() {
    if (this.tipo === 'artista') {
      this.artistaService.createArtista(this.artista).subscribe(() => {
        alert('Artista atualizado com sucesso!');
        this.router.navigate(['/pagina-inicial-adm']);
      });
    } else if (this.tipo === 'album') {
      this.albumService.createAlbum(this.album).subscribe(() => {
        alert('Álbum atualizado com sucesso!');
        this.router.navigate(['/pagina-inicial-adm']);
      });
    } else if (this.tipo === 'musica') {
      this.musicaService.createMusica(this.musica).subscribe(() => {
        alert('Música atualizada com sucesso!');
        this.router.navigate(['/pagina-inicial-adm']);
      });
    } /*else if (this.tipo === 'video') {
      this.videoService.createVideo(this.video).subscribe(() => {
        alert('Vídeo atualizado com sucesso!');
        this.router.navigate(['/pagina-inicial-adm']);
      });
    }*/
  }

  voltar() {
    this.router.navigate(['/pagina-inicial-adm']);
  }
}
