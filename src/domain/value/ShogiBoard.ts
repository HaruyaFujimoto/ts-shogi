import { Square } from "./Square";
import { SquarePosition } from "./SquarePosition";
import { range } from "../service/utils";

export class ShogiBoard {
  public value: {[key:string]:{[key:string]: Square}} = {};
  constructor() {
  }

  static generate_shogi_board(file_length: number, rank_length: number) {
    const shogi_board = new ShogiBoard();
    for(let f  of range(1, file_length)) {
      shogi_board.value[f] = {};
      for(let r of range(1, rank_length)) {
        const square_position = new SquarePosition(f, r);
        const square = new Square(square_position, null);
        shogi_board.value[f][r] = square;
      }
    }
    return shogi_board;
  }
}
