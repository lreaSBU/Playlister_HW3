/*
    This is our http api, which we use to send requests to
    our back-end API. Note we're using the Axios library
    for doing this, which is an easy to use AJAX-based
    library. We could (and maybe should) use Fetch, which
    is a native (to browsers) standard, but Axios is easier
    to use when sending JSON back and forth and it's a Promise-
    based API which helps a lot with asynchronous communication.
    
    @author McKilla Gorilla
*/

import axios from 'axios'
const api = axios.create({
    baseURL: 'http://localhost:4000/api',
})

// THESE ARE ALL THE REQUESTS WE'LL BE MAKING, ALL REQUESTS HAVE A
// REQUEST METHOD (like get) AND PATH (like /playlist). SOME ALSO
// REQUIRE AN id SO THAT THE SERVER KNOWS ON WHICH LIST TO DO ITS
// WORK, AND SOME REQUIRE DATA, WHICH WE CALL THE payload, FOR WHEN
// WE NEED TO PUT THINGS INTO THE DATABASE OR IF WE HAVE SOME
// CUSTOM FILTERS FOR QUERIES
export const getAllPlaylists = () => api.get(`/playlists`)
export const getPlaylistPairs = () => api.get('playlistpairs')
export const getPlaylistById = (id) => api.get(`/playlist/${id}`)
export const createNewList = (name) => api.post(`/playlist`, {listName: name})
export const updatePlaylistById = (id, pl) => api.post(`/updateplaylist`, {_id: id, data: pl})
export const deletePlaylistById = (id) => api.delete(`/playlist/${id}`)
export const addSong = (l, s) => api.post(`/addsong`, {list: l, song: s})
export const removeSong = (l, s) => api.post(`/removesong`, {list: l, song: s})
export const editSong = (l, s, t, a, y) => api.post(`/editsong`, {list: l, song: s, title: t, artist: a, link: y})

const apis = {
    getAllPlaylists,
    getPlaylistPairs,
    getPlaylistById,
    createNewList,
    updatePlaylistById,
    deletePlaylistById,
    addSong,
    removeSong,
    editSong
}

export default apis
