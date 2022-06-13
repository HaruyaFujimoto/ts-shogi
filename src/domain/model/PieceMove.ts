import { SquarePosition } from "../value/SquarePosition";
// import { Diagram } from "../value/Diagram";
import { PieceType } from "../value/Piece";


type PieceMoveArea = 1|2|3|4|6|7|8|9;

// one square pieces
const King: PieceMoveArea[] = [
  1,2,3,
  4,  6,
  7,8,9,
];
const Gold: PieceMoveArea[] = [
  1,2,3,
  4,  6,
    8,
];
const Silver: PieceMoveArea[] = [
  1,2,3,

  7,  9,
];
const Pawn: PieceMoveArea[] = [
    2,


];
// long range pieces
const Rook: PieceMoveArea[] = [
  1,  3,

  7,  9,
];
const Bishop: PieceMoveArea[] = [
    2,
  4,  6,
    8,
];
const Lance: PieceMoveArea[] = [
    2,


];
// kNight
const kNight = [null];


export class PieceMove {
  static readonly OneSquareMoveArea: {[key:string]: PieceMoveArea[]} = {
    King,
    Gold,
    Silver,
    Pawn,
  };
  static readonly LongRangeDestination: {[key:string]: PieceMoveArea[]} = {
    Rook,
    Bishop,
    Lance,
  }
  static readonly kNight = {
    kNight,
  }

  constructor(
    private piece_type: PieceType,
    // private diagram: Diagram,
    private current_position: SquarePosition,
  ){}

  //
  public getCanMoveArea(
    ): SquarePosition[] {
      const is_one_square_piece = Object.keys(PieceMove.OneSquareMoveArea).includes(this.piece_type);
      if (is_one_square_piece) {
        return this.getSquarePotisionForOneSquare();
      }
    return [];
  }

  private getSquarePotisionForOneSquare(): SquarePosition[] {
    const can_move_area = PieceMove.OneSquareMoveArea[this.piece_type];
    const current_file = this.current_position.file;
    const current_rank = this.current_position.rank;
    const square_position_list: SquarePosition[] = [];
    for(let number of can_move_area){
      const [file_destination, rank_destination] = PieceMove.getFileRankFromNumber(number);
      const file = current_file + file_destination;
      const rank = current_rank + rank_destination;
      if (SquarePosition.checkNumbers(file,rank)) {
        const square_position = new SquarePosition(file, rank);
        square_position_list.push(square_position);
      }
    }
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
