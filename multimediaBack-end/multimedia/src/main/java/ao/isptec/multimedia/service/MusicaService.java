package ao.isptec.multimedia.service;

import ao.isptec.multimedia.model.Musica;
import ao.isptec.multimedia.repository.MusicaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MusicaService {

    private final MusicaRepository repo;

    public MusicaService(MusicaRepository repo) {
        this.repo = repo;
    }

    public List<Musica> listarTodas() {
        return repo.findAll();
    }

    public Optional<Musica> buscarPorId(Integer id) {
        return repo.findById(id);
    }

    public Musica criar(Musica musica) {
        return repo.save(musica);
    }

    public void deletar(Integer id) {
        repo.deleteById(id);
    }
}
