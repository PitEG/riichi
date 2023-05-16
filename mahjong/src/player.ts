import {Tile,Honor} from './tile';
import Meld from './meld';

export default class Player {
  seat: Honor;
  score: number;
  discards: Tile[];
  drawnTile: Tile | null;
  concealed: Tile[];
  revealed: Meld[];

  constructor() {
    this.seat = 0;
    this.score = 0;
    this.discards = [];
    this.drawnTile = null;
    this.concealed = [];
    this.revealed = [];
  }

  give(tile: Tile) {
    // pushes it to the end of the concealed list, doesn't rearrange layout
    this.concealed.push(tile);
  }

  remove(tile: Tile) : boolean {
    for (let i = 0; i < this.concealed.length; i++) {
      // the first matching tile we find, we remove and immediately return 
      if (this.concealed[i].equals(tile)) {
        this.concealed.splice(i,i);
        return true;
      }
    }
    return false;
  }

  discard(tile: Tile) {
    this.remove(tile);
    this.discards.push(tile);
  }
}
