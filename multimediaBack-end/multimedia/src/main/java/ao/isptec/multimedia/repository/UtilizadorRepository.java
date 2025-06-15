package ao.isptec.multimedia.repository;

import ao.isptec.multimedia.model.Utilizador;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UtilizadorRepository extends JpaRepository<Utilizador, Integer> {
    boolean existsByEmail(String email);
}
