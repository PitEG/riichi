export class Tile {
  suit: Suit; // Shoku
  value: number | Honor;
  red: boolean;
  visible: boolean;

  constructor(suit: Suit, value: number | Honor) {
    this.suit = suit;
    this.value = value;
    this.red = false;
    this.visible = false;
  }
  
  // special tile used for covered tiles, should probably be only used for display
  // not considered a "real tile" by the isRealTile() method.
  static unknown() : Tile {
    return new Tile(0,0);
  }

  // returns negative number if a < b, 0 if a == b, and positive number if a > b
  static compare(a : Tile , b : Tile) : number {
    if (a.suit - b.suit !== 0) {
      return a.suit - b.suit;
    }
    return a.value - b.value;
  }

  equals(tile: Tile) : boolean {
    return (this.suit == tile.suit && 
            this.value == tile.value &&
            this.visible == tile.visible &&
            this.red == tile.red);
  }

  // sequence
  static isShuntsu(a : Tile, b : Tile, c : Tile) : boolean {
    // if not same suit, false
    if (!(a.suit == b.suit && b.suit == c.suit)) {
      return false;
    }
    // order and check if `a + 1 = b and a + 2 = c`;
    let sorted = [a,b,c].sort(Tile.getSortFunc());
    return (sorted[0].value + 1 == sorted[1].value && a.value + 2 == sorted[2].value);
  }

  // is triplet
  static isKoutsu(a : Tile, b : Tile, c : Tile) : boolean {
    // if not same suit, false
    if (!(a.suit == b.suit && b.suit == c.suit)) {
      return false;
    }
    return (a.value == b.value && b.value == c.value);
  }

  // returns list of tiles needed for a mentsu (meld)
  static checkTaatsu(a : Tile, b : Tile) : Tile[] {
    // case these tiles are not the same suit
    if (a.suit != b.suit) { return []; }

    // case this is a sequence
    let neededTiles : Tile[] = [];
    if (a.value + 1 == b.value) {
      neededTiles =  [new Tile(a.suit,a.value-1), new Tile(b.suit,b.value+1)];
    }
    if (a.value - 1 == b.value) {
      neededTiles =  [new Tile(b.suit,b.value-1), new Tile(a.suit,a.value+1)];
    }
    if (neededTiles.length > 0) {
      for (let i = 0; i < neededTiles.length; i++) {
        if (neededTiles[i].value == 0 || neededTiles[i].value == 10) {
          neededTiles.splice(i,1);
        }
      }
      return neededTiles;
    }

    // case this is a triplet
    if (a.value == b.value) {
      return [new Tile(a.suit, a.value)];
    }

    // otherwise return nothing
    return [];
  }

  isUnknown() : boolean {
    return this.suit == 0 && this.value == 0;
  }

  clone() : Tile {
    return new Tile(this.suit, this.value);
  }

  // is an honor tile
  isJihai() : boolean {
    return this.suit == Suit.Kazehai || this.suit == Suit.Sangenpai;
  }

  // is a terminal
  isRoutouhai() : boolean {
    switch (this.value) {
      case(1): return true;
      case(9): return true;
      default: return false;
    }
  }
  // is between 2 and 8
  isTanyaohai() : boolean {
    if (typeof this.value == "number") {
      return (this.value > 1 && this.value < 9);
    }
  
    return false;
  }

  // is terminal or honor
  isYaochuuhai() : boolean {
    return this.isJihai() || this.isRoutouhai();
  }

  // finds the "dora" of this tile ie: the succeeding tile
  dora() : Tile {
    if (this.isJihai()) {
      switch(this.value) {
        // winds
        case(Honor.Ton): return new Tile(Suit.Kazehai, Honor.Nan);
        case(Honor.Nan): return new Tile(Suit.Kazehai, Honor.Shaa);
        case(Honor.Shaa): return new Tile(Suit.Kazehai, Honor.Pei);
        case(Honor.Pei): return new Tile(Suit.Kazehai, Honor.Ton);
        // dragons
        case(Honor.Haku): return new Tile(Suit.Kazehai, Honor.Hatsu);
        case(Honor.Hatsu): return new Tile(Suit.Kazehai, Honor.Chun);
        case(Honor.Chun): return new Tile(Suit.Kazehai, Honor.Haku);
      }
    }
    else if (!this.isJihai()) {
      if (this.value < 9) {
        return new Tile(this.suit, this.value + 1);
      }
      else {
        return new Tile(this.suit, 1);
      }
    }
    return new Tile(0,0);
  }
  
  isRealTile() : boolean {
    // if a numbered this, check if number is valid
    if ((this.suit == Suit.Manzu || this.suit == Suit.Souzu || this.suit == Suit.Pinzu) && (typeof this.value == "number")) {
      return this.value >= 1 && this.value <= 9;
    }
    // if honor this, make sure suit matches value
    if (this.suit == Suit.Kazehai && 
        (this.value == Honor.Ton || 
         this.value == Honor.Nan ||
         this.value == Honor.Shaa ||
         this.value == Honor.Pei)) {
      return true;
    }
    if (this.suit == Suit.Sangenpai &&
        (this.value == Honor.Haku ||
         this.value == Honor.Hatsu ||
         this.value == Honor.Chun)) {
      return true;
    }
    // otherwise it's not a valid tile
    return false;
  }

  nameEN() : string {
    if (!this.isJihai()) {
      switch(this.suit) {
        case(Suit.Manzu): return `${this.value} Character`;
        case(Suit.Souzu): return `${this.value} Bamboo`;
        case(Suit.Pinzu): return `${this.value} Circle`;
      }
    }
    else if (this.isJihai()) {
      switch(this.value) {
        case(Honor.Ton):   return 'East Wind';
        case(Honor.Nan):   return 'South Wind';
        case(Honor.Shaa):  return 'West Wind';
        case(Honor.Pei):   return 'North Wind';
        case(Honor.Haku):  return 'White Dragon';
        case(Honor.Hatsu): return 'Green Dragon';
        case(Honor.Chun):  return 'Red Dragon';
      };
    }

    // else just say it's an uknown tile
    return 'Unknown Tile';
  }

  nameJP() : string {
    return "";
  }

  nameJPRM() : string {
    return "";
  }

  static sort(tiles : Tile[]) : Tile[] {
    return tiles.sort(Tile.getSortFunc());
  }

  static getSortFunc() {
    return function(a : Tile, b: Tile) {
      if (a.suit > b.suit) {
        return a.suit - b.suit;
      }
      return a.value - b.value;
    }
  }
}

export enum Suit {
  Manzu, // character
  Souzu, // bamboo
  Pinzu, // circle
  Kazehai, // wind
  Sangenpai, // dragon
}

export enum Honor {
  // Winds 
  Ton, // East
  Nan, // South
  Shaa, // West
  Pei, // North

  // Dragons
  Haku, // White
  Hatsu, // Green
  Chun, // Red
}

export default Tile;
