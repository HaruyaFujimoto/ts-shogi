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
    const piece_move_area_to_square_position = (
      number: PieceMoveArea
    ): SquarePosition => {
      const [file_destination, rank_destination] =
        PieceMove.getFileRankFromNumber(number);
      const file = current_file + file_destination;
      const rank = current_rank + rank_destination;
      const square_position = new SquarePosition(file, rank);
      // square_position_list.push(square_position);
      return square_position;
    };
    const remove_square_out_of_shogi_board = (
      square_position: SquarePosition
    ) => square_position.is_in_shogi_board;

    // result
    const square_position_list: SquarePosition[] = specific_piece_can_move_area
      .map(piece_move_area_to_square_position)
      .filter(remove_square_out_of_shogi_board);
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
