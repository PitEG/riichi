import Game from './game';

export default class Command {
  name: string;
  do: (game : Game) => void;
  undo: (game : Game) => void;

  constructor(name: string,
              a: (game : Game) => void, 
              b: (game : Game) => void) {
    this.name = name; 
    this.do = a;
    this.undo = b;
  }

  static playerDraw(player : number) : Command {
    return new Command(
      `p${player} draw`,
      (game : Game) => {
        console.log(game.deadWall);
        game.players[0].concealed.push(game.deadWall[0]);
        game.deadWall.pop();
      },
      (game: Game) => {
      }
    );
  }
}

