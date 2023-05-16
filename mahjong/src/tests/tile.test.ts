import Tile from '../tile';

test('simple tile equals', () => {
  expect((new Tile(1,1)).equals(new Tile(1,1))).toBe(true);
  expect((new Tile(1,2)).equals(new Tile(1,1))).toBe(false);
  expect((new Tile(2,1)).equals(new Tile(1,1))).toBe(false);
});

