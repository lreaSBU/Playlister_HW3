import { createContext, useState } from 'react'
import jsTPS from '../common/jsTPS'
import AddSongTransaction from '../common/AddSongTransaction'
import RemoveSongTransaction from '../common/RemoveSongTransaction'
import EditSongTransaction from '../common/EditSongTransaction'
import MoveSongTransaction from '../common/MoveSongTransaction'
import api from '../api'
export const GlobalStoreContext = createContext({});
/*
    This is our global data store. Note that it uses the Flux design pattern,
    which makes use of things like actions and reducers. 
    
    @author McKilla Gorilla
*/

// THESE ARE ALL THE TYPES OF UPDATES TO OUR GLOBAL
// DATA STORE STATE THAT CAN BE PROCESSED
export const GlobalStoreActionType = {
    CHANGE_LIST_NAME: "CHANGE_LIST_NAME",
    CLOSE_CURRENT_LIST: "CLOSE_CURRENT_LIST",
    CREATE_NEW_LIST: "CREATE_NEW_LIST",
    LOAD_ID_NAME_PAIRS: "LOAD_ID_NAME_PAIRS",
    SET_CURRENT_LIST: "SET_CURRENT_LIST",
    SET_LIST_NAME_EDIT_ACTIVE: "SET_LIST_NAME_EDIT_ACTIVE",
    MARK_LIST_FOR_DELETION: "MARK_LIST_FOR_DELETION",
    UNMARK_LIST_FOR_DELETION: "UNMARK_LIST_FOR_DELETION",
    CHANGE_SONGS: "CHANGE_SONGS",
    LOAD_ID_AFTER_CREATE: "LOAD_ID_AFTER_CREATE",
    MARK_SONG_FOR_DELETION: "MARK_SONG_FOR_DELETION",
    UNMARK_SONG_FOR_DELETION: "UNMARK_SONG_FOR_DELETION",
    TOGGLE_SONG_FOR_EDITING: "TOGGLE_SONG_FOR_EDITING"
}

// WE'LL NEED THIS TO PROCESS TRANSACTIONS
const tps = new jsTPS();

