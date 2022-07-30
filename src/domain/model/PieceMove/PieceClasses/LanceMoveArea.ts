import { Player, PlayerType } from "../../../value/Player";
import { SquarePosition } from "../../../value/SquarePosition";
import { Diagram } from "../../Diagram";
import { FileRank } from "../../FileRank";
import { PieceMoveOnDiagram } from "../PieceMoveOnDiagram";
import { IPieceMoveArea } from "../PieceMoveAsPlain";

export class LanceMoveArea implements IPieceMoveArea {
  public get_square_positions_as_plain(
    current_position: SquarePosition,
    piece_master: PlayerType
  ): SquarePosition[] {
    const square_position_list: SquarePosition[] = [];
    const current_file = current_position.file;
    const current_rank = current_position.rank;
    FileRank.numbers.map((rank) => {
      square_position_list.push(new SquarePosition(current_file, rank));
    });

    return piece_master == Player.Sente
      ? square_position_list.slice(0, current_rank - 1)
      : square_position_list.slice(current_rank);
  }

  public get_square_positions_as_on_diagram(
    current_position: SquarePosition,
    diagram: Diagram,
  ): SquarePosition[] {
    const master = PieceMoveOnDiagram.get_piece_master_by_current_position_and_diagram(current_position, diagram);
    const square_position_list = this.get_square_positions_as_plain(current_position, master);
    return PieceMoveOnDiagram.sliece_in_where_can_move_on_diagram_for_long_piece(square_position_list, current_position, diagram);
  }
}
