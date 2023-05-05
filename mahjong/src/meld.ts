import Tile from './tile';

export default class Meld {
  tile: Tile;
  type: Naki;
  source: number; // the player that this was taken from

  constructor(tile : Tile, type : Naki, source: number) {
    this.tile = tile;
    this.type = type;
    this.source = source;
  }

  // returns a list of tiles that this meld is made of 
  expand() : Tile[] {
    switch(this.type) {
      case(Naki.Pon): return [this.tile.clone(), this.tile.clone(), this.tile.clone()];
      case(Naki.Chii): {
        let first = this.tile.clone();
        let second = new Tile(first.suit, first.value+1);
        let third = new Tile(first.suit, first.value+2);
        return [first, second, third];
      };
      // TODO: missing a few more cases 
    }
    return [];
  }

  static makeShuntsu(a : Tile, b : Tile, c : Tile) : Meld | null {
    if (!Tile.isShuntsu(a,b,c)) {
      return null;
    }
    let sorted = [a,b,c].sort(Tile.getSortFunc());
    return new Meld(sorted[0], Naki.Chii,-1);
  }

  static makeKoutsu(tile: Tile) : Meld {
    return new Meld(tile, Naki.Pon, -1);
  }
}

export enum Naki {
  Pon,
  Chii,
  Ankan, // functionally closed but when called, it prevents player from
         // discarding a piece from it and it reveals a new dora.
  Minkan,
  Shouminkan,

  Kita, // for 3 player, only comprises of a single north tile
}

function chii(hand: Tile[], discard : Tile): [Tile[]] {
  return [[]];
}

function kan(concealed: Tile[], revealed: [Tile[]], discard : Tile) : Tile[] {
  return [];
}

function pon(hand: Tile[], discard : Tile): [Tile[]] {
  return [[]];
}
