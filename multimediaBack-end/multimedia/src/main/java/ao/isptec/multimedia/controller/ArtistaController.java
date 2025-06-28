package ao.isptec.multimedia.controller;

import ao.isptec.multimedia.model.Artista;
import ao.isptec.multimedia.service.ArtistaService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/Artista")
public class ArtistaController {

    @Autowired
    private ArtistaService artistaService;

    @PostMapping("/save")
    public Artista saveArtista(@RequestBody Artista artista) {
        return artistaService.save(artista);
    }

    @DeleteMapping("/delete")
    public void deleteArtista(@RequestBody Artista artista) {
        artistaService.delete(artista);
    }

    @GetMapping("/getAll")
    public List<Artista> getAllArtistas() {
        return artistaService.getAllArtistas();
    }

    @GetMapping("/getArtistasByNomeContendo")
    public List<Artista> getArtistasByNomeContendo(@RequestParam String nome) {
        return artistaService.findByNomeContainingIgnoreCase(nome);
    }

    @GetMapping("/getArtistaById")
    public Artista getArtistaById(@RequestParam Integer id) {
        return artistaService.findById(id);
    }

    @PostMapping("/upload")
    public ResponseEntity<String> uploadImagem(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("Arquivo vazio.");
        }

        try {
            // Caminho onde salvar a imagem
            String pastaDestino = "C:\\Users\\DELL LATITUDE\\Desktop\\Cut\\";
            String nomeArquivo = file.getOriginalFilename();

            // Cria o arquivo físico no destino
            File destino = new File(pastaDestino + nomeArquivo);
            file.transferTo(destino);

            // Retorna o caminho relativo pro Front usar
            String caminhoFoto = "/files/imagens/" + nomeArquivo;

            return ResponseEntity.ok(caminhoFoto);

        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao salvar imagem.");
        }
    }


}
