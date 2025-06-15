package ao.isptec.multimedia.service;

import ao.isptec.multimedia.model.Video;
import ao.isptec.multimedia.repository.VideoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VideoService {

    private final VideoRepository repo;

    public VideoService(VideoRepository repo) {
        this.repo = repo;
    }

    public List<Video> listarTodos() {
        return repo.findAll();
    }

    public Optional<Video> buscarPorId(Integer id) {
        return repo.findById(id);
    }

    public Video criar(Video video) {
        return repo.save(video);
    }

    public void deletar(Integer id) {
        repo.deleteById(id);
    }
}
