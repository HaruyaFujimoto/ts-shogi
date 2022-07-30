import { Player, PlayerType } from "../../../value/Player";
import { SquarePosition } from "../../../value/SquarePosition";
import { Diagram } from "../../Diagram";
import { FileRank } from "../../FileRank";
import { PieceMoveOnDiagram } from "../PieceMoveOnDiagram";
import { IPieceMoveArea } from "../PieceMoveAsPlain";
import { FileRankNumber } from "../../../value/FileRankNumber";

const DirectionList = ["u", "d"] as const;
type Direction = typeof DirectionList[number];

export class LanceMoveArea implements IPieceMoveArea {
  public get_square_positions_as_plain(
    current_position: SquarePosition,
    piece_master: PlayerType
  ): SquarePosition[] {
    const direction: Direction = piece_master == Player.Sente ? "u" : "d";
    const square_position_list: SquarePosition[] =
      this._square_positions_by_direction(current_position, direction);
    return square_position_list;
  }

  public get_square_positions_as_on_diagram(
    current_position: SquarePosition,
    diagram: Diagram
  ): SquarePosition[] {
    const master =
      PieceMoveOnDiagram.get_piece_master_by_current_position_and_diagram(
        current_position,
        diagram
      );
    const square_position_list = this.get_square_positions_as_plain(
      current_position,
      master
    );
    return PieceMoveOnDiagram.sliece_in_where_can_move_on_diagram_for_long_piece(
      square_position_list,
      current_position,
      diagram
    );
  }

  private _square_positions_by_direction(
    current_position: SquarePosition,
    direction: Direction
  ): SquarePosition[] {
    const square_position_list: SquarePosition[] = [];
    const current_file = current_position.file as number;
    let current_rank = current_position.rank as number;
    let rank_direction: number;
    if (direction == "u") {
      rank_direction = -1;
    } else if (direction == "d") {
      rank_direction = 1;
    }
    const step = () => {
      current_rank += rank_direction;
    };
    step();
    while (FileRank.is_in_file_rank_number(current_file, current_rank)) {
      square_position_list.push(
        new SquarePosition(
          current_file as FileRankNumber,
          current_rank as FileRankNumber
        )
      );
      step();
    }
    return square_position_list;
  }
}
