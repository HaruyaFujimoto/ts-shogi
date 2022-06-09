import { SquarePosition } from "./SquarePosition";
import { Piece } from "./Piece";

export class Square {
  constructor(public value: Piece, public position: SquarePosition) {}
}
