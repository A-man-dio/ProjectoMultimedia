package ao.isptec.multimedia.service;

import ao.isptec.multimedia.model.Artista;
import ao.isptec.multimedia.repository.ArtistaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ArtistaService {

    private final ArtistaRepository repo;

    public ArtistaService(ArtistaRepository repo) {
        this.repo = repo;
    }

    public List<Artista> listarTodos() {
        return repo.findAll();
    }

    public Optional<Artista> buscarPorId(Integer id) {
        return repo.findById(id);
    }

    public Artista criar(Artista artista) {
        return repo.save(artista);
    }

    public void deletar(Integer id) {
        repo.deleteById(id);
    }
}
