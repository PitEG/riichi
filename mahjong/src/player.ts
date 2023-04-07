import {Tile,Honor} from './tile';

export default class Player {
  seat: Honor;
  score: number;
  discards: Tile[];
  concealed: Tile[];
  revealed: Tile[][];

  constructor() {
    this.seat = 0;
    this.score = 0;
    this.discards = [];
    this.concealed = [];
    this.revealed = [];
  }

  draw(tile: Tile) {
    // pushes it to the end of the concealed list, doesn't rearrange layout
    this.concealed.push(tile);
  }

  discard(tile: Tile) : boolean {
    for (let i = 0; i < this.concealed.length; i++) {
      // the first matching tile we find, we remove and immediately return 
      if (this.concealed[i].equals(tile)) {
        this.concealed.splice(i,i);
        return true;
      }
    }
    return false;
  }

  // this is gonna be a bit time consuming to implement and test
  checkTenpai() : Tile[] {
    // remove a pair
    // remove mentsu
    // remove taatsu
    // repeat for all possible combinations

    // pairs
    for (let p1 = 0; p1 < this.concealed.length; p1++) {
    for (let p2 = p1; p2 < this.concealed.length; p2++) {
      if (p2 == p1) { continue; } // skip pairing with self
      // make copy of hand
      let hand = [...this.concealed];
      // remove pair
      hand.splice(p1);
      hand.splice(p2);
      // mentsu
       
    }
    }

    return [];
  }

  canTsumo() : boolean {
    // must be during their draw for this to make sense
    return false;
  }

  canRon() : boolean {
    // must not be during their draw for this to make sense
    return true;
  }

  canRiichi() : Tile[] {
    // must be during their draw for this to make sense
    return [];
  }

  canKan(tile: Tile) : boolean {
    // can be on draw or someone else's discard
    return false;
  }

  canPon(discard: Tile) : boolean {
    return false;
  }

  canChii(discard: Tile) : boolean {
    // should only check if preceding player disacrds this tile
    return false;
  }
}
