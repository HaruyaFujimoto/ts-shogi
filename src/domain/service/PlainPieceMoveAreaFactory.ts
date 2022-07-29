import { BishopMoveArea } from "../model/PieceMove/BishopMoveArea";
import { kNightMoveArea } from "../model/PieceMove/kNightMoveArea";
import { LanceMoveArea } from "../model/PieceMove/LanceMoveArea";
import { OneSquareMoveArea } from "../model/PieceMove/OneSquareMoveArea";
import { IPlainPieceMoveArea } from "../model/PieceMove/PlainPieceMove";
import { RookMoveArea } from "../model/PieceMove/RookMoveArea";
import { PieceType } from "../value/Piece";
import { PlayerType } from "../value/Player";
import { SquarePosition } from "../value/SquarePosition";

export class PlainPieceMoveAreaFactory {
  private static _make_class(piece_type: PieceType): IPlainPieceMoveArea {
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
    piece_type: PieceType,
    piece_master: PlayerType,
    current_position: SquarePosition
  ) {
    const plain_piece_move_area: IPlainPieceMoveArea =
      this._make_class(piece_type);

    return plain_piece_move_area.get_square_positions_as_plain(
      current_position,
      piece_master
    );
  }
}
