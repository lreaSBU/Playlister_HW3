import React, { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'

function SongCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const [ ttext, setTtext ] = useState("");
    const [ atext, setAtext ] = useState("");
    const [ ltext, setLtext ] = useState("");
    const [editMode, setEditMode] = useState(false);
    const [drag, setDrag] = useState(false);
    const { song, index } = props;
    let cardClass = "list-card unselected-list-card";

    function handleRemove(){
        if(store.songMarkedForEditing != null) return; //dont start removing if already editing
        console.log("HANDLING MARKING FOR REMOVAL");
        store.markSongForRemoval(song, index);

        //console.log("HANDLING REMOVAL");
        //store.addRemoveSongTransaction(song, index);
    }

    function handleEditToggle(){
        store.toggleSongForEditing();
        if(store.songMarkedForDeletion != null) return; //dont try editing if already deleting
        console.log("Entering edit mode");
        var newMode = !editMode;
        setEditMode(newMode);
    }

    function handleKeyPress(event){}
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
        store.addEditSongTransaction(song, index, ttext, atext, ltext);
        handleEditToggle();
    }

    function handleDragStart(event){
        event.dataTransfer.setData("song", event.target.id);
        //this.setState(prevState => ({
        //    isDragging: true,
        //    draggedTo: prevState.draggedTo
        //}));
        setDrag(true);
    }
    function handleDragOver(event) {
        event.preventDefault();
        /*this.setState(prevState => ({
            isDragging: prevState.isDragging,
            draggedTo: true
        }));*/
    }
    function handleDragEnter(event) {
        event.preventDefault();
        /*this.setState(prevState => ({
            isDragging: prevState.isDragging,
            draggedTo: true
        }));*/
    }
    function handleDragLeave(event) {
        event.preventDefault();
        /*this.setState(prevState => ({
            isDragging: prevState.isDragging,
            draggedTo: false
        }));*/
    }
    function handleDrop(event){
        event.preventDefault();
        let target = event.target;
        let targetId = target.id;
        console.log("targetId: " + targetId);
        targetId = targetId.substring(target.id.indexOf("-") + 1);
        let sourceId = event.dataTransfer.getData("song");
        sourceId = sourceId.substring(sourceId.indexOf("-") + 1);
        console.log("targetId: " + targetId);
        console.log("sourceId: " + sourceId);
        /*this.setState(prevState => ({
            isDragging: false,
            draggedTo: false
        }));*/
        setDrag(false);

        // ASK THE MODEL TO MOVE THE DATA
        store.addMoveSongTransaction(sourceId, targetId);
    }
    function handleRealRemove(e){
        e.stopPropagation();
        console.log("HANDLING REAL REMOVAL");
        store.addRemoveSongTransaction(song, index);
    }
    function handleUnmark(e){
        if(e != null) e.stopPropagation();
        store.unMarkSongForRemoval();
    }
    //console.log(store.songMarkedForDeletion);
    //if(store.songMarkedForDeletion != null) console.log(" ==> " + store.songMarkedForDeletion[0] + " , " + store.songMarkedForDeletion[1]);
    let marked = (store.songMarkedForDeletion != null && store.songMarkedForDeletion[0]._id == song._id);
    //console.log("IS_MARKED?: " + marked);
    if(marked){
        return(
            <div
            key={index}
            id={'songcard-' + index}
            className={cardClass}
            draggable="false"
        >
            Are you sure you want to remove {song.name} by {song.artist} ?
            <input
                type="button"
                id={"Confirm-remove-song-" + index}
                className="list-card-button"
                value={"Confirm"}
                onClick={handleRealRemove}
            />
            <input
                type="button"
                id={"Cancel-remove-song-" + index}
                className="list-card-button"
                value={"Cancel"}
                onClick={handleUnmark}
            />
        </div>
        ) 
    }else if(editMode){
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
            id={'songcard-' + index}
            className={cardClass}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            draggable="true"
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