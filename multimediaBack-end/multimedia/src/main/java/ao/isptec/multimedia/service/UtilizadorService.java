package ao.isptec.multimedia.service;

import ao.isptec.multimedia.model.Utilizador;
import ao.isptec.multimedia.repository.UtilizadorRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UtilizadorService {

    private final UtilizadorRepository repo;

    public UtilizadorService(UtilizadorRepository repo) {
        this.repo = repo;
    }

    public List<Utilizador> listarTodos() {
        return repo.findAll();
    }

    public Optional<Utilizador> buscarPorId(Integer id) {
        return repo.findById(id);
    }

    public Utilizador criar(Utilizador u) {
        return repo.save(u);
    }

    public void deletar(Integer id) {
        repo.deleteById(id);
    }
}
