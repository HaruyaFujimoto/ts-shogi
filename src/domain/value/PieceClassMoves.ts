/* eslint-disable */
export type PieceMoveArea = 1|2|3|4|6|7|8|9;

// one square pieces
export const King: PieceMoveArea[] = [
  7,8,9,
  4,  6,
  1,2,3,
];
export const Gold: PieceMoveArea[] = [
  7,8,9,
  4,  6,
    2,
];
export const Silver: PieceMoveArea[] = [
  7,8,9,

  1,  3,
];
export const Pawn: PieceMoveArea[] = [
    8,


];
// long range pieces
// export const Rook: PieceMoveArea[] = [
//   1,  3,

//   7,  9,
// ];
// export const Bishop: PieceMoveArea[] = [
//     2,
//   4,  6,
//     8,
// ];
// export const Lance: PieceMoveArea[] = [
//     2,


// ];
// // kNight
// export const kNight = [null];
