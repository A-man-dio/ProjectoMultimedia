package ao.isptec.multimedia.model;

import jakarta.persistence.*;

@Entity
@IdClass(MembroGrupoId.class)
public class MembroGrupo {
    @Id
    private Integer idGrupo;

    @Id
    private Integer idMembro;

    private Integer funcao; // 1=membro, 2=editor, 3=owner

    public Integer getIdMembro() {
        return idMembro;
    }

    public void setIdMembro(Integer idMembro) {
        this.idMembro = idMembro;
    }

    public Integer getIdGrupo() {
        return idGrupo;
    }

    public void setIdGrupo(Integer idGrupo) {
        this.idGrupo = idGrupo;
    }

    public Integer getFuncao() {
        return funcao;
    }

    public void setFuncao(Integer funcao) {
        this.funcao = funcao;
    }
}