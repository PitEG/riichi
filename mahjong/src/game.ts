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
    let t1 : Tile = {suit: Suit.Manzu, value: i};
    let t2 : Tile = {suit: Suit.Souzu, value: i};
    let t3 : Tile = {suit: Suit.Pinzu, value: i};
    PushFour(tiles, t1);
    PushFour(tiles, t2);
    PushFour(tiles, t3);
  }
  //winds 
  PushFour(tiles, {suit: Suit.Kazehai, value: Honor.Ton});
  PushFour(tiles, {suit: Suit.Kazehai, value: Honor.Nan});
  PushFour(tiles, {suit: Suit.Kazehai, value: Honor.Shaa});
  PushFour(tiles, {suit: Suit.Kazehai, value: Honor.Pei});
  // dragon
  PushFour(tiles, {suit: Suit.Sangenpai, value: Honor.Haku});
  PushFour(tiles, {suit: Suit.Sangenpai, value: Honor.Hatsu});
  PushFour(tiles, {suit: Suit.Sangenpai, value: Honor.Chun});

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
  tiles.push(tile);
  tiles.push(tile);
  tiles.push(tile);
  tiles.push(tile);
}
