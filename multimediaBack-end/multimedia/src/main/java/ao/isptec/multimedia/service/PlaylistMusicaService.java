package ao.isptec.multimedia.service;

import ao.isptec.multimedia.model.PlaylistMusica;
import ao.isptec.multimedia.model.PlaylistMusicaId;
import ao.isptec.multimedia.repository.PlaylistMusicaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PlaylistMusicaService {
    private final PlaylistMusicaRepository repo;

    public PlaylistMusicaService(PlaylistMusicaRepository repo) {
        this.repo = repo;
    }

    public List<PlaylistMusica> listarTodas() {
        return repo.findAll();
    }

    public Optional<PlaylistMusica> buscarPorId(PlaylistMusicaId id) {
        return repo.findById(id);
    }

    public PlaylistMusica criar(PlaylistMusica m) {
        return repo.save(m);
    }

    public void deletar(PlaylistMusicaId id) {
        repo.deleteById(id);
    }
    /*
{
  "idFicheiro": 1,
  "tipoFicheiro": "musica",
  "idPartilhadoCom": 2,
  "tipoDestino": "grupo",
  "dataPartilha": "2025-06-15T14:00:00"
}
*/
}
