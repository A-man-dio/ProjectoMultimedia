package ao.isptec.multimedia.controller;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.net.MalformedURLException;
import java.nio.file.*;

@RestController
@RequestMapping("/api/ficheiros")
public class FicheiroController {

    private final String pastaMusicas = "uploads/musicas/";
    private final String pastaVideos = "uploads/videos/";

    @PostMapping("/upload")
    public ResponseEntity<String> upload(
            @RequestParam("file") MultipartFile file,
            @RequestParam("tipo") String tipo // musica ou video
    ) throws IOException {
        String destino = tipo.equals("video") ? pastaVideos : pastaMusicas;

        Files.createDirectories(Paths.get(destino)); // garante que a pasta existe
        Path caminho = Paths.get(destino + file.getOriginalFilename());
        file.transferTo(caminho);

        return ResponseEntity.ok("Ficheiro guardado com sucesso: " + caminho.toString());
    }

    @GetMapping("/download/{tipo}/{nome}")
    public ResponseEntity<Resource> download(
            @PathVariable String tipo,
            @PathVariable String nome
    ) throws MalformedURLException {
        String pasta = tipo.equals("video") ? pastaVideos : pastaMusicas;
        Path caminho = Paths.get(pasta).resolve(nome);
        Resource resource = new UrlResource(caminho.toUri());

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + nome + "\"")
                .body(resource);
    }
}
