// const PieceMoveTypeList = [
//   "OneSquare",
//   "LongRange",
//   "Keima",
// ];

export type PieceDestination = 1 | 2 | 3 | 4 | 6 | 7 | 8 | 9;

export class PieceMoveArea {
  constructor(public readonly value: Set<PieceDestination>) {}
}
