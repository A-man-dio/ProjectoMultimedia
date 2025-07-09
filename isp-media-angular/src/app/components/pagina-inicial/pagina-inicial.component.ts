import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { Artista } from '../../models/Artista';
import { ArtistaService } from '../../services/artista.service';
import { CommonModule } from '@angular/common';
import { SharedDataService } from '../../services/shared-data.service';
import { Album } from '../../models/Album';
import { AlbumService } from '../../services/album.service';
import { Musica } from '../../models/Musica';
import { ConteudoGrupoService } from '../../services/conteudo-grupo.service';
import { Utilizador } from '../../models/Utilizador';
import { Video } from '../../models/Video';
import { MusicaArtistaService } from '../../services/musica-artista.service';
import Hls from 'hls.js';
import { LetraService } from '../../services/letra.service';
import { firstValueFrom, forkJoin, share } from 'rxjs';
import { AlbumArtistaService } from '../../services/album-artista.service';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { MembroGrupoService } from '../../services/membro-grupo.service';
import { Grupo } from '../../models/Grupo';
import { Categoria } from '../../models/Categoria';
import { MeuCarregadoService } from '../../services/meu-carregado.service';
import { MeuCarregado } from '../../models/MeuCarregado';
import { GrupoService } from '../../services/grupo.service';
import { MembroGrupo } from '../../models/MembroGrupo';
import { Playlist } from '../../models/Playlist';
import { PlaylistService } from '../../services/playlist.service';
import { PlaylistMusicaService } from '../../services/playlist-musica.service';
import { PrivilegioEditorService } from '../../services/privilegio-editor.service';
import { RadioEstacao } from '../../models/RadioEstacao';
import { RadioEstacaoService } from '../../services/radio-estacao.service';
import { UploadService } from '../../services/upload.service';
import { AlbumArtista } from '../../models/AlbumArtista';
import { FicheiroService } from '../../services/ficheiro-service.service';
import { MusicaArtista } from '../../models/MusicaArtista';
import { MusicaService } from '../../services/musica.service';

@Component({
  selector: 'app-pagina-inicial',
  imports: [CommonModule, FormsModule],
  templateUrl: './pagina-inicial.component.html',
  styleUrl: './pagina-inicial.component.scss',
})
export class PaginaInicialComponent {
  @ViewChild('audioPlayer') audioPlayer!: ElementRef<HTMLAudioElement>;
  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;
  @ViewChild('body') paginaInicial!: ElementRef<HTMLElement>;
  @ViewChild('barraPesquisa') barraPesquisa!: ElementRef<HTMLElement>;

  private hlsAudio!: Hls | null;
  private hlsVideo!: Hls | null;

  isModalMusicaAberta: boolean = false;
  isModalAlbumAberto: boolean = false;
  isModalArtistaAberta: boolean = false;
  abaSeleccionada: string = 'pagina-inicial';
  isReprodutorFechado: boolean = true;
  isReprodutorMaximizadoFechado: boolean = true;
  isPaginaAlbumFechado: boolean = true;
  isPaginaArtistaFechado: boolean = true;
  isPaginaVideoFechado: boolean = true;
  isPaginaGrupoFechado: boolean = true;
  isPaginaConteudoGrupoFechado: boolean = true;
  isPaginaPlaylistFechada: boolean = true;
  isPaginaConteudoMidiasCompartilhadasFechado: boolean = true;
  username?: string = '';
  letraMusica: string = '';
  qtdNoScrollAdicionar: number = 0;
  pesquisaInput: string = '';
  audio = new Audio();

  //variáveis
  conjuntoEstacoesRadio: RadioEstacao[] = [];
  conjuntoArtistas: Artista[] = [];
  conjuntoAlbuns: Album[] = [];
  conjuntoMusicas: Musica[] = [];
  conjuntoVideos: Video[] = [];
  conjuntoArtistasMusicas: Artista[][] = [];
  conjuntoArtistasAlbuns: Artista[][] = [];
  conjuntoCriadoresPostagemMusicas: Utilizador[] = [];
  conjuntoCriadoresPostagemVideos: Utilizador[] = [];

  novoArtista: Artista = new Artista(null, '', '', '');
  fotoSelecionada!: File | null;

  novoTitulo: string = '';
  novaDescricao: string = '';
  novaDataLancamento: string = '';
  novaCapa!: File | null;
  artistasSelecionados: Artista[] = [];

  novoTituloMusica: string = '';
  novaDataLancamentoMusica: string = '';
  novaMusicaFile: File | undefined;
  novaLetraFile: File | null = null;

  novaCapaMusica: File | undefined;
  novoAlbumSelecionadoMusica: Album | null = null;
  novaCategoriaSelecionadaMusica: Categoria | null = null;
  novosArtistasSelecionadosMusica: Artista[] = [];

  conjuntoGruposUsuario: Grupo[] = [];
  conjuntoGruposVisiveis: Grupo[] = [];
  conjuntoGruposSistema: Grupo[] = [];
  conjuntoUsuariosGrupos: MembroGrupo[][] = []; //Usuarios com estado 1
  conjuntoMusicasGrupos: Musica[][] = []; //dos grupos que o usuario tá
  conjuntoVideosGrupos: Video[][] = []; //dos grupos que o usuario tá

  conjuntoCategoriasMusicas: Categoria[] = [];
  conjuntoCategoriasVideos: Categoria[] = [];

  conjuntoPlaylistsUsuario: Playlist[] = [];
  conjuntoPlaylistsVisiveis: Playlist[] = [];
  conjuntoPlaylistsSistema: Playlist[] = [];
  conjuntoMusicasPlaylists: Musica[][] = [];

  //variáveis pesquisa
  conjuntoPesquisa: any[] = [];
  conjuntoOriginal: any[] = [];

  //variáveis midiasCarregadas
  conjuntoMeusCarregadosTotal: MeuCarregado[] = [];
  conjuntoMeusCarregadosMusicas: MeuCarregado[] = [];
  conjuntoMeusCarregadosVideos: MeuCarregado[] = [];
  conjuntoArtistasMeusCarregadosMusicas: Artista[][] = [];

  //Variáveis Mídias Externas
  conjuntoUsuariosCompartilhouMidias: Utilizador[] = [];
  conjuntoMusicasCompartilhadas: MeuCarregado[][] = [];
  conjuntoVideosCompartilhados: MeuCarregado[][] = [];
  conjuntoArtistasMusicasCompartilhadas: Artista[][][] = [];

  //injecções de dependência
  artistaService = inject(ArtistaService);
  albumService = inject(AlbumService);
  conteudoGrupoService = inject(ConteudoGrupoService);
  sharedDataService = inject(SharedDataService);
  musicaArtistaService = inject(MusicaArtistaService);
  albumArtistaService = inject(AlbumArtistaService);
  membroGrupoService = inject(MembroGrupoService);
  grupoService = inject(GrupoService);
  meuCarregadoService = inject(MeuCarregadoService);
  playlistService = inject(PlaylistService);
  playlistMusicaService = inject(PlaylistMusicaService);
  privilegioEditorService = inject(PrivilegioEditorService);
  radioEstacaoService = inject(RadioEstacaoService);
  letraService = inject(LetraService);
  uploadService = inject(UploadService);
  musicaService = inject(MusicaService);
  ficheiroService = inject(FicheiroService);
  toast = inject(ToastrService);

