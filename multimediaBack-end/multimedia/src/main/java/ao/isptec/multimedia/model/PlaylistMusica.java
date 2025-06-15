package ao.isptec.multimedia.model;

import jakarta.persistence.*;

@Entity

@IdClass(PlaylistMusicaId.class)
public class PlaylistMusica {
    @Id
    private Integer idPlaylist;

    @Id
    private Integer idMusica;

    private Integer ordem;

    public Integer getIdPlaylist() {
        return idPlaylist;
    }

    public void setIdPlaylist(Integer idPlaylist) {
        this.idPlaylist = idPlaylist;
    }

    public Integer getIdMusica() {
        return idMusica;
    }

    public void setIdMusica(Integer idMusica) {
        this.idMusica = idMusica;
    }

    public Integer getOrdem() {
        return ordem;
    }

    public void setOrdem(Integer ordem) {
        this.ordem = ordem;
    }
}

