package ao.isptec.multimedia.controller;

import ao.isptec.multimedia.model.Artista;
import ao.isptec.multimedia.service.ArtistaService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/artistas")
public class ArtistaController {

    private final ArtistaService service;

    public ArtistaController(ArtistaService service) {
        this.service = service;
    }

    @GetMapping
    public List<Artista> listar() {
        return service.listarTodos();
    }

    @GetMapping("/{id}")
    public Artista buscarPorId(@PathVariable Integer id) {
        return service.buscarPorId(id).orElse(null);
    }

    @PostMapping
    public Artista criar(@RequestBody Artista artista) {
        return service.criar(artista);
    }

    @DeleteMapping("/{id}")
    public void remover(@PathVariable Integer id) {
        service.deletar(id);
    }

    /*
{
  "nome": "Grupo arroz",
  "biografia": "Grupo fundado em 2005",
  "dataInicio": "2005-01-01",
  "dataFim": null
}
    */
}
