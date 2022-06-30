import { Piece, PiecePosition } from "./Piece";
import { PieceInHand } from "./PieceInHand";
import { Square } from "./Square";

export class Move {
  public readonly piece: Piece;
  constructor(
    public readonly from: PiecePosition,
    public readonly to: Square,
    public readonly promotion: boolean,
    piece?: Piece
  ) {
    if (from instanceof PieceInHand && !piece) {
      throw Error(
        "The move from piece_in_hand, argument 'piece' is necessary."
      );
    }
    if (from instanceof Square && !from.piece) {
      throw Error(
        `There is no piece!: ${from.position.file}${from.position.rank}`
      );
    }
    if (piece) {
      this.piece = piece;
    } else {
      this.piece = <Piece>(<Square>from).piece;
    }
  }
}
