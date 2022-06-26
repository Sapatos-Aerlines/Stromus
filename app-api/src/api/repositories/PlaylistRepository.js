const { Playlist } = require("./database/models/index")

class PlaylistRepository {

    async create(playlist) {
        return await Playlist.create(playlist);
    }

    async findById(idPlaylist) {
        return await Playlist.findAll({
            where: {
                id: idPlaylist
            }
        });
    }

    async all() {
        return await Playlist.findAll();
    }

    async update(playlist) {
        
        return await Playlist.update(
            playlist,
            { where: {id: playlist.id}}
        )
    }

    async removeById(idPlaylist) {
        return await Playlist.destroy({
            where: {
                id: idPlaylist
            }
        });
    }
}

module.exports = new PlaylistRepository();