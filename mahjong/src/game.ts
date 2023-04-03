import Player from './player';
import {Tile,Suit,Honor} from './tile';

export default class Game {
  // players: Player[]; // should only be 4
  wall: Tile[];
  deadWall: Tile[];

  constructor() {
    let tiles = Init();
    this.wall = tiles.slice(0,-14);
    this.deadWall = tiles.slice(-14);
  }
}

function Init(): Tile[] {
  let tiles : Tile[] = [];
  // add numbered tiles
  for(let i = 1; i <= 9; i++) {
    let t1 : Tile = new Tile(Suit.Manzu, i);
    let t2 : Tile = new Tile(Suit.Souzu, i);
    let t3 : Tile = new Tile(Suit.Pinzu, i);
    PushFour(tiles, t1);
    PushFour(tiles, t2);
    PushFour(tiles, t3);
  }
  //winds 
  PushFour(tiles, new Tile(Suit.Kazehai,Honor.Ton));
  PushFour(tiles, new Tile(Suit.Kazehai, Honor.Nan));
  PushFour(tiles, new Tile(Suit.Kazehai, Honor.Shaa));
  PushFour(tiles, new Tile(Suit.Kazehai, Honor.Pei));
  // dragon
  PushFour(tiles, new Tile(Suit.Sangenpai, Honor.Haku));
  PushFour(tiles, new Tile(Suit.Sangenpai, Honor.Hatsu));
  PushFour(tiles, new Tile(Suit.Sangenpai, Honor.Chun));

  // shuffle
  for (let i = 0 ; i < tiles.length - 1; i++) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = tiles[i];
    tiles[i] = tiles[j];
    tiles[j] = temp;
  }
  return tiles;
}

function PushFour(tiles: Tile[], tile: Tile) {
  tiles.push(tile.clone());
  tiles.push(tile.clone());
  tiles.push(tile.clone());
  tiles.push(tile.clone());
}
