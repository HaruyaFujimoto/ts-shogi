import { SquarePosition } from "../../value/SquarePosition";
import { PieceType } from "../../value/Piece";
import { PlayerType } from "../../value/Player";
import { PlainPieceMoveAreaFactory } from "../../service/PlainPieceMoveAreaFactory";

export interface IPlainPieceMoveArea {
  get_square_positions_as_plain: (
    current_position: SquarePosition,
    piece_master: PlayerType
  ) => SquarePosition[];
}

export class PlainPieceMove {
  constructor(
    private _piece_type: PieceType,
    private current_position: SquarePosition,
    private _piece_master: PlayerType
  ) {}

  //
  public getCanMoveArea(): SquarePosition[] {
    const square_positions: SquarePosition[] =
      PlainPieceMoveAreaFactory.factory(
        this._piece_type,
        this._piece_master,
        this.current_position
      );
    return square_positions;
  }
}
