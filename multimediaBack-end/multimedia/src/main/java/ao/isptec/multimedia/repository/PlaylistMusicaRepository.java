package ao.isptec.multimedia.repository;

import ao.isptec.multimedia.model.PlaylistMusica;
import ao.isptec.multimedia.model.PlaylistMusicaId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlaylistMusicaRepository extends JpaRepository<PlaylistMusica, PlaylistMusicaId> {
}
