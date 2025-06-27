package ao.isptec.multimedia.model;

import jakarta.persistence.*;

@Entity
public class MeuCarregado {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Boolean vinculoDireto; // true se o conteúdo for vinculado diretamente ao grupo

    @ManyToOne
    @JoinColumn(name = "idUtilizador", nullable = false)
    private Utilizador utilizador;

    @ManyToOne
    @JoinColumn(name = "idVideo")
    private Video video;

    @ManyToOne
    @JoinColumn(name = "idMusica")
    private Musica musica;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Boolean getVinculoDireto() {
        return vinculoDireto;
    }

    public void setVinculoDireto(Boolean vinculoDireto) {
        this.vinculoDireto = vinculoDireto;
    }

    public Utilizador getUtilizador() {
        return utilizador;
    }

    public void setUtilizador(Utilizador utilizador) {
        this.utilizador = utilizador;
    }

    public Video getVideo() {
        return video;
    }

    public void setVideo(Video video) {
        this.video = video;
    }

    public Musica getMusica() {
        return musica;
    }

    public void setMusica(Musica musica) {
        this.musica = musica;
    }
    

}