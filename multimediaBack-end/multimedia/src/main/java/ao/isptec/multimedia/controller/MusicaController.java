package ao.isptec.multimedia.controller;

import ao.isptec.multimedia.model.Album;
import ao.isptec.multimedia.model.Categoria;
import ao.isptec.multimedia.model.Musica;
import ao.isptec.multimedia.model.Utilizador;
import ao.isptec.multimedia.service.MusicaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@RestController
@RequestMapping("/api/musicas")
public class MusicaController {

    private final MusicaService service;

    public MusicaController(MusicaService service) {
        this.service = service;
    }

    @GetMapping
    public List<Musica> listar() {
        return service.listarTodas();
    }

    @GetMapping("/{id}")
    public Musica buscarPorId(@PathVariable Integer id) {
        return service.buscarPorId(id).orElse(null);
    }

    @PostMapping
    public Musica criar(@RequestBody Musica musica) {
        return service.criar(musica);
    }

    @DeleteMapping("/{id}")
    public void remover(@PathVariable Integer id) {
        service.deletar(id);
    }

    @PostMapping("/upload")
    public ResponseEntity<Musica> uploadComCadastro(
            @RequestParam("file") MultipartFile file,
            @RequestParam("titulo") String titulo,
            @RequestParam("duracao") String duracao, // formato HH:mm:ss
            @RequestParam("formato") String formato,
            @RequestParam("tamanho") Integer tamanho,
            @RequestParam("compositor") String compositor,
            @RequestParam("letra") String letra,
            @RequestParam("dataLancamento") String dataLancamento, // yyyy-MM-dd
            @RequestParam("idAlbum") Integer idAlbum,
            @RequestParam("idCategoria") Integer idCategoria,
            @RequestParam("idUploader") Integer idUploader
    ) throws IOException {

        // 1. Guardar ficheiro na pasta
        String pastaDestino = "uploads/musicas/";
        Files.createDirectories(Paths.get(pastaDestino));
        String nomeFicheiro = file.getOriginalFilename();
        Path caminho = Paths.get(pastaDestino + nomeFicheiro);
        file.transferTo(caminho);

        // 2. Criar objeto Musica
        Musica musica = new Musica();
        musica.setTitulo(titulo);
        musica.setDuracao(LocalTime.parse(duracao));
        musica.setFormato(formato);
        musica.setTamanho(tamanho);
        musica.setCompositor(compositor);
        musica.setLetra(letra);
        musica.setDataLancamento(LocalDate.parse(dataLancamento));
        musica.setCaminhoFicheiro(pastaDestino + nomeFicheiro);

        // 3. Relacionamentos
        Album album = new Album();
        album.setId(idAlbum);
        Categoria categoria = new Categoria();
        categoria.setId(idCategoria);
        Utilizador uploader = new Utilizador();
        uploader.setId(idUploader);

        musica.setAlbum(album);
        musica.setCategoria(categoria);
        musica.setUploader(uploader);

        // 4. Salvar no banco
        Musica salva = service.criar(musica);
        return ResponseEntity.ok(salva);
    }


    /*
{
  "titulo": "Minha Música",
  "duracao": "00:03:45",
  "formato": "MP3",
  "tamanho": 4500,

  "compositor": "Ernesto A.",
  "letra": "Letra da música...",
  "dataLancamento": "2023-03-01",
  "caminhoFicheiro": "/media/usuario1/minha-musica.mp3",
  "album": { "id": 1 },
  "categoria": { "id": 2 },
  "uploader": { "id": 1 }
}
*/

}