// WITH THIS WE'RE MAKING OUR GLOBAL DATA STORE
// AVAILABLE TO THE REST OF THE APPLICATION
export const useGlobalStore = () => {
    // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
    const [store, setStore] = useState({
        idNamePairs: [],
        currentList: null,
        newListCounter: 0,
        listNameActive: false,
        listMarkedForDeletion: null,
        songMarkedForDeletion: null,
        songMarkedForEditing: null
    });

    // HERE'S THE DATA STORE'S REDUCER, IT MUST
    // HANDLE EVERY TYPE OF STATE CHANGE
    const storeReducer = (action) => {
        const { type, payload } = action;
        console.log("REDUCING " + type);
        switch (type) {
            // LIST UPDATE OF ITS NAME
            case GlobalStoreActionType.CHANGE_LIST_NAME: {
                return setStore({
                    idNamePairs: payload.idNamePairs,
                    currentList: payload.playlist,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listMarkedForDeletion: null,
                    songMarkedForDeletion: null,
                    songMarkedForEditing: false
                });
            }
            // STOP EDITING THE CURRENT LIST
            case GlobalStoreActionType.CLOSE_CURRENT_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listMarkedForDeletion: null,
                    songMarkedForDeletion: null,
                    songMarkedForEditing: false
                })
            }
            // CREATE A NEW LIST
            case GlobalStoreActionType.CREATE_NEW_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter + 1,
                    listNameActive: true,
                    listMarkedForDeletion: null,
                    songMarkedForDeletion: null,
                    songMarkedForEditing: false
                })
            }
            // GET ALL THE LISTS SO WE CAN PRESENT THEM
            case GlobalStoreActionType.LOAD_ID_NAME_PAIRS: {
                return setStore({
                    idNamePairs: payload,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listMarkedForDeletion: null,
                    songMarkedForDeletion: null,
                    songMarkedForEditing: false
                });
            }
            //refresh listings after creation (special case)
            case GlobalStoreActionType.LOAD_ID_AFTER_CREATE: {
                return setStore({
                    idNamePairs: payload,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listNameActive: true,
                    listMarkedForDeletion: null,
                    songMarkedForDeletion: null,
                    songMarkedForEditing: false
                });
            }
            // PREPARE TO DELETE A LIST
            case GlobalStoreActionType.MARK_LIST_FOR_DELETION: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listMarkedForDeletion: payload,
                    songMarkedForDeletion: null,
                    songMarkedForEditing: false
                });
            }
            //UNPREPARE TO DELETE A LIST
            case GlobalStoreActionType.UNMARK_LIST_FOR_DELETION: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listMarkedForDeletion: null,
                    songMarkedForDeletion: null,
                    songMarkedForEditing: false
                });
            }
            // UPDATE A LIST
            case GlobalStoreActionType.SET_CURRENT_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listMarkedForDeletion: null,
                    songMarkedForDeletion: null,
                    songMarkedForEditing: false
                });
            }
            // START EDITING A LIST NAME
            case GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter,
                    listNameActive: true,
                    listMarkedForDeletion: null,
                    songMarkedForDeletion: null,
                    songMarkedForEditing: false
                });
            }
            case GlobalStoreActionType.CHANGE_SONGS: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listMarkedForDeletion: null,
                    songMarkedForDeletion: null,
                    songMarkedForEditing: false
                });
            }
            case GlobalStoreActionType.MARK_SONG_FOR_DELETION: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listMarkedForDeletion: null,
                    songMarkedForDeletion: payload,
                    songMarkedForEditing: false
                });
            }
            case GlobalStoreActionType.UNMARK_SONG_FOR_DELETION: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listMarkedForDeletion: null,
                    songMarkedForDeletion: null,
                    songMarkedForEditing: false
                });
            }
            case GlobalStoreActionType.TOGGLE_SONG_FOR_EDITING: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listMarkedForDeletion: null,
                    songMarkedForDeletion: null,
                    songMarkedForEditing: payload //true or false
                });
            }
            default:
                return store;
        }
    }
    // THESE ARE THE FUNCTIONS THAT WILL UPDATE OUR STORE AND
    // DRIVE THE STATE OF THE APPLICATION. WE'LL CALL THESE IN 
    // RESPONSE TO EVENTS INSIDE OUR COMPONENTS.

    /*store.startDeleteList = function (id) { //GlobalStoreActionType.MARK_LIST_FOR_DELETION
        storeReducer({
            type: GlobalStoreActionType.MARK_LIST_FOR_DELETION,
            payload: id
        });
    }*/
    // THIS FUNCTION PROCESSES CHANGING A LIST NAME
    store.changeListName = function (id, newName) {
        // GET THE LIST
        async function asyncChangeListName(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;
                playlist.name = newName;
                async function updateList(playlist) {
                    response = await api.updatePlaylistById(playlist._id, playlist);
                    console.log("update response: ");
                    console.log(response);
                    if (response.data.success) {
                        async function getListPairs(playlist) {
                            response = await api.getPlaylistPairs();
                            if (response.data.success) {
                                let pairsArray = response.data.idNamePairs;
                                console.log(pairsArray);
                                storeReducer({
                                    type: GlobalStoreActionType.CHANGE_LIST_NAME,
                                    payload: {
                                        idNamePairs: pairsArray,
                                        playlist: playlist
                                    }
                                });
                            }
                        }
                        getListPairs(playlist);
                    }
                }
                updateList(playlist);
            }
        }
        asyncChangeListName(id);
    }

    // THIS FUNCTION PROCESSES CLOSING THE CURRENTLY LOADED LIST
    store.closeCurrentList = function () {
        tps.clearAllTransactions();
        storeReducer({
            type: GlobalStoreActionType.CLOSE_CURRENT_LIST,
            payload: {}
        });
    }

    // THIS FUNCTION LOADS ALL THE ID, NAME PAIRS SO WE CAN LIST ALL THE LISTS
    store.loadIdNamePairs = function () {
        async function asyncLoadIdNamePairs() {
            const response = await api.getPlaylistPairs();
            if (response.data.success) {
                let pairsArray = response.data.idNamePairs;
                storeReducer({
                    type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                    payload: pairsArray
                });
            }
            else {
                console.log("API FAILED TO GET THE LIST PAIRS");
            }
        }
        asyncLoadIdNamePairs();
    }
    store.loadIdAfterCreate = function () { //does same exact thing as loadIdPairNames but keeps listNameActive true
        async function asyncLoadIdNamePairs() {
            const response = await api.getPlaylistPairs();
            if (response.data.success) {
                let pairsArray = response.data.idNamePairs;
                storeReducer({
                    type: GlobalStoreActionType.LOAD_ID_AFTER_CREATE,
                    payload: pairsArray
                });
            }
            else {
                console.log("API FAILED TO GET THE LIST PAIRS");
            }
        }
        asyncLoadIdNamePairs();
    }
    store.deleteList = async function (lid) {
        console.log("LID: " + lid);
        let response = await api.deletePlaylistById(lid);
        if (response.data.success) {
            store.unmarkListForDeletion();
            store.loadIdNamePairs();
            store.history.push("/");
        }
    }
    store.markListForDeletion = async function (id) {
        // GET THE LIST
        let response = await api.getPlaylistById(id);
        if (response.data.success) {
            let pl = response.data.playlist;
            storeReducer({
                type: GlobalStoreActionType.MARK_LIST_FOR_DELETION,
                payload: pl
            });
            //store.loadIdNamePairs();
        }
    }
    store.toggleSongForEditing = async function(){ //i dont think this needs to be async
        let pay = !store.songMarkedForEditing;
        storeReducer({
            type: GlobalStoreActionType.TOGGLE_SONG_FOR_EDITING,
            payload: pay
        });
    }
    store.deleteMarkedList = function () {
        store.deleteList(store.listMarkedForDeletion._id);
    }
    store.markSongForRemoval = async function(song, index){
        storeReducer({
            type: GlobalStoreActionType.MARK_SONG_FOR_DELETION,
            payload: [song, index]
        });
    }
    store.unMarkSongForRemoval = async function(){
        storeReducer({
            type: GlobalStoreActionType.UNMARK_SONG_FOR_DELETION,
            payload: null
        });
    }

    store.unmarkListForDeletion = function () {
        storeReducer({
            type: GlobalStoreActionType.UNMARK_LIST_FOR_DELETION,
            payload: null
        });
        //store.loadIdNamePairs();
    }
    store.createNewList = function(name){
        async function asynccreateNewList(){
            const r = await api.createNewList(name);
            console.log("WE GOT SOMETHING!!!");
            console.log(r);
            if(r.data.success){
                var pl = r.data.playlist;
                storeReducer({
                    type: GlobalStoreActionType.CREATE_NEW_LIST,
                    payload: pl
                });
                store.loadIdAfterCreate(); //LOAD_ID_AFTER_CREATE
                /*storeReducer({
                    type: GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE,
                    payload: pl
                });*/
                //store.loadIdNamePairs();
                //store.history.push("/playlist/" + pl._id); //DONT DO THIS HERE
            }
        }
        asynccreateNewList();
        //console.log("CURID: " + store.currentList._id);
        //store.setlistNameActive(store.currentList._id);
    }

    store.setCurrentList = function (id) {
        async function asyncSetCurrentList(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;

                if (response.data.success) {
                    storeReducer({
                        type: GlobalStoreActionType.SET_CURRENT_LIST,
                        payload: playlist
                    });
                    store.history.push("/playlist/" + playlist._id);
                }
            }
        }
        asyncSetCurrentList(id);
    }
    store.getPlaylistSize = function() {
        return store.currentList.songs.length;
    }
    store.undo = function () {
        tps.undoTransaction();
    }
    store.redo = function () {
        tps.doTransaction();
    }
    store.canUndo = function() {
        return tps.hasTransactionToUndo();
    }
    store.canRedo = function() {
        return tps.hasTransactionToRedo();
    }
    store.addMoveSongTransaction = function(orig, dest){
        tps.addTransaction(new MoveSongTransaction(store, orig, dest));
    }
    store.addEditSongTransaction = function(song, pos, newTitle, newArtist, newLink){
        tps.addTransaction(new EditSongTransaction(store, song, pos, newTitle, newArtist, newLink));
    }
    store.addAddSongTransaction = function(song, pos){
        tps.addTransaction(new AddSongTransaction(store, song, pos));
    }
    store.addRemoveSongTransaction = function(song, pos){
        tps.addTransaction(new RemoveSongTransaction(store, song, pos));
    }
    store.moveSong = async function(o, d){
        var r = await api.moveSong(store.currentList._id, o, d);
        console.log("attempting song move: " + o + ", " + d);
        console.log(r);
        if(r.data.success){
            console.log("Succesfully moved song!");
            storeReducer({
                type: GlobalStoreActionType.CHANGE_SONGS,
                payload: r.data.playlist
            });
            console.log("MOVED NOW?");
            console.log(store);
        }
    }
    store.editSong = async function(song, pos, t, a, l){
        var r = await api.editSong(store.currentList._id, song, pos, t, a, l);
        console.log("attempting song edit: " + t + ", " + a + ", " + l);
        console.log(r);
        if(r.data.success){
            console.log("Succesfully edited song!");
            storeReducer({
                type: GlobalStoreActionType.CHANGE_SONGS,
                payload: r.data.playlist
            });
            console.log("EDITED NOW?");
            console.log(store);
        }
    }
    store.removeSong = async function(song, pos){
        var r = await api.removeSong(store.currentList._id, song, pos);
        console.log("attempting song removal");
        console.log(r);
        if(r.data.success){
            console.log("Succesfully deleted song!");
            storeReducer({
                type: GlobalStoreActionType.CHANGE_SONGS,
                payload: r.data.playlist
            });
            console.log("REMOVED NOW?");
            console.log(store);
        }
    }
    store.addSong = async function(song, pos){
        var r = await api.addSong(store.currentList._id, song, pos);
        console.log("attempting song addition");
        console.log(r);
        if(r.data.success){
            console.log("Succesfully added song!");
            storeReducer({
                type: GlobalStoreActionType.CHANGE_SONGS,
                payload: r.data.playlist
            });
            console.log("ADDED NOW?");
            console.log(store);
        }
    }
    // THIS FUNCTION ENABLES THE PROCESS OF EDITING A LIST NAME
    store.setlistNameActive = function (id) {
        async function aSetlistnameActive(){
            let r = await api.getPlaylistById(id);
            if(r.data.success){
                var pl = r.data.playlist;
                storeReducer({
                    type: GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE,
                    payload: pl
                });
            }
        }
        aSetlistnameActive();
    }

    // THIS GIVES OUR STORE AND ITS REDUCER TO ANY COMPONENT THAT NEEDS IT
    return { store, storeReducer };
}