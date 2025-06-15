package ao.isptec.multimedia.controller;

import ao.isptec.multimedia.model.Album;
import ao.isptec.multimedia.service.AlbumService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/albuns")
public class AlbumController {

    private final AlbumService service;

    public AlbumController(AlbumService service) {
        this.service = service;
    }

    @GetMapping
    public List<Album> listar() {
        return service.listarTodos();
    }

    @GetMapping("/{id}")
    public Album buscarPorId(@PathVariable Integer id) {
        return service.buscarPorId(id).orElse(null);
    }

    @PostMapping
    public Album criar(@RequestBody Album album) {
        return service.criar(album);
    }

    @DeleteMapping("/{id}")
    public void remover(@PathVariable Integer id) {
        service.deletar(id);
    }

    /*
{
  "titulo": "Meu Primeiro Álbum",
  "descricao": "Álbum de estreia do artista",
  "idArtista": 1,
  "dataLancamento": "2023-01-15"
}
    */
}
