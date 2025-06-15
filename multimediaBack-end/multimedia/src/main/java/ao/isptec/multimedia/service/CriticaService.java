package ao.isptec.multimedia.service;

import ao.isptec.multimedia.model.Critica;
import ao.isptec.multimedia.repository.CriticaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CriticaService {

    private final CriticaRepository repo;

    public CriticaService(CriticaRepository repo) {
        this.repo = repo;
    }

    public List<Critica> listarTodas() {
        return repo.findAll();
    }

    public Optional<Critica> buscarPorId(Integer id) {
        return repo.findById(id);
    }

    public Critica criar(Critica critica) {
        return repo.save(critica);
    }

    public void deletar(Integer id) {
        repo.deleteById(id);
    }
}
