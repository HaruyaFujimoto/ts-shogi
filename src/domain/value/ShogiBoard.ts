import { Square } from "./Square";
import { SquarePosition } from "./SquarePosition";
import { range } from "../service/utils";

export interface ShogiBoard {
  [key: string]: { [key: string]: Square };
}

export class ShogiBoardGenerator {
  static create_shogi_board(): ShogiBoard {
    const shogi_board: ShogiBoard = {};
    const file_length = 9;
    const rank_length = 9;
    for (let f of range(1, file_length)) {
      shogi_board[f] = {};
      for (let r of range(1, rank_length)) {
        const square_position = new SquarePosition(f, r);
        const square = new Square(square_position, null);
        shogi_board[f][r] = square;
      }
    }
    return shogi_board;
  }
}
