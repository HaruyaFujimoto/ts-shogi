import { ShogiBoard } from "../value/ShogiBoard";
import { Square } from "../value/Square";
import { SquarePosition } from "../value/SquarePosition";
import { range } from "./utils";

export class ShogiBoardFactory {
  public create_shogi_board(): ShogiBoard {
    const shogi_board: ShogiBoard = {};
    const file_length = 9;
    const rank_length = 9;
    for (const f of range(1, file_length)) {
      shogi_board[f] = {};
      for (const r of range(1, rank_length)) {
        const square_position = new SquarePosition(f, r);
        const square = new Square(square_position, null);
        shogi_board[f][r] = square;
      }
    }
    return shogi_board;
  }
}
