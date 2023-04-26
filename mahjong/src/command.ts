import Board from './board';

export default class Command {
  name: string;
  do: (Board : Board) => void;
  undo: (Board : Board) => void;

  constructor(name: string,
              a: (Board : Board) => void, 
              b: (Board : Board) => void) {
    this.name = name; 
    this.do = a;
    this.undo = b;
  }

  static playerDraw(player : number) : Command {
    return new Command(
      `p${player} draw`,
      (Board : Board) => {
        Board.nextTile = Board.nextTile + 1;
        Board.players[0].concealed.push(Board.wall[0]);
        Board.wall.pop();
      },
      (Board: Board) => {
        Board.nextTile = Board.nextTile - 1;
      }
    );
  }
}

function parseCommand(command : string) : Command {
  command = JSON.parse(command);

  return Command.playerDraw(0);
}

