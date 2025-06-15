package ao.isptec.multimedia.controller;

import ao.isptec.multimedia.model.PlaylistMusica;
import ao.isptec.multimedia.model.PlaylistMusicaId;
import ao.isptec.multimedia.service.PlaylistMusicaService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/playlist-musicas")
public class PlaylistMusicaController {

    private final PlaylistMusicaService service;

    public PlaylistMusicaController(PlaylistMusicaService service) {
        this.service = service;
    }

    @GetMapping
    public List<PlaylistMusica> listar() {
        return service.listarTodas();
    }

    @PostMapping
    public PlaylistMusica criar(@RequestBody PlaylistMusica musica) {
        return service.criar(musica);
    }

    @DeleteMapping("/{idPlaylist}/{idMusica}")
    public void remover(@PathVariable Integer idPlaylist, @PathVariable Integer idMusica) {
        service.deletar(new PlaylistMusicaId(idPlaylist, idMusica));
    }
}
