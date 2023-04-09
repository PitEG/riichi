import Tile from './tile';

export default class Call {
  tile: Tile;
  type: Naki;
  direction: number; // the player that this was taken from

  constructor(tile : Tile, type : Naki, direction : number) {
    this.tile = tile;
    this.type = type;
    this.direction = direction;
  }

}

export enum Naki {
  Pon,
  Chii,
  Ankan, // functionally closed but when called, it prevents player from
         // discarding a piece from it and it reveals a new dora.
  Minkan,
  Shouminkan,
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