  ngOnInit() {
    this.username = this.sharedDataService.usuarioLogado?.username;
    this.carregarItens();
  }

  onFileSelected(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.fotoSelecionada = event.target.files[0];
    }
  }

  adicionarArtistaSelecionado(event: any) {
    const idArtista = +event.target.value;
    const artista = this.conjuntoArtistas.find((a) => a.id === idArtista);
    if (
      artista &&
      !this.artistasSelecionados.some((a) => a.id === artista.id)
    ) {
      this.artistasSelecionados.push(artista);
    }
    event.target.value = ''; // Reset select
  }

  removerArtistaSelecionado(artista: Artista) {
    this.artistasSelecionados = this.artistasSelecionados.filter(
      (a) => a.id !== artista.id
    );
  }

  async salvarNovaMusica() {
    if (!this.novaMusicaFile || !this.novaCapaMusica) {
      this.toast.warning('Preencha todos os campos obrigatórios!', 'Atenção!');
      return;
    }

    try {
      // Upload da música
      const caminhoFicheiro: string = await firstValueFrom(
        this.ficheiroService.uploadFicheiro(this.novaMusicaFile, 'musica')
      );

      // Upload da letra
      let caminhoLetra: string | null = null;

      if (this.novaLetraFile) {
        caminhoLetra = await firstValueFrom(
          this.uploadService.uploadLetra(this.novaLetraFile)
        );
      }

      // Upload da capa da música
      const formDataCapa = new FormData();
      formDataCapa.append('file', this.novaCapaMusica);
      const caminhoCapa: string = await firstValueFrom(
        this.uploadService.uploadImagem(formDataCapa)
      );

      // Tentar obter duração (opcional)
      const audio = new Audio(URL.createObjectURL(this.novaMusicaFile));
      await new Promise((resolve) => {
        audio.addEventListener('loadedmetadata', resolve);
      });
      const duracao = this.formatarTempoM(audio.duration); // por exemplo: "00:03:45"

      // Monta a música
      const musica = new Musica(
        null,
        this.novoTituloMusica,
        duracao,
        this.novaMusicaFile.type.split('/')[1], // formato (ex: "mp3")
        Math.round(this.novaMusicaFile.size / (1024 * 1024)), // tamanho em MB aproximado
        caminhoLetra || "",
        this.novaDataLancamentoMusica,
        caminhoFicheiro,
        caminhoCapa,
        this.novoAlbumSelecionadoMusica, // pode ser null
        this.novaCategoriaSelecionadaMusica // pode ser null
      );

      console.log("musica add:" +musica);

      // Salvar no backend
      const musicaCriada = await firstValueFrom(
        this.musicaService.createMusica(musica)
      );

      // Vínculo com artistas
      for (const artista of this.novosArtistasSelecionadosMusica) {
        const musicaArtista = new MusicaArtista(null, musicaCriada, artista);
        await firstValueFrom(
          this.musicaArtistaService.saveMusicaArtista(musicaArtista)
        );
      }

      this.toast.success('Música criada com sucesso!', 'Sucesso!');
      this.fecharModalAdicionarMusica();
      this.carregarItens(); // ou método para atualizar a lista de músicas

      // Reset campos
      this.novoTituloMusica = '';
      this.novaMusicaFile = null!;
      this.novaLetraFile = null!;
      this.novaCapaMusica = null!;
      this.novaDataLancamentoMusica = '';
      this.novoAlbumSelecionadoMusica = null;
      this.novaCategoriaSelecionadaMusica = null;
      this.novosArtistasSelecionadosMusica = [];
    } catch (err) {
      console.error(err);
      this.toast.error('Erro ao criar música!', 'Erro!');
    }
  }

  private formatarTempoM(segundos: number): string {
    const min = Math.floor(segundos / 60)
      .toString()
      .padStart(2, '0');
    const seg = Math.floor(segundos % 60)
      .toString()
      .padStart(2, '0');
    return `00:${min}:${seg}`;
  }

  async salvarNovoAlbum() {
    if (!this.novoTitulo || !this.novaCapa) {
      this.toast.warning(
        'Preencha todos os campos e selecione uma capa.',
        'Atenção!'
      );
      return;
    }

    const formData = new FormData();
    formData.append('file', this.novaCapa);

    this.uploadService.uploadImagem(formData).subscribe({
      next: (caminhoFoto) => {
        const novoAlbum = new Album(
          null,
          this.novoTitulo,
          this.novaDescricao,
          this.novaDataLancamento,
          caminhoFoto,
          this.sharedDataService.usuarioLogado
        );

        this.albumService.createAlbum(novoAlbum).subscribe({
          next: (albumCriado) => {
            this.artistasSelecionados.forEach((artista) => {
              const albumArtista = new AlbumArtista(null, albumCriado, artista);
              this.albumArtistaService
                .saveAlbumArtista(albumArtista)
                .subscribe();
            });

            this.toast.success('Álbum adicionado com sucesso!', 'Sucesso!');
            this.fecharModalAdicionarAlbum();
            this.carregarItens();
          },
          error: () => {
            this.toast.error('Erro ao salvar álbum.', 'Erro!');
          },
        });
      },
      error: () => {
        this.toast.error('Erro ao fazer upload da capa.', 'Erro!');
      },
    });
  }

  async salvarNovoArtista() {
    if (!this.fotoSelecionada) {
      this.toast.warning('Selecione uma foto.', 'Atenção!', {
        closeButton: true,
      });
      return;
    }

    const formData = new FormData();
    formData.append('file', this.fotoSelecionada);

    this.uploadService.uploadImagem(formData).subscribe({
      next: (caminhoFoto) => {
        this.novoArtista.caminhoFoto = caminhoFoto;

        this.artistaService.createArtista(this.novoArtista).subscribe({
          next: (artistaCriado) => {
            this.toast.success('Artista adicionado com sucesso!', 'Sucesso!', {
              closeButton: true,
            });
            this.fecharModalAdicionarArtista();
            this.carregarItens(); // recarrega lista
            this.novoArtista = new Artista(null, '', '', '');
            this.fotoSelecionada = null;
          },
          error: () => {
            this.toast.error('Erro ao salvar artista.', 'Erro!', {
              closeButton: true,
            });
          },
        });
      },
      error: () => {
        this.toast.error('Erro ao fazer upload da imagem.', 'Erro!', {
          closeButton: true,
        });
      },
    });
    this.carregarAlbunsEArtistas();
  }

  getRecursoUrl(caminhoFicheiro: string): string {
    return `http://${window.location.hostname}:8080${caminhoFicheiro}`;
  }

  carregarItens(): void {
    this.zerarVariaveis();

    this.carregarEstacoesRadio();

    this.carregarAlbunsEArtistas();

    this.carregarGruposEMembros();

    this.carregarPlaylists();

    this.membroGrupoService
      .getMembrosGrupoByEstadoAndUtilizadorId(
        1,
        this.sharedDataService.usuarioLogado.id!
      )
      .subscribe({
        next: (membrosGrupo) => {
          membrosGrupo.forEach((membroGrupo) => {
            this.conjuntoGruposUsuario.push(membroGrupo.grupo);
          });
        },
        complete: () => {
          this.carregarUsuariosCompartilharamMidias();
          this.pegarConteudosDosGruposEmQueUsuarioSeEncontra();
        },
      });
  }

  zerarVariaveis() {
    this.conjuntoArtistas = [];

    this.conjuntoAlbuns = [];
    this.conjuntoMusicas = [];
    this.conjuntoVideos = [];
    this.conjuntoArtistasMusicas = [];
    this.conjuntoArtistasAlbuns = [];
    this.conjuntoCriadoresPostagemMusicas = [];
    this.conjuntoCriadoresPostagemVideos = [];

    this.conjuntoCategoriasMusicas = [];
    this.conjuntoCategoriasVideos = [];

    this.conjuntoMusicasGrupos = []; //dos grupos que o usuario tá
    this.conjuntoVideosGrupos = []; //dos grupos que o usuario tá
    this.conjuntoGruposVisiveis = [];
    this.conjuntoGruposSistema = [];
    this.conjuntoUsuariosGrupos = [];
    this.conjuntoGruposUsuario = [];

    this.conjuntoPlaylistsUsuario = [];
    this.conjuntoPlaylistsVisiveis = [];
    this.conjuntoPlaylistsSistema = [];
    this.conjuntoMusicasPlaylists = [];

    this.conjuntoPesquisa = [];
    this.conjuntoOriginal = [];

    this.conjuntoMeusCarregadosMusicas = [];
    this.conjuntoMeusCarregadosTotal = [];
    this.conjuntoMeusCarregadosVideos = [];
    this.conjuntoArtistasMeusCarregadosMusicas = [];

    this.conjuntoUsuariosCompartilhouMidias = [];
    this.conjuntoMusicasCompartilhadas = [];
    this.conjuntoVideosCompartilhados = [];
  }

  carregarEstacoesRadio() {
    this.radioEstacaoService
      .getAllRadioEstacoes()
      .subscribe((radioEstacoes) => {
        this.conjuntoEstacoesRadio = radioEstacoes;
      });
  }

  getIndexOriginal(elemento: any, tipo: 'musica' | 'video'): number {
    return tipo === 'musica'
      ? this.conjuntoMusicas.findIndex((m) => m.id === elemento.id)
      : this.conjuntoVideos.findIndex((m) => m.id === elemento.id);
  }

  pegarMusicasVideosDeUmaCategoria(
    idCategoria: number | null,
    tipo: 'musica'
  ): Musica[];
  pegarMusicasVideosDeUmaCategoria(
    idCategoria: number | null,
    tipo: 'video'
  ): Video[];
  pegarMusicasVideosDeUmaCategoria(
    idCategoria: number | null,
    tipo: 'musica' | 'video'
  ): Musica[] | Video[] {
    return tipo === 'musica'
      ? this.conjuntoMusicas.filter((m) => m.categoria?.id === idCategoria)
      : this.conjuntoVideos.filter((v) => v.categoria?.id === idCategoria);
  }

  async juntarMusicasVideosMeusCarregadosConteudosGrupos() {
    this.conjuntoMeusCarregadosMusicas.forEach((meuCarregado) => {
      if (
        !this.verificarSeMeuCarregadoSeEncontraConjuntoMusicasVideos(
          meuCarregado,
          'musica'
        )
      ) {
        this.conjuntoMusicas.push(meuCarregado.musica);
        this.conjuntoArtistasMusicas.push(
          this.encontrarArtistasMeusCarregadosMusica(
            meuCarregado.musica,
            this.conjuntoMeusCarregadosMusicas,
            this.conjuntoArtistasMeusCarregadosMusicas
          )
        );
        this.conjuntoCriadoresPostagemMusicas.push(meuCarregado.utilizador);
      }
    });

    for (const meusCarregados of this.conjuntoMusicasCompartilhadas) {
      for (const meuCarregado of meusCarregados) {
        if (
          !this.verificarSeMeuCarregadoSeEncontraConjuntoMusicasVideos(
            meuCarregado,
            'musica'
          )
        ) {
          this.conjuntoMusicas.push(meuCarregado.musica);
          const artistas = await this.pegarArtistasMusicaNaRede(
            meuCarregado.musica
          );
          this.conjuntoArtistasMusicas.push(artistas);
          this.conjuntoCriadoresPostagemMusicas.push(meuCarregado.utilizador);
        }
      }
    }

    this.conjuntoMeusCarregadosVideos.forEach((meuCarregado) => {
      if (
        !this.verificarSeMeuCarregadoSeEncontraConjuntoMusicasVideos(
          meuCarregado,
          'video'
        )
      ) {
        this.conjuntoVideos.push(meuCarregado.video);
        this.conjuntoCriadoresPostagemVideos.push(meuCarregado.utilizador);
      }
    });

    this.conjuntoVideosCompartilhados.forEach((meusCarregados) => {
      meusCarregados.forEach((meuCarregado) => {
        if (
          !this.verificarSeMeuCarregadoSeEncontraConjuntoMusicasVideos(
            meuCarregado,
            'video'
          )
        ) {
          this.conjuntoVideos.push(meuCarregado.video);
          this.conjuntoCriadoresPostagemVideos.push(meuCarregado.utilizador);
        }
      });
    });
  }

  async pegarArtistasMusicaNaRede(musica: Musica): Promise<Artista[]> {
    const artistasMusicas = await firstValueFrom(
      this.musicaArtistaService.getMusicasArtistasByMusicaId(musica.id!)
    );
    return artistasMusicas.map((ma) => ma.artista);
  }

  verificarSeMeuCarregadoSeEncontraConjuntoMusicasVideos(
    meuCarregado: MeuCarregado,
    tipo: 'musica' | 'video'
  ): boolean {
    const conjunto =
      tipo === 'musica' ? this.conjuntoMusicas : this.conjuntoVideos;
    const idMidia =
      tipo === 'musica' ? meuCarregado.musica?.id : meuCarregado.video?.id;

    return conjunto.some((m) => m.id === idMidia);
  }

  carregarAlbunsEArtistas() {
    //Pegar Artistas
    this.artistaService.getAllArtistas().subscribe((artistas) => {
      this.conjuntoArtistas = artistas;
    });

    //Pegar álbuns
    this.albumService.getAllAlbuns().subscribe((albuns) => {
      this.conjuntoAlbuns = albuns;
    });
  }

  carregarUsuariosCompartilharamMidias() {
    this.privilegioEditorService
      .getPrivilegiosEditoresByBeneficiarioId(
        this.sharedDataService.usuarioLogado.id!
      )
      .subscribe({
        next: (privilegiosEditores) => {
          this.conjuntoUsuariosCompartilhouMidias = privilegiosEditores.map(
            (m) => m.concedente
          );
        },
        complete: () => {
          this.pegarMidiasExternasUsuarios();
        },
      });
  }

  pegarMidiasExternasUsuarios() {
    this.conjuntoUsuariosCompartilhouMidias.forEach((usuario, i) => {
      this.meuCarregadoService
        .getMeusCarregadosByUtilizadorId(usuario.id!)
        .subscribe((meusCarregados) => {
          this.conjuntoMusicasCompartilhadas[i] = [];
          this.conjuntoVideosCompartilhados[i] = [];

          meusCarregados.forEach((meuCarregado) => {
            if (meuCarregado.musica != null) {
              this.conjuntoMusicasCompartilhadas[i].push(meuCarregado);
            } else {
              this.conjuntoVideosCompartilhados[i].push(meuCarregado);
            }
          });
        });
    });
  }

  pegarMusicasVideosCompartilhadasDeUmUsuario(
    usuario: Utilizador,
    conjuntoUsuariosCompartilhouMidias: Utilizador[],
    tipo: 'musica' | 'video'
  ): MeuCarregado[] {
    const meusCarregadosMusicasVideos =
      tipo == 'musica'
        ? this.conjuntoMusicasCompartilhadas
        : this.conjuntoVideosCompartilhados;

    const index = conjuntoUsuariosCompartilhouMidias.findIndex(
      (m) => m.id === usuario.id
    );
    if (index !== -1) {
      return meusCarregadosMusicasVideos[index];
    }
    return [];
  }

  carregarPlaylists() {
    this.playlistService.getAllPlaylists().subscribe({
      next: (playlists) => {
        this.conjuntoPlaylistsSistema = playlists;
        this.conjuntoPlaylistsUsuario = playlists.filter(
          (m) => m.utilizador.id == this.sharedDataService.usuarioLogado.id
        );
        this.conjuntoPlaylistsVisiveis = playlists.filter(
          (m) => m.privada == false
        );
      },
      complete: () => {
        this.pegarMusicasPlaylists();
      },
    });
  }

  pegarMusicasPlaylists() {
    this.conjuntoPlaylistsSistema.forEach((playlist, i) => {
      this.playlistMusicaService
        .getPlaylistMusicasByPlaylistId(playlist.id!)
        .subscribe((playlistMusicas) => {
          this.conjuntoMusicasPlaylists[i] = [];
          playlistMusicas.forEach((playlistMusica) =>
            this.conjuntoMusicasPlaylists[i].push(playlistMusica.musica)
          );
        });
    });
  }

  carregarGruposEMembros() {
    this.grupoService.getAllGrupos().subscribe({
      next: (grupos) => {
        this.conjuntoGruposSistema = grupos;
        this.conjuntoGruposVisiveis = grupos.filter((m) => m.publico == true);
      },
      complete: () => {
        this.pegarMembrosGrupos();
      },
    });
  }

  //função que pega os membros de cada grupo do sistema
  pegarMembrosGrupos() {
    this.conjuntoGruposSistema.forEach((grupo, i) => {
      this.membroGrupoService
        .getMembrosGrupoByGrupoId(grupo.id!)
        .subscribe((membrosGrupos) => {
          this.conjuntoUsuariosGrupos[i] = [];
          membrosGrupos.forEach((membroGrupo) => {
            if (membroGrupo.estado == 1) {
              this.conjuntoUsuariosGrupos[i].push(membroGrupo);
            }
          });
        });
    });
  }

  pegarMembrosGrupoDeUmGrupo(
    grupo: Grupo,
    conjuntoGruposSistema: Grupo[],
    conjuntoUsuariosGrupos: MembroGrupo[][]
  ): MembroGrupo[] {
    const index = conjuntoGruposSistema.findIndex((m) => m.id === grupo.id);
    if (index !== -1) {
      return conjuntoUsuariosGrupos[index];
    }
    return [];
  }

  verificarSeUsuarioEstaNoGrupo(idGrupo: number | null): Grupo | undefined {
    return this.conjuntoGruposUsuario.find((m) => m.id == idGrupo);
  }

  async pegarConteudosDosGruposEmQueUsuarioSeEncontra() {
    for (const grupoUsuario of this.conjuntoGruposUsuario) {
      await this.pegarConteudosDeUmGrupo(grupoUsuario.id!);
    }

    //Após pegar as músicas do grupo público , pegar os artistas de cada música

    this.pegarArtistasConjuntoMusicas();
    this.pegarArtistasConjuntoAlbuns();
    this.carregarMidiasCarregadas();
  }

  async pegarConteudosDeUmGrupo(idGrupo: number): Promise<void> {
    const conteudosGrupos = await firstValueFrom(
      this.conteudoGrupoService.getConteudosGruposByGrupoId(idGrupo)
    );

    conteudosGrupos.forEach((conteudoGrupo) => {
      if (conteudoGrupo.video == null) {
        this.conjuntoMusicas.push(conteudoGrupo.musica!);
        this.AdicionarMusicaVideoAoGrupoArray(
          conteudoGrupo.musica,
          this.conjuntoMusicasGrupos,
          idGrupo
        );
        this.conjuntoCriadoresPostagemMusicas.push(conteudoGrupo.utilizador);
      } else {
        this.conjuntoVideos.push(conteudoGrupo.video!);
        this.AdicionarMusicaVideoAoGrupoArray(
          conteudoGrupo.video,
          this.conjuntoVideosGrupos,
          idGrupo
        );
        this.conjuntoCriadoresPostagemVideos.push(conteudoGrupo.utilizador);
      }
    });
  }

  pegarMusicasGrupo(
    grupo: Grupo,
    conjuntoGruposUsuario: Grupo[],
    conjuntoMusicasGrupos: Musica[][]
  ): Musica[] | null {
    const index = conjuntoGruposUsuario.findIndex((a) => a.id === grupo.id);
    if (index !== -1) {
      return conjuntoMusicasGrupos[index];
    }
    return null;
  }

  pegarMusicasPlaylist(
    playlist: Playlist,
    conjuntoPlaylistsSistema: Playlist[],
    conjuntoMusicasPlaylists: Musica[][]
  ): Musica[] | null {
    const index = conjuntoPlaylistsSistema.findIndex(
      (a) => a.id === playlist.id
    );
    if (index !== -1) {
      return conjuntoMusicasPlaylists[index];
    }
    return null;
  }

  pegarVideosGrupo(
    grupo: Grupo,
    conjuntoGruposUsuario: Grupo[],
    conjuntoVideosGrupos: Video[][]
  ): Video[] | null {
    const index = conjuntoGruposUsuario.findIndex((a) => a.id === grupo.id);
    if (index !== -1) {
      return conjuntoVideosGrupos[index];
    }
    return null;
  }

  carregarMidiasCarregadas() {
    this.meuCarregadoService
      .getMeusCarregadosByUtilizadorId(this.sharedDataService.usuarioLogado.id!)
      .subscribe({
        next: (meusCarregados) => {
          this.conjuntoMeusCarregadosTotal = meusCarregados;
          this.conjuntoMeusCarregadosMusicas = meusCarregados.filter(
            (m) => m.musica != null
          );
          this.conjuntoMeusCarregadosVideos = meusCarregados.filter(
            (m) => m.video != null
          );
        },
        complete: () => {
          this.pegarArtistasMeusCarregadosMusicas();
        },
      });
  }

  pegarArtistasMeusCarregadosMusicas() {
    if (this.conjuntoMeusCarregadosMusicas.length > 0) {
      const observables = this.conjuntoMeusCarregadosMusicas.map(
        (meuCarregado) =>
          this.musicaArtistaService.getMusicasArtistasByMusicaId(
            meuCarregado.musica.id!
          )
      );

      forkJoin(observables).subscribe((resultados) => {
        this.conjuntoArtistasMeusCarregadosMusicas = resultados.map(
          (musicasArtistas) => musicasArtistas.map((ma) => ma.artista)
        );
        this.carregarCategoriasJuntarMusicasVideos();
      });
    } else {
      this.carregarCategoriasJuntarMusicasVideos();
    }
  }

  carregarCategoriasJuntarMusicasVideos() {
    // ✅ Só aqui depois de tudo pronto
    this.juntarMusicasVideosMeusCarregadosConteudosGrupos();
    this.pegarCategorias('musica');
    this.pegarCategorias('video');

    if (this.abaSeleccionada == 'artistas') {
      this.conjuntoOriginal = [...this.conjuntoArtistas];
    } else if (this.abaSeleccionada == 'albuns') {
      this.conjuntoOriginal = [...this.conjuntoAlbuns];
    } else if (this.abaSeleccionada == 'musicas') {
      this.conjuntoOriginal = [...this.conjuntoMusicas];
    } else if (this.abaSeleccionada == 'videos') {
      this.conjuntoOriginal = [...this.conjuntoVideos];
    } else if (this.abaSeleccionada == 'midiasCarregados') {
      this.conjuntoOriginal = [...this.conjuntoMeusCarregadosTotal];
    }
  }

  verificarSeMidiaFoiCriadaDirectamenteGrupo(
    meuCarregado: MeuCarregado,
    tipo: 'musica' | 'video'
  ): Grupo | null {
    if (meuCarregado.vinculoDireto == true) {
      return tipo == 'musica'
        ? this.pegarGrupoDeUmMidia(meuCarregado.musica, 'musica')
        : this.pegarGrupoDeUmMidia(meuCarregado.video, 'video');
    } else {
      return null;
    }
  }

  pegarGrupoDeUmMidia(midia: any, tipo: 'musica' | 'video'): Grupo | null {
    const conjunto =
      tipo == 'musica' ? this.conjuntoMusicasGrupos : this.conjuntoVideosGrupos;

    const index = conjunto.findIndex((grupo) =>
      grupo.some((m) => m.id === midia.id)
    );

    if (index !== -1) {
      return this.conjuntoGruposUsuario[index];
    }

    return null;
  }

  AdicionarMusicaVideoAoGrupoArray(
    musicaVideo: any,
    conjunto: any[][],
    idGrupo: number
  ) {
    const index = this.conjuntoGruposUsuario.findIndex((a) => a.id === idGrupo);
    if (index !== -1) {
      if (!conjunto[index]) {
        conjunto[index] = []; // Inicializa se estiver undefined
      }
      conjunto[index].push(musicaVideo);
    }
  }

  //função que pega os artistas de cada música no grupo público
  pegarArtistasConjuntoMusicas() {
    this.conjuntoMusicas.forEach((musica, i) => {
      this.musicaArtistaService
        .getMusicasArtistasByMusicaId(musica.id!)
        .subscribe((musicasArtistas) => {
          this.conjuntoArtistasMusicas[i] = [];
          musicasArtistas.forEach((musicaArtista) =>
            this.conjuntoArtistasMusicas[i].push(musicaArtista.artista)
          );
        });
    });
  }

  //função que pega os artistas de cada álbum no grupo público
  pegarArtistasConjuntoAlbuns() {
    this.conjuntoAlbuns.forEach((album, i) => {
      this.albumArtistaService
        .getAlbunsArtistasByAlbumId(album.id!)
        .subscribe((albunsArtistas) => {
          this.conjuntoArtistasAlbuns[i] = [];
          albunsArtistas.forEach((albumArtista) =>
            this.conjuntoArtistasAlbuns[i].push(albumArtista.artista)
          );
        });
    });
  }

  pegarCategorias(tipo: 'musica' | 'video') {
    console.log('aquiii');

    if (tipo == 'musica') {
      this.conjuntoMusicas.forEach((musica) => {
        if (
          !this.conjuntoCategoriasMusicas.some(
            (c) => c.id == musica.categoria?.id
          )
        ) {
          this.conjuntoCategoriasMusicas.push(musica.categoria!);
        }
      });
    } else {
      this.conjuntoVideos.forEach((video) => {
        if (
          !this.conjuntoCategoriasVideos.some(
            (c) => c.id == video.categoria?.id
          )
        ) {
          this.conjuntoCategoriasVideos.push(video.categoria!);
        }
      });
    }
  }

  pegarArtistasAlbum(
    album: Album,
    conjuntoAlbuns: Album[],
    conjuntoArtistasAlbuns: Artista[][]
  ): Artista[] {
    const index = conjuntoAlbuns.findIndex((a) => a.id === album.id);
    if (index !== -1) {
      return conjuntoArtistasAlbuns[index];
    }

    return [];
  }

  pegarArtistasMusica(
    musica: Musica,
    conjuntoMusicas: Musica[],
    conjuntoArtistasMusicas: Artista[][]
  ): Artista[] {
    const index = conjuntoMusicas.findIndex((m) => m.id === musica.id);
    if (index !== -1) {
      return conjuntoArtistasMusicas[index];
    }
    return [];
  }

  getMusicasDosMeusCarregados(): Musica[] {
    return this.conjuntoMeusCarregadosMusicas.map((m) => m.musica);
  }

  verificarExisteMusicaVideoMeusCarregadosEPrivado(
    meuCarregado: MeuCarregado | null,
    tipo: 'musica' | 'video'
  ): boolean {
    if (!meuCarregado) return false;

    const meuCarregadoEncontrado =
      tipo == 'musica'
        ? this.conjuntoMeusCarregadosMusicas.find(
            (m) => m.musica.id == meuCarregado.musica.id
          )
        : this.conjuntoMeusCarregadosVideos.find(
            (m) => m.video.id == meuCarregado.video.id
          );

    return meuCarregadoEncontrado!.vinculoDireto == false ? true : false;
  }

  getMusicaVideoMeusCarregados(
    midia: Musica | Video,
    tipo: 'musica' | 'video'
  ): MeuCarregado | null {
    return tipo == 'musica'
      ? this.conjuntoMeusCarregadosMusicas.find(
          (m) => m.musica?.id === midia.id
        ) || null
      : this.conjuntoMeusCarregadosVideos.find(
          (m) => m.video?.id === midia.id
        ) || null;
  }

  encontrarArtistasMeusCarregadosMusica(
    musica: Musica,
    conjuntoMeusCarregadosMusicas: MeuCarregado[],
    conjuntoArtistasMeusCarregadosMusicas: Artista[][]
  ): Artista[] {
    const index = conjuntoMeusCarregadosMusicas.findIndex(
      (m) => m.musica.id === musica.id
    );
    if (index !== -1) {
      return conjuntoArtistasMeusCarregadosMusicas[index];
    }
    return [];
  }

  pegarAlbunsArtista(
    artista: Artista,
    conjuntoAlbuns: Album[],
    conjuntoArtistasAlbuns: Artista[][]
  ): Album[] {
    return conjuntoAlbuns.filter((album) =>
      conjuntoArtistasAlbuns[this.conjuntoAlbuns.indexOf(album)].some(
        (a) => a.id === artista.id
      )
    );
  }

  pegarMusicasArtista(
    artista: Artista,
    conjuntoMusicas: Musica[],
    conjuntoArtistasMusicas: Artista[][]
  ): Musica[] {
    return conjuntoMusicas.filter((musica, index) =>
      conjuntoArtistasMusicas[index].some((a) => a.id === artista.id)
    );
  }

  pegarCriadorMusica(
    musica: Musica,
    conjuntoMusicas: Musica[],
    conjuntoCriadoresPostagemMusicas: Utilizador[]
  ): Utilizador {
    const index = conjuntoMusicas.findIndex((a) => a.id === musica.id);
    if (index !== -1) {
      return conjuntoCriadoresPostagemMusicas[index];
    }
    return null!;
  }

  pegarCriadorVideo(
    video: Video,
    conjuntoVideos: Video[],
    conjuntoCriadoresPostagemVideos: Utilizador[]
  ): Utilizador {
    const index = conjuntoVideos.findIndex((a) => a.id === video.id);
    if (index !== -1) {
      return conjuntoCriadoresPostagemVideos[index];
    }
    return null!;
  }

  //Funções relacionadas a reprodução de música
  ///_______________________________________________________________

  abrirFecharReprodutorMusica() {
    this.isReprodutorFechado = !this.isReprodutorFechado;

    if (this.isReprodutorFechado) {
      this.sharedDataService.tocando = false;
      this.audioPlayer.nativeElement.pause();
    }
  }

  abrirFecharReprodutorMaximizado() {
    this.isReprodutorMaximizadoFechado = !this.isReprodutorMaximizadoFechado;

    this.letraService
      .carregarLetra(this.sharedDataService.musicaActual.letra)
      .subscribe((letra) => {
        this.letraMusica = letra;
      });

    if (!this.isReprodutorMaximizadoFechado) {
      this.adicionarClasseNoScroll(this.paginaInicial);
    } else {
      this.removerClasseNoScroll(this.paginaInicial);
    }
  }

  fecharVisualizacaoReprodutorMaximizado() {
    this.removerClasseNoScroll(this.paginaInicial);
    this.isReprodutorMaximizadoFechado = true;
  }

  fecharVisualizacaoConteudoGrupo() {
    this.removerClasseNoScroll(this.paginaInicial);
    this.isPaginaConteudoGrupoFechado = true;
  }

  fecharVisualizacaoPlaylist() {
    this.removerClasseNoScroll(this.paginaInicial);
    this.isPaginaPlaylistFechada = true;
  }

  fecharVisualizacaoConteudoMidiasCompartilhadas() {
    this.removerClasseNoScroll(this.paginaInicial);
    this.isPaginaConteudoMidiasCompartilhadasFechado = true;
  }

  rodarMusica(musica: Musica, artistasMusica: Artista[]) {
    this.isReprodutorFechado = false;
    this.isReprodutorMaximizadoFechado = true;
    this.sharedDataService.musicaActual = musica;
    this.sharedDataService.artistasMusicaActual = artistasMusica;

    setTimeout(() => {
      const audio = this.audioPlayer.nativeElement;
      const url = this.getRecursoUrl(musica.caminhoFicheiro); // o caminho para o .m3u8

      // Reset visual
      this.sharedDataService.duracao = '0:00';
      this.sharedDataService.tempoAtual = '0:00';
      this.sharedDataService.progressoPercentual = 0;

      // Destroi HLS anterior se existir
      if (this.hlsAudio) {
        this.hlsAudio.destroy();
      }

      // Safari tem suporte nativo
      if (audio.canPlayType('application/vnd.apple.mpegurl')) {
        audio.src = url;
        audio.addEventListener(
          'loadedmetadata',
          () => {
            audio.play();
            this.sharedDataService.tocando = true;
          },
          { once: true }
        );
      } else if (Hls.isSupported()) {
        this.hlsAudio = new Hls();
        this.hlsAudio.loadSource(url);
        this.hlsAudio.attachMedia(audio);
        this.hlsAudio.on(Hls.Events.MANIFEST_PARSED, () => {
          audio.play();
          this.sharedDataService.tocando = true;
        });
      } else {
        console.error('HLS não suportado no navegador');
      }
    }, 0);
  }

  alternarPlayPause(tipo: 'audio' | 'video') {
    const player =
      tipo == 'audio'
        ? this.audioPlayer.nativeElement
        : this.videoPlayer.nativeElement;

    if (player.paused) {
      player.play();

      if (tipo == 'audio') {
        this.sharedDataService.tocando = true;
        this.sharedDataService.videoTocando = false;
      } else {
        this.sharedDataService.tocando = false;
        this.sharedDataService.videoTocando = true;
      }
    } else {
      player.pause();

      if (tipo == 'audio') {
        this.sharedDataService.tocando = false;
      } else {
        this.sharedDataService.videoTocando = false;
      }
    }
  }

  atualizarProgresso(tipo: 'audio' | 'video') {
    const player =
      tipo == 'audio'
        ? this.audioPlayer.nativeElement
        : this.videoPlayer.nativeElement;
    const tempo = player.currentTime;
    const dur = player.duration;
    this.sharedDataService.tempoAtual = this.formatarTempo(tempo);
    this.sharedDataService.progressoPercentual = (tempo / dur) * 100;

    if (player.buffered.length > 0) {
      const bufferedEnd = player.buffered.end(player.buffered.length - 1);
      this.sharedDataService.progressoBuffer = (bufferedEnd / dur) * 100;
    }
  }

  definirDuracao(tipo: 'audio' | 'video') {
    const player =
      tipo == 'audio'
        ? this.audioPlayer.nativeElement
        : this.videoPlayer.nativeElement;
    const dur = player.duration;
    this.sharedDataService.duracao = this.formatarTempo(dur);
  }

  formatarTempo(segundos: number): string {
    const min = Math.floor(segundos / 60);
    const seg = Math.floor(segundos % 60);
    return `${min}:${seg < 10 ? '0' + seg : seg}`;
  }

  irParaTempo(event: MouseEvent, tipo: 'audio' | 'video') {
    const player =
      tipo == 'audio'
        ? this.audioPlayer.nativeElement
        : this.videoPlayer.nativeElement;
    const barra = event.currentTarget as HTMLElement;
    const largura = barra.clientWidth;
    const clickX = event.offsetX;
    const duracao = player.duration;

    const novoTempo = (clickX / largura) * duracao;
    player.currentTime = novoTempo;

    this.atualizarProgresso(tipo); // atualiza visualmente
  }

  reiniciarMusica() {
    const audio = this.audioPlayer.nativeElement;
    audio.currentTime = 0;
    audio.play();
    this.sharedDataService.tocando = true;
  }

  //função que abre página de visualização de um álbum
  abrirVisualizacaoAlbum(album: Album) {
    this.adicionarClasseNoScroll(this.paginaInicial);
    this.isPaginaAlbumFechado = false;
    this.sharedDataService.albumActual = album;
    this.sharedDataService.musicasAlbumActual = this.conjuntoMusicas.filter(
      (musica) => musica.album && musica.album.id === album.id
    );
  }

  abrirVisualizacaoGrupo(grupo: Grupo) {
    this.adicionarClasseNoScroll(this.paginaInicial);
    this.isPaginaGrupoFechado = false;
    this.sharedDataService.grupoActual = grupo;
    this.sharedDataService.utilizadoresGrupoActual =
      this.pegarMembrosGrupoDeUmGrupo(
        grupo,
        this.conjuntoGruposSistema,
        this.conjuntoUsuariosGrupos
      );
  }

  abrirVisualizacaoConteudoGrupo(grupo: Grupo) {
    this.adicionarClasseNoScroll(this.paginaInicial);
    this.isPaginaConteudoGrupoFechado = false;

    this.sharedDataService.musicasGrupoActual = this.pegarMusicasGrupo(
      grupo,
      this.conjuntoGruposUsuario,
      this.conjuntoMusicasGrupos
    )!;

    this.sharedDataService.videosGrupoActual = this.pegarVideosGrupo(
      grupo,
      this.conjuntoGruposUsuario,
      this.conjuntoVideosGrupos
    )!;
  }

  abrirVisualizacaoPlaylist(playlist: Playlist) {
    this.adicionarClasseNoScroll(this.paginaInicial);
    this.isPaginaPlaylistFechada = false;
    this.sharedDataService.playlistActual = playlist;
    this.sharedDataService.musicasPlaylistActual = this.pegarMusicasPlaylist(
      playlist,
      this.conjuntoPlaylistsSistema,
      this.conjuntoMusicasPlaylists
    )!;
  }

  abrirVisualizacaoMidiasCompartilhadasPor(usuario: Utilizador) {
    this.adicionarClasseNoScroll(this.paginaInicial);
    this.isPaginaConteudoMidiasCompartilhadasFechado = false;
    this.sharedDataService.utilizadorActual = usuario;

    this.sharedDataService.musicasCompartilhadas =
      this.pegarMusicasVideosCompartilhadasDeUmUsuario(
        usuario,
        this.conjuntoUsuariosCompartilhouMidias,
        'musica'
      );

    this.sharedDataService.videosCompartilhados =
      this.pegarMusicasVideosCompartilhadasDeUmUsuario(
        usuario,
        this.conjuntoUsuariosCompartilhouMidias,
        'video'
      );
  }

  fecharVisualizacaoAlbum() {
    this.removerClasseNoScroll(this.paginaInicial);
    this.isPaginaAlbumFechado = true;
  }

  fecharVisualizacaoGrupo() {
    this.removerClasseNoScroll(this.paginaInicial);
    this.isPaginaGrupoFechado = true;
  }

  fecharVisualizacaoArtista() {
    this.removerClasseNoScroll(this.paginaInicial);
    this.isPaginaArtistaFechado = true;
  }

  adicionarClasseNoScroll(elemento: ElementRef<HTMLElement>) {
    elemento.nativeElement.classList.add('no-scroll');
    this.qtdNoScrollAdicionar++;
  }

  removerClasseNoScroll(elemento: ElementRef<HTMLElement>) {
    elemento.nativeElement.classList.remove('no-scroll');
    this.qtdNoScrollAdicionar--;
    for (let i = 0; i < this.qtdNoScrollAdicionar; i++) {
      elemento.nativeElement.classList.add('no-scroll');
    }
  }

  abrirVisualizacaoArtista(artista: Artista) {
    this.adicionarClasseNoScroll(this.paginaInicial);
    this.isPaginaArtistaFechado = false;
    this.sharedDataService.artistaActual = artista;
  }

  rodarVideo(video: Video) {
    this.adicionarClasseNoScroll(this.paginaInicial);
    this.isPaginaVideoFechado = false;
    this.sharedDataService.videoActual = video;

    setTimeout(() => {
      const videoPlayer = this.videoPlayer.nativeElement;
      const url = this.getRecursoUrl(video.caminhoFicheiro); // o caminho para o .m3u8

      // Reset visual
      this.sharedDataService.duracaoVideo = '0:00';
      this.sharedDataService.tempoAtualVideo = '0:00';
      this.sharedDataService.progressoPercentualVideo = 0;

      // Destroi HLS anterior se existir
      if (this.hlsVideo) {
        this.hlsVideo.destroy();
      }

      // Safari tem suporte nativo
      if (videoPlayer.canPlayType('application/vnd.apple.mpegurl')) {
        videoPlayer.src = url;
        videoPlayer.addEventListener(
          'loadedmetadata',
          () => {
            videoPlayer.play();
            this.sharedDataService.videoTocando = true;
          },
          { once: true }
        );
      } else if (Hls.isSupported()) {
        this.hlsVideo = new Hls();
        this.hlsVideo.loadSource(url);
        this.hlsVideo.attachMedia(videoPlayer);
        this.hlsVideo.on(Hls.Events.MANIFEST_PARSED, () => {
          videoPlayer.play();
          this.sharedDataService.videoTocando = true;
        });
      } else {
        console.error('HLS não suportado no navegador');
      }
    }, 0);
  }

  fecharVisualizacaoVideo() {
    this.removerClasseNoScroll(this.paginaInicial);
    this.isPaginaVideoFechado = true;
  }

  onVideoPlay() {
    this.sharedDataService.videoTocando = true;
  }

  onVideoPause() {
    this.sharedDataService.videoTocando = false;
  }

  fecharVisualizacoes() {
    this.fecharVisualizacaoAlbum();
    this.fecharVisualizacaoArtista();
    this.fecharVisualizacaoVideo();
    this.fecharVisualizacaoReprodutorMaximizado();
    this.fecharVisualizacaoGrupo();
    this.fecharVisualizacaoConteudoGrupo();
    this.fecharVisualizacaoPlaylist();
    this.fecharVisualizacaoConteudoMidiasCompartilhadas();
    this.qtdNoScrollAdicionar = 0;
  }

  irTelaArtistas() {
    this.pesquisaInput = '';
    this.fecharVisualizacoes();
    this.barraPesquisa.nativeElement.classList.remove('non-active');
    this.zerarVariaveis();
    this.abaSeleccionada = 'artistas';
    this.carregarItens();
  }

  irPaginaInicial() {
    this.zerarVariaveis();
    this.abaSeleccionada = 'pagina-inicial';
    this.barraPesquisa.nativeElement.classList.add('non-active');
    this.carregarItens();
    this.fecharVisualizacoes();
    this.pesquisaInput = '';
  }

  irTelaAlbuns() {
    this.pesquisaInput = '';
    this.fecharVisualizacoes();
    this.barraPesquisa.nativeElement.classList.remove('non-active');
    this.zerarVariaveis();
    this.abaSeleccionada = 'albuns';
    this.carregarItens();
  }

  irTelaMusicas() {
    this.pesquisaInput = '';
    this.fecharVisualizacoes();
    this.barraPesquisa.nativeElement.classList.remove('non-active');
    this.zerarVariaveis();
    this.abaSeleccionada = 'musicas';
    this.carregarItens();
  }

  irTelaVideos() {
    this.pesquisaInput = '';
    this.fecharVisualizacoes();
    this.barraPesquisa.nativeElement.classList.remove('non-active');
    this.zerarVariaveis();
    this.abaSeleccionada = 'videos';
    this.carregarItens();
  }

  irTelaMidiasCarregados() {
    this.pesquisaInput = '';
    this.fecharVisualizacoes();
    this.barraPesquisa.nativeElement.classList.remove('non-active');
    this.zerarVariaveis();
    this.abaSeleccionada = 'midiasCarregados';
    this.carregarItens();
  }

  irTelaGrupos() {
    this.pesquisaInput = '';
    this.fecharVisualizacoes();
    this.barraPesquisa.nativeElement.classList.remove('non-active');
    this.zerarVariaveis();
    this.abaSeleccionada = 'grupos';
    this.carregarItens();
  }

  irTelaPlaylists() {
    this.pesquisaInput = '';
    this.fecharVisualizacoes();
    this.barraPesquisa.nativeElement.classList.remove('non-active');
    this.zerarVariaveis();
    this.abaSeleccionada = 'playlists';
    this.carregarItens();
  }

  irTelaMidiasExternas() {
    this.pesquisaInput = '';
    this.fecharVisualizacoes();
    this.barraPesquisa.nativeElement.classList.remove('non-active');
    this.zerarVariaveis();
    this.abaSeleccionada = 'midiasExternas';
    this.carregarItens();
  }

  irTelaEstacoesRadio() {
    this.pesquisaInput = '';
    this.fecharVisualizacoes();
    this.barraPesquisa.nativeElement.classList.remove('non-active');
    this.zerarVariaveis();
    this.abaSeleccionada = 'estacoesRadio';
    this.carregarItens();
  }

  efectuarPesquisa() {
    let termo = '';
    let termoNome = 0;

    if (this.abaSeleccionada == 'albuns') {
      termo = 'album';
      termoNome = 2;
    } else if (this.abaSeleccionada == 'artistas') {
      termo = 'artista';
      termoNome = 1;
    } else if (this.abaSeleccionada == 'musicas') {
      termo = 'musica';
      termoNome = 2;
    } else if (this.abaSeleccionada == 'videos') {
      termo = 'video';
      termoNome = 2;
    } else if (this.abaSeleccionada == 'midiasCarregados') {
      termo = 'mídia';
      termoNome = 3;
    }

    if (this.pesquisaInput == '') {
      this.toast.warning(
        'Por favor digite um(a) ' + termo + ' para pesquisar',
        'Atenção!',
        { closeButton: true }
      );
      return;
    }

    const pesquisa = this.pesquisaInput.toLowerCase().trim();

    if (termoNome != 3) {
      this.conjuntoPesquisa = this.conjuntoOriginal.filter((elemento) =>
        termoNome == 1
          ? elemento.nome?.toLowerCase().trim().includes(pesquisa)
          : elemento.titulo?.toLowerCase().trim().includes(pesquisa)
      );
    } else {
      this.conjuntoPesquisa = this.conjuntoOriginal.filter((elemento) =>
        elemento.musica != null
          ? elemento.musica.titulo?.toLowerCase().trim().includes(pesquisa)
          : elemento.video.titulo?.toLowerCase().trim().includes(pesquisa)
      );
    }

    if (this.abaSeleccionada == 'albuns') {
      this.conjuntoAlbuns = [...this.conjuntoPesquisa];
    } else if (this.abaSeleccionada == 'artistas') {
      this.conjuntoArtistas = [...this.conjuntoPesquisa];
    } else if (this.abaSeleccionada == 'musicas') {
      this.conjuntoMusicas = [...this.conjuntoPesquisa];
    } else if (this.abaSeleccionada == 'videos') {
      this.conjuntoVideos = [...this.conjuntoPesquisa];
    } else if (this.abaSeleccionada == 'midiasCarregados') {
      this.conjuntoMeusCarregadosMusicas = [
        ...this.conjuntoPesquisa.filter((m) => m.musica != null),
      ];
      this.conjuntoMeusCarregadosVideos = [
        ...this.conjuntoPesquisa.filter((m) => m.video != null),
      ];
    }
  }

  tocarEstacao(estacao: RadioEstacao) {
    this.sharedDataService.estacaoRadioActual = estacao;
    this.audio.src = estacao.urlStream; // deve ser um link de stream de rádio válido
    this.audio.play();
    this.sharedDataService.radioTocando = true;
  }

  pausarOuTocarEstacao() {
    if (this.sharedDataService.radioTocando) {
      this.audio.pause();
    } else {
      this.audio.play();
    }
    this.sharedDataService.radioTocando = !this.sharedDataService.radioTocando;
  }

  fecharEstacaoAtual() {
    this.audio.pause();
    this.audio.currentTime = 0;
    this.sharedDataService.estacaoRadioActual = null!;
    this.sharedDataService.radioTocando = false;
  }

  abrirModalAdicionarArtista() {
    this.isModalArtistaAberta = true;
    this.adicionarClasseNoScroll(this.paginaInicial);
  }

  fecharModalAdicionarArtista() {
    this.isModalArtistaAberta = false;
    this.removerClasseNoScroll(this.paginaInicial);
  }

  abrirModalAdicionarAlbum() {
    this.isModalAlbumAberto = true;
    this.adicionarClasseNoScroll(this.paginaInicial);
  }

  onCapaSelecionada(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.novaCapa = event.target.files[0];
    }
  }

  fecharModalAdicionarAlbum() {
    this.isModalAlbumAberto = false;
    this.removerClasseNoScroll(this.paginaInicial);
    this.novoTitulo = '';
    this.novaDescricao = '';
    this.novaDataLancamento = '';
    this.novaCapa = null;
    this.artistasSelecionados = [];
  }

  abrirModalAdicionarMusica() {
    this.adicionarClasseNoScroll(this.paginaInicial);
    this.isModalMusicaAberta = true;
  }

  fecharModalAdicionarMusica() {
    this.removerClasseNoScroll(this.paginaInicial);
    this.isModalMusicaAberta = false;
  }

  onMusicaSelecionada(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.novaMusicaFile = event.target.files[0];
    }
  }

  onLetraSelecionada(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.novaLetraFile = event.target.files[0];
    }
  }

  onCapaMusicaSelecionada(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.novaCapaMusica = event.target.files[0];
    }
  }
  adicionarArtistaMusica(event: Event) {
    const select = event.target as HTMLSelectElement;
    const artistaSelecionadoId = Number(select.value);

    if (!artistaSelecionadoId) {
      return;
    }

    const artistaSelecionado = this.conjuntoArtistas.find(
      (a) => a.id === artistaSelecionadoId
    );

    if (
      artistaSelecionado &&
      !this.novosArtistasSelecionadosMusica.some(
        (a) => a.id === artistaSelecionado.id
      )
    ) {
      this.novosArtistasSelecionadosMusica.push(artistaSelecionado);
    }

    // Limpa seleção para permitir selecionar novamente
    select.selectedIndex = 0;
  }

  removerArtistaMusica(artista: Artista) {
    this.novosArtistasSelecionadosMusica =
      this.novosArtistasSelecionadosMusica.filter((a) => a.id !== artista.id);
  }
}
