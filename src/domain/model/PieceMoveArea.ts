export type PieceDestination = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export class PieceMoveArea {
  constructor(public value: Set<PieceDestination>) {}
}
