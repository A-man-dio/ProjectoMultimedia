package ao.isptec.multimedia.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class Partilha {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Integer idFicheiro;
    private String tipoFicheiro; // musica ou video
    private Integer idPartilhadoCom;
    private String tipoDestino; // grupo ou utilizador
    private java.time.LocalDateTime dataPartilha;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getIdFicheiro() {
        return idFicheiro;
    }

    public void setIdFicheiro(Integer idFicheiro) {
        this.idFicheiro = idFicheiro;
    }

    public String getTipoFicheiro() {
        return tipoFicheiro;
    }

    public void setTipoFicheiro(String tipoFicheiro) {
        this.tipoFicheiro = tipoFicheiro;
    }

    public Integer getIdPartilhadoCom() {
        return idPartilhadoCom;
    }

    public void setIdPartilhadoCom(Integer idPartilhadoCom) {
        this.idPartilhadoCom = idPartilhadoCom;
    }

    public String getTipoDestino() {
        return tipoDestino;
    }

    public void setTipoDestino(String tipoDestino) {
        this.tipoDestino = tipoDestino;
    }

    public LocalDateTime getDataPartilha() {
        return dataPartilha;
    }

    public void setDataPartilha(LocalDateTime dataPartilha) {
        this.dataPartilha = dataPartilha;
    }
}
