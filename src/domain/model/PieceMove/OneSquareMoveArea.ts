import { FileRankNumber } from "../../value/FileRankNumber";
import { PieceType } from "../../value/Piece";
import {
  OneSquareArea,
  King,
  Gold,
  Silver,
  Pawn,
} from "../../value/PieceClassMoves";
import { PlayerType, Player } from "../../value/Player";
import { SquarePosition } from "../../value/SquarePosition";
import { FileRank } from "../FileRank";
import { IPlainPieceMoveArea } from "./PlainPieceMove";

export class OneSquareMoveArea implements IPlainPieceMoveArea {
  static readonly OneSquareMoveArea: { [key: string]: OneSquareArea[] } = {
    King,
    Gold,
    Silver,
    Pawn,
  };

  static getFileRankFromNumber(number: OneSquareArea): number[] {
    const number_file_rank_map = {
      9: [-1, -1],
      6: [-1, 0],
      3: [-1, 1],
      8: [0, -1],
      2: [0, 1],
      // 5: [],
      7: [1, -1],
      4: [1, 0],
      1: [1, 1],
    };
    return number_file_rank_map[number];
  }

  constructor(private _piece_type: PieceType) {}

  public get_square_positions_as_plain(
    current_position: SquarePosition,
    piece_master: PlayerType
  ): SquarePosition[] {
    // specific piece props
    const specific_piece_can_move_area =
      piece_master == Player.Sente
        ? OneSquareMoveArea.OneSquareMoveArea[this._piece_type]
        : OneSquareMoveArea.OneSquareMoveArea[this._piece_type].map((area) => {
            return (10 - area) as OneSquareArea; // 後手番の時、移動可能範囲を上下左右逆にする
          });
    const current_file = current_position.file;
    const current_rank = current_position.rank;

    // functions
    const piece_move_area_as_number = (number: OneSquareArea): number[] => {
      const [file_destination, rank_destination] =
        OneSquareMoveArea.getFileRankFromNumber(number);
      const file_as_number: number = current_file + file_destination;
      const rank_as_number: number = current_rank + rank_destination;
      // square_position_list.push(square_position);
      return [file_as_number, rank_as_number];
    };
    const remove_square_out_of_shogi_board = (
      file_rank_as_number: number[]
    ) => {
      const file_as_number: number = file_rank_as_number[0];
      const rank_as_number: number = file_rank_as_number[1];
      return FileRank.is_in_file_rank_number(file_as_number, rank_as_number);
    };
    const generate_square_position_from_number = (
      file_rank_as_number: number[]
    ) => {
      const file: FileRankNumber = FileRank.cast_number_to_file_rank(
        file_rank_as_number[0]
      );
      const rank: FileRankNumber = FileRank.cast_number_to_file_rank(
        file_rank_as_number[1]
      );
      return new SquarePosition(file, rank);
    };

    // result
    const square_position_list: SquarePosition[] = specific_piece_can_move_area
      .map(piece_move_area_as_number)
      .filter(remove_square_out_of_shogi_board)
      .map(generate_square_position_from_number);
    return square_position_list;
  }
}
