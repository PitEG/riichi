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
        game.nextTile = game.nextTile + 1;
        game.players[0].concealed.push(game.wall[0]);
        game.wall.pop();
      },
      (game: Game) => {
        game.nextTile = game.nextTile - 1;
      }
    );
  }
}

function parseCommand(command : string) : Command {
  command = JSON.parse(command);

  return Command.playerDraw(0);
}

