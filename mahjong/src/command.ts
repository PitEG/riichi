import Board from './board';
import Tile from './tile';
import Meld from './meld';

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

  // BASIC BOARD PROTOCOL

  // player draws and takes the new tile
  static playerDraw(player : number) : Command {
    return new Command(
      `p${player} draws`,
      (board : Board) => {
        board.nextTile++;
        board.players[0].concealed.push(board.wall[board.nextTile]);
      },
      (board: Board) => {
        board.nextTile--;
        board.players[0].concealed.pop();
      }
    );
  }

  // give a player a tile
  static givePlayerTile(player : number, tile : Tile) : Command {
    return new Command(
      `p${player} is given ${tile}`,
      (board : Board) => {
        board.players[0].concealed.push(tile);
      },
      (board : Board) => {
        board.players[0].concealed.pop();
      },
    );
  }

  // player removes a tile from their concealed hand
  static playerDiscard(player : number, tile : Tile) : Command {
    return new Command(
      `p${player} discards ${tile.nameEN()}`,
      (board : Board) => {
        // remove tile from player's hand
        let hand = board.players[player].concealed;
        let discardedTile : Tile | null = null;
        for (let i = 0; i < hand.length; i++) {
          if (hand[i].equals(tile)) {
            discardedTile = hand.splice(i,1)[0];
            break;
          }
        }
        
        // place in discard zone
        if (discardedTile != null) {
          board.players[player].discards.push(discardedTile);
        }
      },
      (board : Board) => {
      },
    );
  }

  // increase the revealed dora counter
  static revealDora() : Command {
    return new Command(
      `revealing new dora`,
      (board : Board) => {
        board.dora++;
      },
      (board : Board) => {
        board.dora--;
      },
    );
  }

  // player takes another player's recent discard for a meld
  static call(srcPlayer: number, dstPlayer : number, meld: Meld) : Command {
    return new Command(
      ``,
      (board : Board) => {
      },
      (board : Board) => {
      },
    );
  }

  // player takes another player's recent discard for a win
  static callRon(srcPlayer : number, dstPlayer : number) : Command {
    return new Command(
      ``,
      (board : Board) => {
      },
      (board : Board) => {
      },
    );
  }

  // player can call tsumo and win
  static callTsumo(player : number) : Command {
    return new Command(
      ``,
      (board : Board) => {
      },
      (board : Board) => {
      },
    );
  }

  // whole game is ended
  static endGame() : Command {
    return new Command(
      ``,
      (board : Board) => {
      },
      (board : Board) => {
      },
    );
  }

  // can be negative or positive
  static givePoints(player : number, points: number) {
    return new Command(
      ``,
      (board : Board) => {
        board.players[player].score += points;
      },
      (board : Board) => {
        board.players[player].score -= points;
      },
    );
  }

  // reset board to make a new round
  static newRound() : Command {
    return new Command(
      ``,
      (board : Board) => {
      },
      (board : Board) => {
      },
    );
  }
}

// testing 
function parseCommand(command : string) : Command {
  command = JSON.parse(command);

  return Command.playerDraw(0);
}

