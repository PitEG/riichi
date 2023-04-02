import Player from './player';
import {Tile,Suit,Honor} from './tile';

export default class Game {
  // players: Player[]; // should only be 4
  wall: Tile[];
  deadWall: Tile[];

  constructor() {
    let tiles = Init();
    console.log(tiles.length);
    this.wall = tiles.slice(0,-14);
    this.deadWall = tiles.slice(-14);
  }

  shuffle() {
  }
}

function Init(): Tile[] {
  let tiles : Tile[] = [];
  // add numbered tiles
  for(let i = 1; i <= 9; i++) {
    let t : Tile = {suit: Suit.Manzu, value: i};
    PushFour(tiles, t);
    t.suit = Suit.Souzu;
    PushFour(tiles, t);
    t.suit = Suit.Pinzu;
    PushFour(tiles, t);
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

  // shuffle with Durstenfeld Algo
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
