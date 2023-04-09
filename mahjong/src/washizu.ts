export default class Washizu {
  concealedTiles: number[];

  constructor(ids : number[]) {
    this.concealedTiles = ids;
  }

  isConcealed(id : number) : boolean {
    for(let i = 0; i < this.concealedTiles.length; i++) {
      if (this.concealedTiles[i] == id) {
        return true;
      }
    }
    return false;
  }
}
