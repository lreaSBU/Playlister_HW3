
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
export default class EditSong_Transaction extends jsTPS_Transaction {
    constructor(store, song, nt, na, nl) {
        super();
        this.store = store;
        this.song = song;
        
        this.nt = nt;
        this.na = na;
        this.nl = nl;

        this.ot = this.song.title;
        this.oa = this.song.artist;
        this.ol = this.song.youTubeId;
    }

    doTransaction() {
        this.store.editSong(this.song, this.nt, this.na, this.nl);
    }
    
    undoTransaction() {
        this.store.editSong(this.song, this.ot, this.oa, this.ol);
    }
}