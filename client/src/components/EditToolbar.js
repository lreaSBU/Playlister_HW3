import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import { useHistory } from 'react-router-dom'
/*
    This toolbar is a functional React component that
    manages the undo/redo/close buttons.
    
    @author McKilla Gorilla
*/
function EditToolbar() {
    const { store } = useContext(GlobalStoreContext);
    const history = useHistory();

    let enabledButtonClass = "playlister-button";
    let disabledButtonClass = "playlister-button-disabled";

    function handleUndo() {
        store.undo();
    }
    function handleRedo() {
        store.redo();
    }
    function handleClose() {
        history.push("/");
        store.closeCurrentList();
    }
    function handleAdd(){
        //store.addSong({title: "Untitled", artist: "Unknown", youTubeId: "dQw4w9WgXcQ"});
        store.addAddSongTransaction({title: "Untitled", artist: "Unknown", youTubeId: "dQw4w9WgXcQ"}, -1);
    }
    let currentStatus = store.currentList == null;
    let editStatus = false;
    if (store.isListNameEditActive) {
        editStatus = true;
    }
    let able1 = currentStatus || editStatus || store.songMarkedForDeletion || store.songMarkedForEditing;
    let able2 = able1 || !store.canUndo();
    let able3 = able2 || !store.canRedo();
    return (
        <span id="edit-toolbar">
            <input
                type="button"
                id='add-song-button'
                disabled={able1}
                value="+"
                className={able1 ? disabledButtonClass : enabledButtonClass}
                onClick={handleAdd}
            />
            <input
                type="button"
                id='undo-button'
                disabled={able2}
                value="⟲"
                className={able2 ? disabledButtonClass : enabledButtonClass}
                onClick={handleUndo}
            />
            <input
                type="button"
                id='redo-button'
                disabled={able3}
                value="⟳"
                className={able3 ? disabledButtonClass : enabledButtonClass}
                onClick={handleRedo}
            />
            <input
                type="button"
                id='close-button'
                disabled={able1}
                value="&#x2715;"
                className={able1 ? disabledButtonClass : enabledButtonClass}
                onClick={handleClose}
            />
        </span>);
}

export default EditToolbar;