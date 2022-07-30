import { RookMoveArea } from "../model/PieceMove/PieceClasses/RookMoveArea";
import { BishopMoveArea } from "../model/PieceMove/PieceClasses/BishopMoveArea";
import { kNightMoveArea } from "../model/PieceMove/PieceClasses/kNightMoveArea";
import { LanceMoveArea } from "../model/PieceMove/PieceClasses/LanceMoveArea";
import { OneSquareMoveArea } from "../model/PieceMove/PieceClasses/OneSquareMoveArea";
import { IPieceMoveArea } from "../model/PieceMove/PieceMoveAsPlain";
import { PieceType } from "../value/Piece";

export class PieceMoveAreaFactory {
  private static _make_class(piece_type: PieceType): IPieceMoveArea {
    const is_one_square_piece = Object.keys(
      OneSquareMoveArea.OneSquareMoveArea
    ).includes(piece_type);
    if (is_one_square_piece) {
      return new OneSquareMoveArea(piece_type);
    }
    if (piece_type == "Rook") {
      return new RookMoveArea();
    }
    if (piece_type == "Bishop") {
      return new BishopMoveArea();
    }
    if (piece_type == "Lance") {
      return new LanceMoveArea();
    }
    if (piece_type == "kNight") {
      return new kNightMoveArea();
    }
    throw Error(
      `The value "${piece_type}" is not included in piece type list.`
    );
  }

  static factory(
    piece_type: PieceType
  ): IPieceMoveArea {
    const piece_move_area: IPieceMoveArea =
      this._make_class(piece_type);
    return piece_move_area;
  }
}
