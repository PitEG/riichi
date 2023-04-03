import Game from './src/game';
import {Tile, Suit} from './src/tile';

let thing = 'hi'
let game = new Game();
console.log(game.wall)
console.log(game.deadWall)

console.log((new Tile(Suit.Pinzu, 8)).nameEN());
console.log((new Tile(Suit.Souzu, 9)).dora().nameEN());
