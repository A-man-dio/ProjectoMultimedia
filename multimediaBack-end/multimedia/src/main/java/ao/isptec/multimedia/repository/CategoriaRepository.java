package ao.isptec.multimedia.repository;

import ao.isptec.multimedia.model.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoriaRepository extends JpaRepository<Categoria, Integer> {
}
