package ao.isptec.multimedia.service;

import ao.isptec.multimedia.model.MembroGrupo;
import ao.isptec.multimedia.model.MembroGrupoId;
import ao.isptec.multimedia.repository.MembroGrupoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MembroGrupoService {

    private final MembroGrupoRepository repo;

    public MembroGrupoService(MembroGrupoRepository repo) {
        this.repo = repo;
    }

    public List<MembroGrupo> listarTodos() {
        return repo.findAll();
    }

    public Optional<MembroGrupo> buscarPorId(MembroGrupoId id) {
        return repo.findById(id);
    }

    public MembroGrupo criar(MembroGrupo m) {
        return repo.save(m);
    }

    public void deletar(MembroGrupoId id) {
        repo.deleteById(id);
    }
}
