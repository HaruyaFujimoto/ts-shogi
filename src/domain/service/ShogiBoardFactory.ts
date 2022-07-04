import { FileRank } from "../value/FileRank";
import { ShogiBoard } from "../value/ShogiBoard";
import { Square } from "../value/Square";
import { SquarePosition } from "../value/SquarePosition";

export class ShogiBoardFactory {
  public create_shogi_board(): ShogiBoard {
    const shogi_board: ShogiBoard = {};
    // init two-dimensional
    FileRank.numbers.map(
      (file) => {
        shogi_board[file] = {};
      }
    );
    // create
    FileRank.map(
      (file, rank) => {
        const square_position = new SquarePosition(file, rank);
        const square = new Square(square_position, null);
        shogi_board[file][rank] = square;
      }
    );
    return shogi_board;
  }
}
