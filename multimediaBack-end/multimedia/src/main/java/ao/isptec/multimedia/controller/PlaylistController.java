package ao.isptec.multimedia.controller;

import ao.isptec.multimedia.model.Playlist;
import ao.isptec.multimedia.service.PlaylistService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/playlists")
public class PlaylistController {

    private final PlaylistService service;

    public PlaylistController(PlaylistService service) {
        this.service = service;
    }

    @GetMapping
    public List<Playlist> listar() {
        return service.listarTodas();
    }

    @GetMapping("/{id}")
    public Playlist buscarPorId(@PathVariable Integer id) {
        return service.buscarPorId(id).orElse(null);
    }

    @PostMapping
    public Playlist criar(@RequestBody Playlist playlist) {
        return service.criar(playlist);
    }

    @DeleteMapping("/{id}")
    public void remover(@PathVariable Integer id) {
        service.deletar(id);
    }
}
