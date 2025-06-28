import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Artista } from '../../models/Artista';
import { Album } from '../../models/Album';
import { ArtistaService } from '../../services/artista.service';
import { AlbumService } from '../../services/album.service';
import { SharedDataService } from '../../services/shared-data.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UploadService } from '../../services/upload.service';

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

  selectedImage: File | null = null;
  previewUrl: string | null = null;

  artistaService = inject(ArtistaService);
  uploadService = inject(UploadService);
  albumService = inject(AlbumService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  sharedDataService = inject(SharedDataService);

  username: string = '';

  ngOnInit(): void {
    this.username = this.sharedDataService.usuarioLogado.username;

    this.tipo = this.route.snapshot.paramMap.get('tipo');
    this.idMidia = Number(this.route.snapshot.paramMap.get('id'));

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
    }
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
    }
  }

  voltar() {
    this.router.navigate(['/pagina-inicial-adm']);
  }
}
