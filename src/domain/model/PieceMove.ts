import { SquarePosition } from "../value/SquarePosition";
// import { Diagram } from "../value/Diagram";
import { PieceType } from "../value/Piece";
import {
  PieceMoveArea,
  King,
  Rook,
  Bishop,
  Gold,
  Silver,
  kNight,
  Lance,
  Pawn,
} from "../value/PieceClassMoves";
import { FileRankNumber } from "../value/FileRankNumber";
import { FileRank } from "./FileRank";

export class PieceMove {
  static readonly OneSquareMoveArea: { [key: string]: PieceMoveArea[] } = {
    King,
    Gold,
    Silver,
    Pawn,
  };

  static readonly LongRangeDestination: { [key: string]: PieceMoveArea[] } = {
    Rook,
    Bishop,
    Lance,
  };

  static readonly kNight = {
    kNight,
  };

  constructor(
    private piece_type: PieceType,
    // private diagram: Diagram,
    private current_position: SquarePosition
  ) {}

  //
  public getCanMoveArea(): SquarePosition[] {
    const is_one_square_piece = Object.keys(
      PieceMove.OneSquareMoveArea
    ).includes(this.piece_type);
    if (is_one_square_piece) {
      return this.getSquarePotisionForOneSquare();
    }
    return [];
  }

  private getSquarePotisionForOneSquare(): SquarePosition[] {
    // specific piece props
    const specific_piece_can_move_area =
      PieceMove.OneSquareMoveArea[this.piece_type];
    const current_file = this.current_position.file;
    const current_rank = this.current_position.rank;
    // functions
    const piece_move_area_as_number = (number: PieceMoveArea): number[] => {
      const [file_destination, rank_destination] =
        PieceMove.getFileRankFromNumber(number);
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

  static getFileRankFromNumber(number: PieceMoveArea): number[] {
    const number_file_rank_map = {
      1: [1, -1],
      2: [0, -1],
      3: [-1, -1],
      4: [1, 0],
      6: [-1, 0],
      7: [1, 1],
      8: [0, 1],
      9: [-1, 1],
    };
    return number_file_rank_map[number];
  }
}
