import { SquarePosition } from "../../value/SquarePosition";
import { PieceType } from "../../value/Piece";
import { PlayerType } from "../../value/Player";
import { PieceMoveAreaFactory } from "../../service/PlainPieceMoveAreaFactory";
import { Diagram } from "../Diagram";

export interface IPieceMoveArea {
  get_square_positions_as_plain: (
    current_position: SquarePosition,
    piece_master: PlayerType,
  ) => SquarePosition[];

  get_square_positions_as_on_diagram: (
    current_position: SquarePosition,
    diagram: Diagram,
  ) => SquarePosition[];
}

export class PieceMoveAsPlain {
  constructor(
    private _piece_type: PieceType,
    private current_position: SquarePosition,
    private _piece_master: PlayerType
  ) {}

  //
  public getCanMoveArea(): SquarePosition[] {
    const square_positions: SquarePosition[] =
      PieceMoveAreaFactory.factory(
        this._piece_type
      ).get_square_positions_as_plain(this.current_position, this._piece_master);
    return square_positions;
  }
}
