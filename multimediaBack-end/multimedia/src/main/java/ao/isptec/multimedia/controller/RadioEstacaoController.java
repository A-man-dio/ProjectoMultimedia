package ao.isptec.multimedia.controller;

import ao.isptec.multimedia.model.RadioEstacao;
import ao.isptec.multimedia.service.RadioEstacaoService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/radio")
public class RadioEstacaoController {

    private final RadioEstacaoService service;

    public RadioEstacaoController(RadioEstacaoService service) {
        this.service = service;
    }

    @GetMapping
    public List<RadioEstacao> listar() {
        return service.listarTodas();
    }

    @GetMapping("/{id}")
    public RadioEstacao buscarPorId(@PathVariable Integer id) {
        return service.buscarPorId(id).orElse(null);
    }

    @PostMapping
    public RadioEstacao criar(@RequestBody RadioEstacao r) {
        return service.criar(r);
    }

    @DeleteMapping("/{id}")
    public void remover(@PathVariable Integer id) {
        service.deletar(id);
    }
    /*
{
  "nome": "Rádio Angola",
  "urlStream": "http://stream.radioangola.ao/live",
  "pais": "Angola",
  "genero": "Notícias"
}
*/

}
