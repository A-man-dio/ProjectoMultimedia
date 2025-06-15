package ao.isptec.multimedia.controller;

import ao.isptec.multimedia.model.Video;
import ao.isptec.multimedia.service.VideoService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/videos")
public class VideoController {

    private final VideoService service;

    public VideoController(VideoService service) {
        this.service = service;
    }

    @GetMapping
    public List<Video> listar() {
        return service.listarTodos();
    }

    @GetMapping("/{id}")
    public Video buscarPorId(@PathVariable Integer id) {
        return service.buscarPorId(id).orElse(null);
    }

    @PostMapping
    public Video criar(@RequestBody Video video) {
        return service.criar(video);
    }

    @DeleteMapping("/{id}")
    public void remover(@PathVariable Integer id) {
        service.deletar(id);
    }

    /*
    * {
  "titulo": "Apresentação",
  "descricao": "Vídeo institucional",
  "duracao": "00:05:00",
  "formato": "MP4",
  "tamanho": 12000,
  "caminhoFicheiro": "/videos/institucional.mp4",

  "categoria": { "id": 2 },
  "uploader": { "id": 1 }
  "dataLancamento": "2024-10-01"
}
*/

}
