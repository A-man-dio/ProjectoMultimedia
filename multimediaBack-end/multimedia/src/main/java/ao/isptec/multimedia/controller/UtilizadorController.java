package ao.isptec.multimedia.controller;

import ao.isptec.multimedia.model.Utilizador;
import ao.isptec.multimedia.service.UtilizadorService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/utilizadores")
public class UtilizadorController {

    private final UtilizadorService service;

    public UtilizadorController(UtilizadorService service) {
        this.service = service;
    }

    @GetMapping
    public List<Utilizador> listar() {
        return service.listarTodos();
    }

    @GetMapping("/{id}")
    public Utilizador buscarPorId(@PathVariable Integer id) {
        return service.buscarPorId(id).orElse(null);
    }

    @PostMapping
    public Utilizador criar(@RequestBody Utilizador u) {
        return service.criar(u);
    }

    @DeleteMapping("/{id}")
    public void remover(@PathVariable Integer id) {
        service.deletar(id);
    }

    /*
    postman teste
{
  "nomeDeUtilizador": "ernesto",
  "email": "ernesto@isptec.ao",
  "senha": "123456",
  "tipo": 2
}
*/

}
