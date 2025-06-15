package ao.isptec.multimedia.controller;

import ao.isptec.multimedia.model.Critica;
import ao.isptec.multimedia.service.CriticaService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/criticas")
public class CriticaController {

    private final CriticaService service;

    public CriticaController(CriticaService service) {
        this.service = service;
    }

    @GetMapping
    public List<Critica> listar() {
        return service.listarTodas();
    }

    @GetMapping("/{id}")
    public Critica buscarPorId(@PathVariable Integer id) {
        return service.buscarPorId(id).orElse(null);
    }

    @PostMapping
    public Critica criar(@RequestBody Critica critica) {
        return service.criar(critica);
    }

    @DeleteMapping("/{id}")
    public void remover(@PathVariable Integer id) {
        service.deletar(id);
    }
    /*
{
  "idUtilizador": 1,
  "idAlbum": 2,
  "pontuacao": 4,
  "comentario": "Excelente álbum!",
  "dataCritica": "2025-06-15T10:30:00"
}
*/
}
