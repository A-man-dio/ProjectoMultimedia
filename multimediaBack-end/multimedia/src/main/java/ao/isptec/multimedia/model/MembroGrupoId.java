package ao.isptec.multimedia.model;

import java.io.Serializable;
import java.util.Objects;

public class MembroGrupoId implements Serializable {
    private Integer idGrupo;
    private Integer idMembro;

    public MembroGrupoId() {}

    public MembroGrupoId(Integer idGrupo, Integer idMembro) {
        this.idGrupo = idGrupo;
        this.idMembro = idMembro;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        MembroGrupoId that = (MembroGrupoId) o;
        return Objects.equals(idGrupo, that.idGrupo) && Objects.equals(idMembro, that.idMembro);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idGrupo, idMembro);
    }
}
