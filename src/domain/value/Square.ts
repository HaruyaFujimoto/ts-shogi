import { SquarePosition } from "./SquarePosition";
import { Piece } from "./Piece";

export class Square {
  constructor(
    public readonly position: SquarePosition,
    private value: Piece | null,
    ) {}

  public set_piece(piece: Piece | null) {
    this.value = piece;
  }
  get piece(): Piece | null {
    return this.value;
  }
}
