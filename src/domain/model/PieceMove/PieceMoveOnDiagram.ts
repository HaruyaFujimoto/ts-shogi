import { PieceMoveAreaFactory } from "../../service/PlainPieceMoveAreaFactory";
import { SquarePosition } from "../../value/SquarePosition";
import { Diagram } from "../Diagram";

export class PieceMoveOnDiagram {
  // static methods for
  static get_piece_master_by_current_position_and_diagram(
    current_position: SquarePosition,
    diagram: Diagram
  ) {
    const { file, rank } = current_position;
    const piece = diagram.shogi_board[file][rank].piece;
    if (!piece) {
      console.error(diagram.diagram_to_string);
      throw Error(`There is no piece, in file: ${file}, rank: ${rank}`);
    }
    return piece.master;
  }

  // 効きの止まる場所を取得し、そこまでの配列を返す関数、足の長い駒に使う
  static sliece_in_where_can_move_on_diagram_for_long_piece(
    square_position_list: SquarePosition[],
    current_position: SquarePosition,
    diagram: Diagram
  ) {
    const master = this.get_piece_master_by_current_position_and_diagram(
      current_position,
      diagram
    );
    const square_has_piece = (square_position: SquarePosition) => {
      const { file, rank } = square_position;
      return !!diagram.shogi_board[file][rank].piece;
    };
    const index = square_position_list.findIndex(square_has_piece);
    // 効きを遮る駒が存在しない場合
    if (index < 0) {
      return square_position_list;
    }
    const { file, rank } = square_position_list[index];
    const piece_in_current_position = diagram.shogi_board[file][rank].piece;
    if (piece_in_current_position?.master == master) {
      return square_position_list.slice(0, index);
    }
    return square_position_list.slice(0, index + 1);
  }

  // 効きの止まる場所を取得し、そこまでの配列を返す関数、1マスの範囲で移動する駒に使う
  static filter_in_in_where_can_move_on_diagram_for_one_square_piece(
    square_position_list: SquarePosition[],
    diagram: Diagram
  ): SquarePosition[] {
    const square_position_not_has_masters_piece = (
      square_position: SquarePosition
    ) => {
      const { file, rank } = square_position;
      const piece = diagram.shogi_board[file][rank].piece;
      return !(piece?.master == diagram.turn);
    };
    const result_list: SquarePosition[] = square_position_list.filter(
      square_position_not_has_masters_piece
    );
    return result_list;
  }

  constructor(
    private _current_position: SquarePosition,
    private _diagram: Diagram
  ) {}

  //
  public getCanMoveArea(): SquarePosition[] {
    const square_positions: SquarePosition[] = PieceMoveAreaFactory.factory(
      this._piece.type
    ).get_square_positions_as_on_diagram(this._current_position, this._diagram);
    return square_positions;
  }

  private get _piece() {
    const { file, rank } = this._current_position;
    const piece = this._diagram.shogi_board[file][rank].piece;
    if (!piece) {
      console.error(this._diagram.diagram_to_string);
      throw Error(`There is no piece, in file: ${file}, rank: ${rank}`);
    }
    return piece;
  }
}
