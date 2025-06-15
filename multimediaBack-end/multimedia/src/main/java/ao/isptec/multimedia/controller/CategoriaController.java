package ao.isptec.multimedia.controller;

import ao.isptec.multimedia.model.Categoria;
import ao.isptec.multimedia.service.CategoriaService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categorias")
public class CategoriaController {

    private final CategoriaService service;

    public CategoriaController(CategoriaService service) {
        this.service = service;
    }

    @GetMapping
    public List<Categoria> listar() {
        return service.listarTodas();
    }

    @GetMapping("/{id}")
    public Categoria buscarPorId(@PathVariable Integer id) {
        return service.buscarPorId(id).orElse(null);
    }

    @PostMapping
    public Categoria criar(@RequestBody Categoria c) {
        return service.criar(c);
    }

    @DeleteMapping("/{id}")
    public void remover(@PathVariable Integer id) {
        service.deletar(id);
    }
    /*
{
  "nome": "Hip Hop",
  "descricao": "Estilo musical urbano"
}
    */
}
