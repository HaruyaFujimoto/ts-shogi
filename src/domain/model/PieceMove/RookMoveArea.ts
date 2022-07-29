import { PlayerType } from "../../value/Player";
import { SquarePosition } from "../../value/SquarePosition";
import { FileRank } from "../FileRank";
import { IPlainPieceMoveArea } from "./PlainPieceMove";

export class RookMoveArea implements IPlainPieceMoveArea {
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
    // 縦の移動範囲
    FileRank.numbers.map((rank) => {
      if (rank != current_rank) {
        square_position_list.push(new SquarePosition(current_file, rank));
      }
    });
    // 横の移動範囲
    FileRank.numbers.map((file) => {
      if (file != current_file) {
        square_position_list.push(new SquarePosition(file, current_rank));
      }
    });
    return square_position_list;
  }
}
