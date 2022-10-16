import { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom'
import { GlobalStoreContext } from '../store';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function DeleteListModal() {
  const { store } = useContext(GlobalStoreContext);
  store.history = useHistory();

  function handleCancel() {
    store.unmarkListForDeletion()
  }

  function handleDeleteList() {
    store.deleteMarkedList()
  }
  console.log("MODAL: " + store.listMarkedForDeletion)
  return (
    (store.listMarkedForDeletion)?
        <div 
        className="modal" 
        id="delete-list-modal" 
        data-animation="slideInOutLeft">
            <div className="modal-root" id='verify-delete-list-root'>
                <div className="modal-north">
                    Delete Playlist
                </div>
                <div className = "modal-center" id="delete-list-title-input">
                    Are you sure you want to permenantly delete the {store.listMarkedForDeletion.name} Playlist?
                </div>
                <div className="modal-south">
                    <input type="button" 
                        id="delete-list-confirm-button" 
                        className="modal-button" 
                        onClick={handleDeleteList}
                        value='Confirm' />
                    <input type="button" 
                        id="delete-list-cancel-button" 
                        className="modal-button" 
                        onClick={handleCancel}
                        value='Cancel' />
                </div>
            </div>
        </div>
    :"");
}