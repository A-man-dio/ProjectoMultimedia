package ao.isptec.multimedia.repository;

import ao.isptec.multimedia.model.Video;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VideoRepository extends JpaRepository<Video, Integer> {
}
