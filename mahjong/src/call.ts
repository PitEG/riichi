import Tile from './tile';

export default class Call {
  tile: Tile;
  type: Naki;
  direction: number;

  constructor() {
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
