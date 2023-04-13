import {Tile,Honor} from './tile';
import Call from './call';
import {Naki} from './call';

export default class Player {
  seat: Honor;
  score: number;
  discards: Tile[];
  drawnTile: Tile | null;
  concealed: Tile[];
  revealed: Call[];

  constructor() {
    this.seat = 0;
    this.score = 0;
    this.discards = [];
    this.drawnTile = null;
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

    let agari : Tile[] = [];

    // Chiitoitsu

    // for a typical hand
    
    // remove a pair
    for (let p1 = 0; p1 < this.concealed.length-1; p1++) {
    for (let p2 = p1+1; p2 < this.concealed.length; p2++) {
      if (p1 == p2) { continue; } // skip pairing with self
      if (!this.concealed[p1].equals(this.concealed[p2])) { continue; } // skip non-pairs
      // make copy of hand
      let pairless = [...this.concealed];
      // remove pair
      pairless.splice(p1,1);
      pairless.splice(p2-1,1);
      agari = agari.concat(findTenpaiAgariRmMelds(pairless));
    }
    }
    // try without removing pair 
    agari = agari.concat(findTenpaiAgariRmMelds([...this.concealed]));

    // return only unique agari
    return agari.filter((v,i,a) => {
      for (let j = 0; j < a.length; j++) {
        if (a[j].equals(v)) {
          return i === j;
        }
      }
    });
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

  fu() : number {
    let fu = 20;
    // go through open melds
    for (let i = 0; i < this.revealed.length; i++) {
      let meld = this.revealed[i];
      if (meld.type == Naki.Pon) {
        if (meld.tile.isJihai()) {
          fu += 8;
        }
        else {
          fu += 4;
        }
      }
      else if (meld.type == Naki.Minkan) {
        if (meld.tile.isJihai()) {
          fu += 16;
        }
        else {
          fu += 8;
        }
      }
    }
    // go through concealed melds
    
    return fu;
  }

  melds() : Tile[][] {
    return findMelds(this.concealed);
  }
}

// finds tenpai (if it exists) by removing melds
function findTenpaiAgariRmMelds(tiles : Tile[]) : Tile[] {
  let agari : Tile[] = [];
  // return nothing if no tiles are given
  if (tiles.length == 0) {
    return [];
  }
  // if only 1 left, the agari is a part of a pair
  if (tiles.length == 1) {
    return tiles;
  }
  // if only 2 left, check if it's in Taatsu (waiting on a third tile)
  if (tiles.length == 2) {
    return Tile.checkTaatsu(tiles[0], tiles[1]);
  }
  // if 3 or more left, try combinations of tiles to make melds for removal
  for (let m1 = 0; m1 < tiles.length-2; m1++) {
  for (let m2 = m1+1; m2 < tiles.length-1; m2++) {
  for (let m3 = m2+1; m3 < tiles.length; m3++) {
    // if a valid meld, remove and recurse
    if (Tile.isKoutsu(tiles[m1],tiles[m2],tiles[m3]) || Tile.isShuntsu(tiles[m1],tiles[m2],tiles[m3])) {
      let subset = [...tiles];
      subset.splice(m1,1);
      subset.splice(m2-1,1);
      subset.splice(m3-2,1);
      agari = agari.concat(findTenpaiAgariRmMelds(subset));
    }
  }
  }
  }
  return agari;
}

// finds melds of a concealed hand (has a pair)
function findMelds(tiles : Tile[]) : Tile[][] {
  let hands : Tile[][] = [];
  // get pair
  for (let p1 = 0; p1 < tiles.length; p1++) {
  for (let p2 = 0; p2 < tiles.length; p2++) {
    // if not equal, let's go again
    if (!tiles[p1].equals(tiles[p2])) {
    }
    // if equal, start finding melds
    let subset = [...tiles];
    subset.splice(p1,1);
    subset.splice(p2-1,1);
  }
  }
  return hands;
}

// find melds within triplets (no pair)
function findMeldsNoPair(tiles : Tile[], hands : Tile[][]) : Tile[] {
  let meld = [];
  for (let m1 = 0; m1 < tiles.length-2; m1++) {
  for (let m2 = m1+1; m2 < tiles.length-1; m2++) {
  for (let m3 = m2+1; m3 < tiles.length; m3++) {
    // if a valid meld, remove and recurse
    if (Tile.isKoutsu(tiles[m1],tiles[m2],tiles[m3]) || Tile.isShuntsu(tiles[m1],tiles[m2],tiles[m3])) {
      let subset = [...tiles];
      subset.splice(m1,1);
      subset.splice(m2-1,1);
      subset.splice(m3-2,1);
      let hand = findMeldsNoPair(subset, hands);
      if (hand.length > 0) {
        hands.push(hand);
      }
    }
  }
  }
  }
  return [];
}
