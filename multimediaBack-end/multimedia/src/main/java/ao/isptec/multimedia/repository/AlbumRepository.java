package ao.isptec.multimedia.repository;

import ao.isptec.multimedia.model.Album;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AlbumRepository extends JpaRepository<Album, Integer> {
}
