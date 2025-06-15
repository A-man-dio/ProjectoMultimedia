package ao.isptec.multimedia.service;

import ao.isptec.multimedia.model.Grupo;
import ao.isptec.multimedia.repository.GrupoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GrupoService {

    private final GrupoRepository repo;

    public GrupoService(GrupoRepository repo) {
        this.repo = repo;
    }

    public List<Grupo> listarTodos() {
        return repo.findAll();
    }

    public Optional<Grupo> buscarPorId(Integer id) {
        return repo.findById(id);
    }

    public Grupo criar(Grupo g) {
        return repo.save(g);
    }

    public void deletar(Integer id) {
        repo.deleteById(id);
    }
}
