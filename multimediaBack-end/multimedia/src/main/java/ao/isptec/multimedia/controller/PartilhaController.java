package ao.isptec.multimedia.controller;

import ao.isptec.multimedia.model.Partilha;
import ao.isptec.multimedia.service.PartilhaService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/partilhas")
public class PartilhaController {

    private final PartilhaService service;

    public PartilhaController(PartilhaService service) {
        this.service = service;
    }

    @GetMapping
    public List<Partilha> listar() {
        return service.listarTodas();
    }

    @GetMapping("/{id}")
    public Partilha buscarPorId(@PathVariable Integer id) {
        return service.buscarPorId(id).orElse(null);
    }

    @PostMapping
    public Partilha criar(@RequestBody Partilha partilha) {
        return service.criar(partilha);
    }

    @DeleteMapping("/{id}")
    public void remover(@PathVariable Integer id) {
        service.deletar(id);
    }
}
