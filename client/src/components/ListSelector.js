import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import ListCard from './ListCard.js'
import { GlobalStoreContext } from '../store'
/*
    This React component lists all the playlists in the UI.
    
    @author McKilla Gorilla
*/
const ListSelector = () => {
    const { store } = useContext(GlobalStoreContext);
    const refresh = {status: false};
    store.history = useHistory();
    console.log("RENDERING PLAYLISTS");
    console.log(store);
    useEffect(() => {
        store.loadIdNamePairs();
    }, []);

    function handleCreateNewList() {
        var testName = "Untitled";
        store.createNewList(testName);
        //store.setlistNameActive(store.currentList._id); //go into edit mode immediately
        //refresh.status = !refresh.status;
        //store.setlistNameActive(store.currentList.data.playlist._id); //go into edit mode
    }
    let listCard = "";
    if (store) {
        console.log(store);
        listCard = store.idNamePairs.map((pair) => (
            <ListCard
                key={pair._id}
                idNamePair={pair}
                selected={false}
                editing={store.listNameActive && pair == store.idNamePairs[store.idNamePairs.length-1]} //NVM, IDK HOW THIS FUCKING WORKS
                marking={((store.listMarkedForDeletion && store.listMarkedForDeletion._id == pair._id) ? true : false)}
            />
        ))
    }
    return (
        <div id="playlist-selector">
            <div id="list-selector-list">
            <div id="playlist-selector-heading">
                <input
                    type="button"
                    id="add-list-button"
                    onClick={handleCreateNewList}
                    className="playlister-button"
                    value="+" />
                Your Lists
            </div>                {
                    listCard
                }
            </div>
        </div>)
}

export default ListSelector;