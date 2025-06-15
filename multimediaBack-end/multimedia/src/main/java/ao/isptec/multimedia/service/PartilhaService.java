package ao.isptec.multimedia.service;

import ao.isptec.multimedia.model.Partilha;
import ao.isptec.multimedia.repository.PartilhaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PartilhaService {

    private final PartilhaRepository repo;

    public PartilhaService(PartilhaRepository repo) {
        this.repo = repo;
    }

    public List<Partilha> listarTodas() {
        return repo.findAll();
    }

    public Optional<Partilha> buscarPorId(Integer id) {
        return repo.findById(id);
    }

    public Partilha criar(Partilha partilha) {
        return repo.save(partilha);
    }

    public void deletar(Integer id) {
        repo.deleteById(id);
    }
}
