import { FileRankNumber } from "../../value/FileRankNumber";
import { Player, PlayerType } from "../../value/Player";
import { SquarePosition } from "../../value/SquarePosition";
import { FileRank } from "../FileRank";
import { IPlainPieceMoveArea } from "./PlainPieceMove";

export class kNightMoveArea implements IPlainPieceMoveArea {
  public get_square_positions_as_plain(
    current_position: SquarePosition,
    piece_master: PlayerType
  ): SquarePosition[] {
    const square_position_list: SquarePosition[] = [];
    const current_file = current_position.file;
    const current_rank = current_position.rank;
    const target_file_pair = [current_file - 1, current_file + 1];
    const target_rank =
      piece_master == Player.Sente ? current_rank - 2 : current_rank + 2;
    target_file_pair.map((target_file) => {
      if (FileRank.is_in_file_rank_number(target_file, target_rank)) {
        square_position_list.push(
          new SquarePosition(
            target_file as FileRankNumber,
            target_rank as FileRankNumber
          )
        );
      }
    });
    return square_position_list;
  }
}
