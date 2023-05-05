import Board from './src/board';
import Command from './src/command';
import Player from './src/player';
import {Tile, Suit, Honor} from './src/tile';

let thing = 'hi'
let board = new Board();
board.shuffle();
console.log(board.wall)

console.log((new Tile(Suit.Pinzu, 8)).nameEN());
console.log((new Tile(Suit.Souzu, 9)).dora().nameEN());
console.log((new Tile(Suit.Kazehai, Honor.Ton)).dora().nameEN());

let c = Command.playerDraw(1);
board.play(c);
console.log(c.name);
console.log(board.players[0].concealed);
console.log(Tile.compare(new Tile(0,1),new Tile(1,1)));
console.log(Tile.compare(new Tile(0,1),new Tile(0,2)));
console.log(Tile.compare(new Tile(2,1),new Tile(0,2)));

console.log(Tile.isShuntsu(new Tile(0,1), new Tile(0,3), new Tile(0,2)));
console.log(Tile.isShuntsu(new Tile(0,1), new Tile(0,4), new Tile(0,2)));
console.log(Tile.isKoutsu(new Tile(1,1), new Tile(1,1), new Tile(1,1)));
console.log(Tile.isKoutsu(new Tile(0,1), new Tile(1,1), new Tile(1,1)));
console.log(Tile.isKoutsu(new Tile(1,1), new Tile(1,2), new Tile(1,1)));

let p = new Player();
// 1,2,2,2,3,4,5
p.concealed = [new Tile(1,1), new Tile(1,2), new Tile(1,2), new Tile(1,2), new Tile(1,3), new Tile(1,4), new Tile(1,5)];
// p.concealed = [new Tile(1,1), new Tile(1,1), new Tile(1,2), new Tile(1,2)];
console.log('finding tenpai');
console.log(p.checkTenpai());

// p.concealed = [new Tile(1,1), new Tile(1,2), new Tile(1,2), new Tile(1,2), new Tile(1,3), new Tile(1,3), new Tile(1,4), new Tile(1,5)];
console.log("finding melds");
p.concealed = [new Tile(2,9), new Tile(2,9), new Tile(1,1), new Tile(1,2), new Tile(1,3)]; //, new Tile(1,2), new Tile(1,3), new Tile(1,3), new Tile(1,4), new Tile(1,5)];
console.log(p.melds());
