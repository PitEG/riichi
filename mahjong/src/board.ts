import Player from './player';
import Event from './event';
import Command from './command';
import Response from './response';
import {Tile,Suit,Honor} from './tile';

export default class Board {
  players: Player[]; // should only be 4 players, never more or less
  round: Honor; // typically East or South
  dealer: number; // whichever player is dealer this round
  turn: number; // current player's turn
  wall: Tile[];
  nextTile: number;
  dora: number; // total number of dora, just take from end of deadwall
  playLog: Command[]; // game state is recorded through events
  currentPlay: number; // do not confuse with current player

  constructor() {
    this.wall = init();
    // this.wall = tiles.slice(0,-14);
    // this.deadWall = tiles.slice(-14);
    this.dora = 1;
    this.dealer = 0;
    this.round = Honor.Chun; // east wind
    this.turn = 0;
    this.nextTile = 0;
    this.players = [new Player(), new Player(), new Player(), new Player()];
    this.playLog = [];
    this.currentPlay = 0;
  }

  // shuffles list of tiles
  shuffle() {
    let tiles = this.wall;
    for (let i = 0 ; i < tiles.length - 1; i++) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = tiles[i];
      tiles[i] = tiles[j];
      tiles[j] = temp;
    }
  }

  // do command
  play(command : Command) : Response {
    command.do(this);
    return new Response();
  }

  // undo last command
  undo() : Response {
    return new Response();
  };
}

function init(): Tile[] {
  let tiles : Tile[] = [];
  // add numbered tiles
  for(let i = 1; i <= 9; i++) {
    let t1 : Tile = new Tile(Suit.Manzu, i);
    let t2 : Tile = new Tile(Suit.Souzu, i);
    let t3 : Tile = new Tile(Suit.Pinzu, i);
    pushFour(tiles, t1);
    pushFour(tiles, t2);
    pushFour(tiles, t3);
  }
  //winds 
  pushFour(tiles, new Tile(Suit.Kazehai,Honor.Ton));
  pushFour(tiles, new Tile(Suit.Kazehai, Honor.Nan));
  pushFour(tiles, new Tile(Suit.Kazehai, Honor.Shaa));
  pushFour(tiles, new Tile(Suit.Kazehai, Honor.Pei));
  // dragon
  pushFour(tiles, new Tile(Suit.Sangenpai, Honor.Haku));
  pushFour(tiles, new Tile(Suit.Sangenpai, Honor.Hatsu));
  pushFour(tiles, new Tile(Suit.Sangenpai, Honor.Chun));

  return tiles;
}

export type Settings = {
  numPlayers: number,
  washizu: boolean,
}

function pushFour(tiles: Tile[], tile: Tile) {
  tiles.push(tile.clone());
  tiles.push(tile.clone());
  tiles.push(tile.clone());
  tiles.push(tile.clone());
}
