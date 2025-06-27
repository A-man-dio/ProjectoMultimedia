package ao.isptec.multimedia.model;

import jakarta.persistence.*;

@Entity
public class ConteudoGrupo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "idGrupo", nullable = false)
    private Grupo grupo;

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

    public Grupo getGrupo() {
        return grupo;
    }

    public void setGrupo(Grupo grupo) {
        this.grupo = grupo;
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