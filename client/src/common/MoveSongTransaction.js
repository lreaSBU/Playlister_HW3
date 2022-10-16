
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
export default class MoveSong_Transaction extends jsTPS_Transaction {
    constructor(store, orig, dest) {
        super();
        this.store = store;
        this.orig = orig;
        this.dest = dest;
    }

    doTransaction() {
        this.store.moveSong(this.orig, this.dest);
    }
    
    undoTransaction() {
        this.store.moveSong(this.dest, this.orig);
    }
}