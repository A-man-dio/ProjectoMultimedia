package ao.isptec.multimedia.controller;

import ao.isptec.multimedia.model.Grupo;
import ao.isptec.multimedia.service.GrupoService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/grupos")
public class GrupoController {

    private final GrupoService service;

    public GrupoController(GrupoService service) {
        this.service = service;
    }

    @GetMapping
    public List<Grupo> listar() {
        return service.listarTodos();
    }

    @GetMapping("/{id}")
    public Grupo buscarPorId(@PathVariable Integer id) {
        return service.buscarPorId(id).orElse(null);
    }

    @PostMapping
    public Grupo criar(@RequestBody Grupo g) {
        return service.criar(g);
    }

    @DeleteMapping("/{id}")
    public void remover(@PathVariable Integer id) {
        service.deletar(id);
    }

    /*
{
  "nome": "Amigos do ISPTEC"
}
    */

}
