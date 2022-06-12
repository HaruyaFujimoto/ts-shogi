import { Square } from "./Square";
import { SquarePosition } from "./SquarePosition";
import { File, Rank } from "./SquarePosition";

export class ShogiBoard {
  constructor(public value: Square[][] = []) {}

  static generate_shogi_board(file: File, rank:Rank) {
    const range = (n: number):number[] => [new Array(n)].map( (_, i) => i+1)
    const shogi_board = new ShogiBoard();
    for(let f  of range(file)) {
      for(let r of range(rank)) {
        const square_position = new SquarePosition(<File>f, <Rank>r);
        const square = new Square(square_position, null);
        shogi_board.value[f][r] = square;
      }
    }
    return shogi_board;
  }
}
