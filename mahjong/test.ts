import Game from './src/game';
import Command from './src/command';
import {Tile, Suit, Honor} from './src/tile';

let thing = 'hi'
let game = new Game();
console.log(game.wall)
console.log(game.deadWall)

console.log((new Tile(Suit.Pinzu, 8)).nameEN());
console.log((new Tile(Suit.Souzu, 9)).dora().nameEN());
console.log((new Tile(Suit.Kazehai, Honor.Ton)).dora().nameEN());

let c = Command.playerDraw(1);
game.play(c);
console.log(c.name);
console.log(game.players[0].concealed);
console.log(game.deadWall)
console.log(Tile.compare(new Tile(0,1),new Tile(1,1)));
console.log(Tile.compare(new Tile(0,1),new Tile(0,2)));
console.log(Tile.compare(new Tile(2,1),new Tile(0,2)));

console.log(Tile.isShuntsu(new Tile(0,1), new Tile(0,3), new Tile(0,2)));
console.log(Tile.isShuntsu(new Tile(0,1), new Tile(0,4), new Tile(0,2)));
console.log(Tile.isKoutsu(new Tile(1,1), new Tile(1,1), new Tile(1,1)));
console.log(Tile.isKoutsu(new Tile(0,1), new Tile(1,1), new Tile(1,1)));
console.log(Tile.isKoutsu(new Tile(1,1), new Tile(1,2), new Tile(1,1)));
