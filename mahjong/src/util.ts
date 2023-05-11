import {Tile,Honor} from './tile';
import Meld from './meld';
import {Naki} from './meld';

export default class Util {

  static createMelds(tiles: Tile[]) : Meld[][] {
    return findMelds(tiles);
  }

  static checkTenpai(tiles: Tile[]) : Tile[] {
    // remove a pair
    // remove mentsu
    // remove taatsu
    // repeat for all possible combinations

    let agari : Tile[] = [];

    // Chiitoitsu

    // for a typical hand
    
    // remove a pair
    for (let p1 = 0; p1 < tiles.length-1; p1++) {
    for (let p2 = p1+1; p2 < tiles.length; p2++) {
      if (p1 == p2) { continue; } // skip pairing with self
      if (!tiles[p1].equals(tiles[p2])) { continue; } // skip non-pairs
      // make copy of hand
      let pairless = [...tiles];
      // remove pair
      pairless.splice(p1,1);
      pairless.splice(p2-1,1);
      agari = agari.concat(findTenpaiAgariRmMelds(pairless));
    }
    }
    // try without removing pair 
    agari = agari.concat(findTenpaiAgariRmMelds([...tiles]));

    // return only unique agari
    return agari.filter((v,i,a) => {
      for (let j = 0; j < a.length; j++) {
        if (a[j].equals(v)) {
          return i === j;
        }
      }
    });
  }

  static fu(concealed : Meld[], revealed : Meld[]) : number {
    let fu = 20;
    // go through open melds
    for (let i = 0; i < revealed.length; i++) {
      let meld = revealed[i];
      if (meld.type == Naki.Pon) {
        if (meld.tile.isJihai()) {
          fu += 8;
        }
        else {
          fu += 4;
        }
      }
      else if (meld.type == Naki.Minkan) {
        if (meld.tile.isJihai()) {
          fu += 16;
        }
        else {
          fu += 8;
        }
      }
    }
    // go through concealed melds
    
    return fu;
  }
}

// finds tenpai (if it exists) by removing melds
function findTenpaiAgariRmMelds(tiles : Tile[]) : Tile[] {
  let agari : Tile[] = [];
  // return nothing if no tiles are given
  if (tiles.length == 0) {
    return [];
  }
  // if only 1 left, the agari is a part of a pair, this is invalid
  if (tiles.length == 1) {
    return [];
  }
  // if only 2 left, check if it's in Taatsu (waiting on a third tile)
  if (tiles.length == 2) {
    return Tile.checkTaatsu(tiles[0], tiles[1]);
  }
  // if 3 or more left, try combinations of tiles to make melds for removal
  for (let m1 = 0; m1 < tiles.length-2; m1++) {
  for (let m2 = m1+1; m2 < tiles.length-1; m2++) {
  for (let m3 = m2+1; m3 < tiles.length; m3++) {
    // if a valid meld, remove and recurse
    if (Tile.isKoutsu(tiles[m1],tiles[m2],tiles[m3]) || Tile.isShuntsu(tiles[m1],tiles[m2],tiles[m3])) {
      let subset = [...tiles];
      subset.splice(m1,1);
      subset.splice(m2-1,1);
      subset.splice(m3-2,1);
      agari = agari.concat(findTenpaiAgariRmMelds(subset));
    }
  }
  }
  }
  return agari;
}

// finds melds of a concealed hand (has a pair)
function findMelds(tiles : Tile[]) : Meld[][] {
  let candidateHands : Meld[][] = [];
  // get pair
  for (let p1 = 0; p1 < tiles.length; p1++) {
  for (let p2 = p1+1; p2 < tiles.length; p2++) {
    // if not equal, move on to next potential pair
    if (!tiles[p1].equals(tiles[p2])) {
      continue;
    }
    // if equal, start finding melds
    let subset = [...tiles];
    subset.splice(p1,1);
    subset.splice(p2-1,1);
    candidateHands = candidateHands.concat(findMeldsNoPair(subset,[]));
  }
  }

  return candidateHands;
}

// find melds within triplets (no pair)
function findMeldsNoPair(tiles : Tile[], hand: Meld[]) : Meld[][] {
  console.log('tiles:', tiles, '\nmelds:', hand)
  if (tiles.length == 0) {
    return [hand];
  }
  if (tiles.length < 3) {
    return [];
  }
  let candidateHands : Meld[][] = [];
  for (let m1 = 0; m1 < tiles.length-2; m1++) {
  for (let m2 = m1+1; m2 < tiles.length-1; m2++) {
  for (let m3 = m2+1; m3 < tiles.length; m3++) {
    // if a valid meld, remove and recurse
    if (Tile.isKoutsu(tiles[m1],tiles[m2],tiles[m3]) || Tile.isShuntsu(tiles[m1],tiles[m2],tiles[m3])) {
      // remove from available tiles to check
      let subset = [...tiles];
      subset.splice(m1,1);
      subset.splice(m2-1,1);
      subset.splice(m3-2,1);
      if (Tile.isKoutsu(tiles[m1], tiles[m2], tiles[m3])) {
        hand.push(new Meld(tiles[m1],Naki.Pon,-1));
      }
      else if (Tile.isShuntsu(tiles[m1], tiles[m2], tiles[m3])) {
        let firstTile = Tile.sort([tiles[m1], tiles[m2], tiles[m3]])[0];
        hand.push(new Meld(firstTile, Naki.Chii,-1)); // placeholder
      }
      candidateHands = candidateHands.concat(findMeldsNoPair(subset, hand));
    }
  }
  }
  }
  return candidateHands;
}
