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
        case(Suit.Manzu): return `${this.value} Circle`;
      }
    }
    else if (this.isJihai()) {
      let name : string = "";
      switch(this.value) {
        case(Honor.Ton):    name = 'East';
        case(Honor.Nan):    name = 'South';
        case(Honor.Shaa):   name = 'West';
        case(Honor.Pei):    name = 'North';
        case(Honor.Haku):   name = 'White';
        case(Honor.Hatsu):  name = 'Green';
        case(Honor.Chun):   name = 'Red';
        default: name = "Invalid";
      };
      switch(this.suit) {
        case(Suit.Sangenpai): name.concat(' Dragon');
        case(Suit.Kazehai): name.concat(' Wind');
      };
      return name;
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
