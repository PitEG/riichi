import Tile from './tile';

export default class Player {
  id: number;
  concealed: Tile[];
  revealed: [Tile[]];
}
