package ao.isptec.multimedia.repository;

import ao.isptec.multimedia.model.Playlist;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlaylistRepository extends JpaRepository<Playlist, Integer> {
}
