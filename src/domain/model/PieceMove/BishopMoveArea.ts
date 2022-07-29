import { FileRankNumber } from "../../value/FileRankNumber";
import { PlayerType } from "../../value/Player";
import { SquarePosition } from "../../value/SquarePosition";
import { FileRank } from "../FileRank";
import { IPlainPieceMoveArea } from "./PlainPieceMove";

export class BishopMoveArea implements IPlainPieceMoveArea {
  public get_square_positions_as_plain(
    current_position: SquarePosition,
    piece_master: PlayerType
  ): SquarePosition[] {
    (() => {
      piece_master;
    })();
    const square_position_list: SquarePosition[] = [];
    const current_file = current_position.file;
    const current_rank = current_position.rank;
    // 右上から左下への移動範囲
    let base_file_as_slash =
      current_file - Math.min(current_file, current_rank) + 1;
    let base_rank_as_slash =
      current_rank - Math.min(current_file, current_rank) + 1;
    if (base_file_as_slash != current_file) {
      square_position_list.push(
        new SquarePosition(
          base_file_as_slash as FileRankNumber,
          base_rank_as_slash as FileRankNumber
        )
      );
    }
    base_file_as_slash += 1;
    base_rank_as_slash += 1;
    while (
      FileRank.is_in_file_rank_number(base_file_as_slash, base_rank_as_slash)
    ) {
      if (base_file_as_slash != current_file) {
        square_position_list.push(
          new SquarePosition(
            base_file_as_slash as FileRankNumber,
            base_rank_as_slash as FileRankNumber
          )
        );
      }
      base_file_as_slash += 1;
      base_rank_as_slash += 1;
    }
    // 右下から左上への移動範囲
    let base_file_as_back_slash =
      current_file - Math.min(current_file - 1, 9 - current_rank);
    let base_rank_as_back_slash =
      current_rank + Math.min(current_file - 1, 9 - current_rank);
    if (base_file_as_back_slash != current_file) {
      square_position_list.push(
        new SquarePosition(
          base_file_as_back_slash as FileRankNumber,
          base_rank_as_back_slash as FileRankNumber
        )
      );
    }
    base_file_as_back_slash += 1;
    base_rank_as_back_slash -= 1;
    while (
      FileRank.is_in_file_rank_number(
        base_file_as_back_slash,
        base_rank_as_back_slash
      )
    ) {
      if (base_file_as_back_slash != current_file) {
        square_position_list.push(
          new SquarePosition(
            base_file_as_back_slash as FileRankNumber,
            base_rank_as_back_slash as FileRankNumber
          )
        );
      }
      base_file_as_back_slash += 1;
      base_rank_as_back_slash -= 1;
    }
    return square_position_list;
  }
}
