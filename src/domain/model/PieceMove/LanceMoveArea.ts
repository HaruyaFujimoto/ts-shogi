import { Player, PlayerType } from "../../value/Player";
import { SquarePosition } from "../../value/SquarePosition";
import { FileRank } from "../FileRank";
import { IPlainPieceMoveArea } from "./PlainPieceMove";

export class LanceMoveArea implements IPlainPieceMoveArea {
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
}
