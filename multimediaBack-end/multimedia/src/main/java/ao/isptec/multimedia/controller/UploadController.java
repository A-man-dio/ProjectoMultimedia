package ao.isptec.multimedia.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@RestController
@RequestMapping("/Upload") // base URL: http://localhost:8080/upload
public class UploadController {

    @PostMapping("/imagem")
    public ResponseEntity<String> uploadImagem(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("Arquivo vazio.");
        }

        try {

            String pastaDestino = "C:\\Users\\DELL LATITUDE\\Desktop\\Ernesto\\EINF8\\Multimedia\\PROJECTO EXAME\\Recursos\\imagens\\";

            // Nome do arquivo
            String nomeArquivo = file.getOriginalFilename();

            // Caminho físico completo
            File destino = new File(pastaDestino + nomeArquivo);

            // Salva o arquivo físico
            file.transferTo(destino);

            // Retorna o caminho VIRTUAL
            String caminhoFoto = "/files/imagens/" + nomeArquivo;

            return ResponseEntity.ok(caminhoFoto);

        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao salvar imagem.");
        }
    }


    @PostMapping("/letra")
    public ResponseEntity<String> uploadLetra(@RequestParam(value = "file", required = false) MultipartFile file) {
        if (file == null || file.isEmpty()) {
            return ResponseEntity.ok(null); // ou "" se preferir string vazia
        }

        try {
            String pastaDestino = "C:\\Users\\DELL LATITUDE\\Desktop\\Ernesto\\EINF8\\Multimedia\\PROJECTO EXAME\\Recursos\\letras\\";
            String nomeArquivo = file.getOriginalFilename();
            File destino = new File(pastaDestino + nomeArquivo);
            file.transferTo(destino);

            String caminhoLetra = "/files/letras/" + nomeArquivo;

            return ResponseEntity.ok(caminhoLetra);

        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }


}
