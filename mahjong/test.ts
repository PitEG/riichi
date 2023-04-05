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
