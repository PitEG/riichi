export class Tile {
  suit: Suit; // Shoku
  value: number | Honor | null;

  constructor(suit: Suit, value: number | Honor | null) {
    this.suit = suit;
    this.value = value;
  }

  public toString = () : string => {
    return `${typeof this.suit} - ${this.value}`;
  }
}

export enum Suit {
  Manzu, 
  Souzu,
  Pinzu,
  Kazehai,
  Sangenpai, 
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

// is an honor tile
export function isJihai(tile : Tile) : boolean {
  return tile.suit == Suit.Kazehai || tile.suit == Suit.Sangenpai;
}

// is a terminal
export function isRoutouhai(tile : Tile) : boolean {
  switch (tile.value) {
    case(1): return true;
    case(9): return true;
    default: return false;
  }
}

// is between 2 and 8
export function isTanyaohai(tile: Tile) : boolean {
  if (typeof tile.value == "number") {
    return (tile.value > 1 && tile.value < 9);
  }

  return false;
}

// is terminal or honor
export function isYaochuuhai(tile: Tile) : boolean {
  return isJihai(tile) || isRoutouhai(tile);
}

export function isRealTile(tile: Tile) : boolean {
  // if a numbered tile, check if number is valid
  if ((tile.suit == Suit.Manzu || tile.suit == Suit.Souzu || tile.suit == Suit.Pinzu) && (typeof tile.value == "number")) {
    return tile.value >= 1 && tile.value <= 9;
  }
  
  // if honor tile, make sure suit matches value
  if (tile.suit == Suit.Kazehai && 
      (tile.value == Honor.Ton || 
       tile.value == Honor.Nan ||
       tile.value == Honor.Shaa ||
       tile.value == Honor.Pei)) {
    return true;
  }
  if (tile.suit == Suit.Sangenpai &&
      (tile.value == Honor.Haku ||
       tile.value == Honor.Hatsu ||
       tile.value == Honor.Chun)) {
    return true;
  }

  // otherwise it's not a valid tile
  return false;
}

export default Tile;
