
import jsTPS_Transaction from "../common/jsTPS.js"
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
    constructor(store, song, pos) {
        super();
        this.store = store;
        this.song = song;
        this.pos = pos;
    }

    doTransaction() {
        this.store.addSong(this.song, this.pos);
    }
    
    undoTransaction() {
        this.store.removeSong(this.song, this.pos);
    }
}