package ao.isptec.multimedia.service;

import ao.isptec.multimedia.model.Album;
import ao.isptec.multimedia.repository.AlbumRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AlbumService {

    private final AlbumRepository repo;

    public AlbumService(AlbumRepository repo) {
        this.repo = repo;
    }

    public List<Album> listarTodos() {
        return repo.findAll();
    }

    public Optional<Album> buscarPorId(Integer id) {
        return repo.findById(id);
    }

    public Album criar(Album album) {
        return repo.save(album);
    }

    public void deletar(Integer id) {
        repo.deleteById(id);
    }
}
