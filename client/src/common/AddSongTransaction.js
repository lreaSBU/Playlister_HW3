
import jsTPS_Transaction from "../common/jsTPS.js"
import { GlobalStoreContext } from '../store';
/**
 * MoveSong_Transaction
 * 
 * This class represents a transaction that works with drag
 * and drop. It will be managed by the transaction stack.
 * 
 * @author McKilla Gorilla
 * @author ?
 */
export default class AddSong_Transaction extends jsTPS_Transaction {
    constructor(song) {
        super();
        this.song = song;
    }

    doTransaction() {
        store.addSong(this.song);
    }
    
    undoTransaction() {
        store.removeSong(this.song);
    }
}