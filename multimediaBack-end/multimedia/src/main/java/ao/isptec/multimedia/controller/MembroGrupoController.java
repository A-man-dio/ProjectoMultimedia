package ao.isptec.multimedia.controller;

import ao.isptec.multimedia.model.MembroGrupo;
import ao.isptec.multimedia.model.MembroGrupoId;
import ao.isptec.multimedia.service.MembroGrupoService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/membros-grupo")
public class MembroGrupoController {

    private final MembroGrupoService service;

    public MembroGrupoController(MembroGrupoService service) {
        this.service = service;
    }

    @GetMapping
    public List<MembroGrupo> listar() {
        return service.listarTodos();
    }

    @PostMapping
    public MembroGrupo criar(@RequestBody MembroGrupo m) {
        return service.criar(m);
    }

    @DeleteMapping("/{idGrupo}/{idMembro}")
    public void remover(@PathVariable Integer idGrupo, @PathVariable Integer idMembro) {
        service.deletar(new MembroGrupoId(idGrupo, idMembro));
    }

    /*
{
  "idGrupo": 1,
  "idMembro": 2,
  "funcao": 3
}
*/
}
