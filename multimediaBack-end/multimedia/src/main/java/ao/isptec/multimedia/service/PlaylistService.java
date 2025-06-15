package ao.isptec.multimedia.service;

import ao.isptec.multimedia.model.Playlist;
import ao.isptec.multimedia.repository.PlaylistRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PlaylistService {
    private final PlaylistRepository repo;

    public PlaylistService(PlaylistRepository repo) {
        this.repo = repo;
    }

    public List<Playlist> listarTodas() {
        return repo.findAll();
    }

    public Optional<Playlist> buscarPorId(Integer id) {
        return repo.findById(id);
    }

    public Playlist criar(Playlist playlist) {
        return repo.save(playlist);
    }

    public void deletar(Integer id) {
        repo.deleteById(id);
    }
}
