package ao.isptec.multimedia.service;

import ao.isptec.multimedia.model.RadioEstacao;
import ao.isptec.multimedia.repository.RadioEstacaoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RadioEstacaoService {

    private final RadioEstacaoRepository repo;

    public RadioEstacaoService(RadioEstacaoRepository repo) {
        this.repo = repo;
    }

    public List<RadioEstacao> listarTodas() {
        return repo.findAll();
    }

    public Optional<RadioEstacao> buscarPorId(Integer id) {
        return repo.findById(id);
    }

    public RadioEstacao criar(RadioEstacao r) {
        return repo.save(r);
    }

    public void deletar(Integer id) {
        repo.deleteById(id);
    }
}
