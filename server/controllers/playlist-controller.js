const Playlist = require('../models/playlist-model')
/*
    This is our back-end API. It provides all the data services
    our database needs. Note that this file contains the controller
    functions for each endpoint.
    
    @author McKilla Gorilla
*/
addSong = async (req, res) => { //pid, song
    var body = req.body;
    console.log(body);
    var pid = body.list;
    var song = body.song;
    await Playlist.findOne({ _id: pid }, (err, list) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        var index = list.songs.length;
        list.songs.push(song);
        //list.songs.push((song, index));
        Playlist.updateOne({ _id: pid }, { name: list.name, songs: list.songs }, function(err, res1) {
            return res.status(200).json({ success: true, playlist: list, message: 'Song Added!' });
        }).catch(err => console.log(err));
        //return res.status(200).json({ success: true, playlist: list }) //song added!
    }).catch(err => console.log(err))
}
removeSong = async (req, res) => {
    var body = req.body;
    var pid = body.list;
    var song = body.song;
    await Playlist.findOne({ _id: pid }, (err, list) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        for(var i = 0; i < list.songs.length; i++){
            if(list.songs[i].name == song.name){
                list.songs.splice(i, 1);
                break;
            }
        }
        return res.status(200).json({ success: true, playlist: list }) //song removed!
    }).catch(err => console.log(err))
}
updatePlaylistById = (req, res) => {
    const body = req.body;
    Playlist.updateOne({ _id: body._id }, { name: body.data.name, songs: body.data.songs }, function(err, res1) {
        return res.status(200).json({ success: true, message: 'Playlist Edited!' });
    }).catch(err => console.log(err));
    /*Playlist.findOne({ _id: body._id }, (err, list) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        console.log("BODY: " + body);
        list.name = body.data.name;
        list.songs = body.data.songs;
        //list = body.pl; //set the playlist to the given param
        return res.status(202).json({ success: true, playlist: list, message: 'Playlist Edited!'})
    }).catch(err => console.log(err))*/
}
deletePlaylistById = async (req, res) => {
    Playlist.findById({ _id: req.params.id }, (err, list) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Playlist not found!',
            })
        }
        Playlist.findOneAndDelete({ _id: req.params.id }, () => {
            return res.status(200).json({ success: true, data: list })
        }).catch(err => console.log(err))
    })
}
createPlaylist = (req, res) => {
    const body = req.body;
    console.log("createPlaylist body: " + body.listName);

    if (!body.listName) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a Playlist',
        })
    }

    const playlist = new Playlist({name: body.listName, songs: []});
    console.log("playlist: " + JSON.stringify(body));
    if (!playlist) {
        return res.status(400).json({ success: false, error: err })
    }

    playlist
        .save()
        .then(() => {
            return res.status(200).json({
                success: true,
                playlist: playlist,
                message: 'Playlist Created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Playlist Not Created!',
            })
        })
}
getPlaylistById = async (req, res) => {
    await Playlist.findOne({ _id: req.params.id }, (err, list) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        return res.status(200).json({ success: true, playlist: list })
    }).catch(err => console.log(err))
}
getPlaylists = async (req, res) => {
    await Playlist.find({}, (err, playlists) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!playlists.length) {
            return res
                .status(404)
                .json({ success: false, error: `Playlists not found` })
        }
        return res.status(200).json({ success: true, data: playlists })
    }).catch(err => console.log(err))
}
getPlaylistPairs = async (req, res) => {
    await Playlist.find({}, (err, playlists) => {
        if (err) {
            return res.status(400).json({ success: false, error: err})
        }
        if (!playlists.length) {
            return res
                .status(404)
                .json({ success: false, error: 'Playlists not found'})
        }
        else {
            // PUT ALL THE LISTS INTO ID, NAME PAIRS
            let pairs = [];
            for (let key in playlists) {
                let list = playlists[key];
                let pair = {
                    _id : list._id,
                    name : list.name
                };
                pairs.push(pair);
            }
            return res.status(200).json({ success: true, idNamePairs: pairs })
        }
    }).catch(err => console.log(err))
}

module.exports = {
    createPlaylist,
    getPlaylists,
    getPlaylistPairs,
    getPlaylistById,
    updatePlaylistById,
    deletePlaylistById,
    addSong,
    removeSong
}