/*
    This is where we'll route all of the received http requests
    into controller response functions.
    
    @author McKilla Gorilla
*/
const express = require('express')
const PlaylistController = require('../controllers/playlist-controller')
const router = express.Router()

router.post('/playlist', PlaylistController.createPlaylist)
router.get('/playlist/:id', PlaylistController.getPlaylistById)
router.get('/playlists', PlaylistController.getPlaylists)
router.get('/playlistpairs', PlaylistController.getPlaylistPairs)
router.post('/updateplaylist', PlaylistController.updatePlaylistById)
router.delete('/playlist/:id', PlaylistController.deletePlaylistById)
router.post('/addsong', PlaylistController.addSong)
router.post('/removesong', PlaylistController.removeSong)

module.exports = router