import { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { GlobalStoreContext } from '../store'
/*
    This is a card in our list of playlists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ListCard(props) {
    const { idNamePair, selected, editing} = props;
    const { store } = useContext(GlobalStoreContext);
    const [ editActive, setEditActive ] = useState(editing);
    //const [ marked, setMark ] = useState(marking);
    const [ text, setText ] = useState("");
    store.history = useHistory();
    function handleLoadList(event) {
        if (!event.target.disabled) {
            let _id = event.target.id;
            if (_id.indexOf('list-card-text-') >= 0)
                _id = ("" + _id).substring("list-card-text-".length);

            // CHANGE THE CURRENT LIST
            store.setCurrentList(_id);
        }
    }

    function handleDeleteList(event) {
        event.stopPropagation();
        //store.deleteList(idNamePair._id);
        store.markListForDeletion(idNamePair._id); //CANT GET MODAL TO SHOW, JUST GONNA ASK FOR CONFIRM IN BOX
    }

    function handleToggleEdit(event) {
        event.stopPropagation();
        toggleEdit(true);
    }

    function toggleEdit(b) {
        let newActive = !editActive;
        if (b && newActive) {
            store.setlistNameActive(idNamePair._id);
        }
        setEditActive(newActive);
    }

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            let id = event.target.id.substring("list-".length);
            //console.log("chagning to: " + text + " with id: " + id);
            store.changeListName(id, text);
            toggleEdit(true);
        }
    }
    function handleUpdateText(event) {
        setText(event.target.value );
    }
    function handleRealDelete(e){
        e.stopPropagation();
        store.deleteList(idNamePair._id);
        handleUnmarkList(null);
    }
    function handleUnmarkList(e){
        if(e != null) e.stopPropagation();
        console.log("ASKING FOR UNMARK!!!");
        store.unmarkListForDeletion();
    }

    if(!editActive && store.listNameActive && store.currentList && store.currentList._id == idNamePair._id){
        toggleEdit(false);
    }
    let marked = ((store.listMarkedForDeletion && store.listMarkedForDeletion._id == idNamePair._id) ? true : false);
    console.log("MARKED: " + marked);
    //setMark(store.listMarkedForDeletion && store.listMarkedForDeletion._id == idNamePair._id);
    /*let oldMarked = marked;
    marked = store.listMarkedForDeletion && store.listMarkedForDeletion._id == idNamePair._id;
    if(!oldMarked && marked){ //brand new mark
        console.log("SETTING MARK TO TRUE <~~~");
        setMark(true);
    }*/

    let selectClass = "unselected-list-card";
    if (selected) {
        selectClass = "selected-list-card";
    }
    let cardStatus = false;
    if (store.isListNameEditActive) {
        cardStatus = true;
    }
    let cardElement =
        <div
            id={idNamePair._id}
            key={idNamePair._id}
            onClick={handleLoadList}
            className={'list-card ' + selectClass}>
            <span
                id={"list-card-text-" + idNamePair._id}
                key={"span-" + idNamePair._id}
                className="list-card-text">
                {idNamePair.name}
            </span>
            <input
                disabled={cardStatus}
                type="button"
                id={"delete-list-" + idNamePair._id}
                className="list-card-button"
                onClick = {handleDeleteList}
                value={"\u2715"}
            />
            <input
                disabled={cardStatus}
                type="button"
                id={"edit-list-" + idNamePair._id}
                className="list-card-button"
                onClick={handleToggleEdit}
                value={"\u270E"}
            />
        </div>;

    if (editActive) {
        cardElement =
            <input
                id={"list-" + idNamePair._id}
                className='list-card'
                type='text'
                onKeyPress={handleKeyPress}
                onChange={handleUpdateText}
                defaultValue={idNamePair.name}
            />;
    }else if(marked){
        console.log("CHANGING ELEMS BC MARKED");
        cardElement =
        <div
            id={idNamePair._id}
            key={idNamePair._id}
            className={'list-card ' + "unselected-list-card"}>
            <span
                id={"list-card-text-" + idNamePair._id}
                key={"span-" + idNamePair._id}
                className="list-card-text">
                {("Are you sure you want to permenantly delete " + idNamePair.name + "?")}
            </span>
            <input
                id={"confirm-" + idNamePair._id}
                className='list-card-button'
                type='button'
                onClick={handleRealDelete}
                value={"Confirm"}
            />;
            <input
                id={"cancel-" + idNamePair._id}
                className='list-card-button'
                type='button'
                onClick={handleUnmarkList}
                value={"Cancel"}
            />;
        </div>;
    }
    return (
        cardElement
    );
}

export default ListCard;