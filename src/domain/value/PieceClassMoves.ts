/* eslint-disable */
export type PieceMoveArea = 1|2|3|4|6|7|8|9;

// one square pieces
export const King: PieceMoveArea[] = [
  1,2,3,
  4,  6,
  7,8,9,
];
export const Gold: PieceMoveArea[] = [
  1,2,3,
  4,  6,
    8,
];
export const Silver: PieceMoveArea[] = [
  1,2,3,

  7,  9,
];
export const Pawn: PieceMoveArea[] = [
    2,


];
// long range pieces
export const Rook: PieceMoveArea[] = [
  1,  3,

  7,  9,
];
export const Bishop: PieceMoveArea[] = [
    2,
  4,  6,
    8,
];
export const Lance: PieceMoveArea[] = [
    2,


];
// kNight
export const kNight = [null];
