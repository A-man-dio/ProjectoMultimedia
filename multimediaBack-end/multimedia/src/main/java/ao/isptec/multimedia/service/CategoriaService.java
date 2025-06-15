package ao.isptec.multimedia.service;

import ao.isptec.multimedia.model.Categoria;
import ao.isptec.multimedia.repository.CategoriaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoriaService {

    private final CategoriaRepository repo;

    public CategoriaService(CategoriaRepository repo) {
        this.repo = repo;
    }

    public List<Categoria> listarTodas() {
        return repo.findAll();
    }

    public Optional<Categoria> buscarPorId(Integer id) {
        return repo.findById(id);
    }

    public Categoria criar(Categoria c) {
        return repo.save(c);
    }

    public void deletar(Integer id) {
        repo.deleteById(id);
    }
}
