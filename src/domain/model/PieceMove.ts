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

  constructor(
    private _piece_type: PieceType,
    private current_position: SquarePosition,
    // private _diagram: Diagram,
  ) {}

  //
  public getCanMoveArea(): SquarePosition[] {
    const is_one_square_piece = Object.keys(
      PieceMove.OneSquareMoveArea
    ).includes(this._piece_type);
    if (is_one_square_piece) {
      return this._getSquarePotisionForOneSquare(this._piece_type, this.current_position);
    }
    if (this._piece_type == "Rook") {
      return this._getSquarePotisionForRook(this.current_position);
    }
    if (this._piece_type == "Bishop") {
      return this._getSquarePotisionForBishop(this.current_position);
    }
    if (this._piece_type == "Lance") {
      return this._getSquarePotisionForLance(this.current_position);
    }
    if (this._piece_type == "kNight") {
      return this._getSquarePotisionForkNight(this.current_position);
    }
    return [];
  }

  private _getSquarePotisionForOneSquare(piece_type: PieceType, current_position: SquarePosition): SquarePosition[] {
    // specific piece props
    const specific_piece_can_move_area =
      PieceMove.OneSquareMoveArea[piece_type];
    const current_file = current_position.file;
    const current_rank = current_position.rank;
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

  private _getSquarePotisionForRook(current_position: SquarePosition): SquarePosition[] {
    const square_position_list: SquarePosition[] = [];
    const current_file = current_position.file;
    const current_rank = current_position.rank;
    // 縦の移動範囲
    FileRank.numbers.map( (rank) => {
      if (rank != current_rank) {
        square_position_list.push(new SquarePosition(current_file, rank));
      }
    });
    // 横の移動範囲
    FileRank.numbers.map( (file) => {
      if (file != current_file) {
        square_position_list.push(new SquarePosition(file, current_rank));
      }
    });
    return square_position_list;
  }

  private _getSquarePotisionForBishop(current_position: SquarePosition): SquarePosition[] {
    const square_position_list: SquarePosition[] = [];
    const current_file = current_position.file;
    const current_rank = current_position.rank;
    // 右上から左下への移動範囲
    let base_file_as_slash = current_file - Math.min(current_file, current_rank) + 1;
    let base_rank_as_slash = current_rank - Math.min(current_file, current_rank) + 1;
    if (base_file_as_slash != current_file) {
      square_position_list.push(new SquarePosition(base_file_as_slash as FileRankNumber, base_rank_as_slash as FileRankNumber));
    }
    base_file_as_slash += 1;
    base_rank_as_slash += 1;
    while (FileRank.is_in_file_rank_number(base_file_as_slash, base_rank_as_slash)) {
      if (base_file_as_slash != current_file) {
        square_position_list.push(new SquarePosition(base_file_as_slash as FileRankNumber, base_rank_as_slash as FileRankNumber));
      }
      base_file_as_slash += 1;
      base_rank_as_slash += 1;
    }
    // 右下から左上への移動範囲
    let base_file_as_back_slash = current_file - Math.min(current_file - 1, 9 - current_rank);
    let base_rank_as_back_slash = current_rank + Math.min(current_file - 1, 9 - current_rank);
    if (base_file_as_back_slash != current_file) {
      square_position_list.push(new SquarePosition(base_file_as_back_slash as FileRankNumber, base_rank_as_back_slash as FileRankNumber));
    }
    base_file_as_back_slash += 1;
    base_rank_as_back_slash -= 1;
    while (FileRank.is_in_file_rank_number(base_file_as_back_slash, base_rank_as_back_slash)) {
      if (base_file_as_back_slash != current_file) {
        square_position_list.push(new SquarePosition(base_file_as_back_slash as FileRankNumber, base_rank_as_back_slash as FileRankNumber));
      }
      base_file_as_back_slash += 1;
      base_rank_as_back_slash -= 1;
    }
    return square_position_list;
  }

  private _getSquarePotisionForLance(current_position: SquarePosition): SquarePosition[] {
    const square_position_list: SquarePosition[] = [];
    const current_file = current_position.file;
    const current_rank = current_position.rank;
    return square_position_list;

  }

  private _getSquarePotisionForkNight(current_position: SquarePosition): SquarePosition[] {
    const square_position_list: SquarePosition[] = [];
    const current_file = current_position.file;
    const current_rank = current_position.rank;
    return square_position_list;

  }

}
