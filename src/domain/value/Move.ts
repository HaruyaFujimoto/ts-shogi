import { PieceStand } from "../model/PieceStand";
import { Piece, PiecePosition } from "./Piece";
import { Square } from "./Square";

export class Move {
  public readonly from: PiecePosition;
  private constructor(
    public readonly piece: Piece,
    public readonly to: Square,
    public readonly promotion: boolean,
  ) {
    this.from = piece.piece_position;
  }

  public static factory(diagram, from, to, promotion) {
    
  }
}
