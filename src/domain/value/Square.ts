import { SquarePosition } from "./SquarePosition";
import { Piece } from "./Piece";

export type FileRank = [number, number];

export class Square {
  constructor(
    public readonly position: SquarePosition,
    public piece: Piece | null
  ) {}
}
