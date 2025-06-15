package ao.isptec.multimedia.model;

import java.io.Serializable;
import java.util.Objects;

public class PlaylistMusicaId implements Serializable {
    private Integer idPlaylist;
    private Integer idMusica;

    public PlaylistMusicaId() {}

    public PlaylistMusicaId(Integer idPlaylist, Integer idMusica) {
        this.idPlaylist = idPlaylist;
        this.idMusica = idMusica;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PlaylistMusicaId that = (PlaylistMusicaId) o;
        return Objects.equals(idPlaylist, that.idPlaylist) && Objects.equals(idMusica, that.idMusica);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idPlaylist, idMusica);
    }
}
