import React, { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'

function SongCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const [ ttext, setTtext ] = useState("");
    const [ atext, setAtext ] = useState("");
    const [ ltext, setLtext ] = useState("");
    const [editMode, setEditMode] = useState(false);
    const { song, index } = props;
    let cardClass = "list-card unselected-list-card";

    function handleRemove(){
        console.log("HANDLING REMOVAL");
        store.addRemoveSongTransaction(song);
    }

    function handleEditToggle(){
        console.log("Entering edit mode");
        var newMode = !editMode;
        setEditMode(newMode);
    }

    function handleKeyPress(event) {
        /*if (event.code === "Enter") {
            let id = event.target.id.substring("list-".length);
            //console.log("chagning to: " + text + " with id: " + id);
            //store.changeListName(id, text);
            store.changeSong(song, ttext, atext, ltext);
            handleEditToggle();
        }*/
    }
    function handleUpdateTtext(event) {
        setTtext(event.target.value );
    }
    function handleUpdateAtext(event) {
        setAtext(event.target.value );
    }
    function handleUpdateLtext(event) {
        setLtext(event.target.value );
    }
    function editCancel(event){
        handleEditToggle();
    }
    function editConfirm(event){
        store.addEditSongTransaction(song, ttext, atext, ltext);
        handleEditToggle();
    }

    if(editMode){
        return <div>
            <input
                id={"title-" + song._id}
                className='list-card'
                type='text'
                onKeyPress={handleKeyPress}
                onChange={handleUpdateTtext}
                defaultValue={song.title}
            />
            <input
                id={"artist-" + song._id}
                className='list-card'
                type='text'
                onKeyPress={handleKeyPress}
                onChange={handleUpdateAtext}
                defaultValue={song.artist}
            />
            <input
                id={"link-" + song._id}
                className='list-card'
                type='text'
                onKeyPress={handleKeyPress}
                onChange={handleUpdateLtext}
                defaultValue={song.youTubeId}
            />
            <input
                type="button"
                id={"remove-song-" + index}
                className="list-card-button"
                value={"Confirm"}
                onClick={editConfirm}
            />
            <input
                type="button"
                id={"remove-song-" + index}
                className="list-card-button"
                value={"Cancel"}
                onClick={editCancel}
            />
        </div>;
    }else return (
        <div
            key={index}
            id={'song-' + index + '-card'}
            className={cardClass}
            onDoubleClick={handleEditToggle}
        >
            {index + 1}.
            <a
                id={'song-' + index + '-link'}
                className="song-link"
                href={"https://www.youtube.com/watch?v=" + song.youTubeId}>
                {song.title} by {song.artist}
            </a>
            <input
                type="button"
                id={"remove-song-" + index}
                className="list-card-button"
                value={"\u2715"}
                onClick={handleRemove}
            />
        </div>
    );
}

export default SongCard;