import { Piece, PiecePosition } from "./Piece";
import { PieceInHand } from "./PieceInHand";
import { Square } from "./Square";

export class Move {
  public readonly piece :Piece;
  constructor(
    public readonly from: PiecePosition,
    public readonly to: Square,
    public readonly promotion: boolean,
    piece?: Piece
  ) {
    if (from instanceof PieceInHand && ! piece) {
      throw Error("The move from piece_in_hand, argument 'piece' is necessary.");
    }
    if (from instanceof Square && ! from.piece) {
      throw Error(`There is no piece!: ${from.position.file}${from.position.rank}`);
    }
    if (piece) {
      this.piece = new Piece(piece.type, piece.master, piece.is_promoted);
    } else {
      const moved_piece = <Piece>(<Square>from).piece;
      this.piece = new Piece(moved_piece.type, moved_piece.master, moved_piece.is_promoted);
    }
  }
}
