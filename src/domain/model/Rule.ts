// import { Diagram } from "../value/Diagram";
import { Piece } from "../value/Piece";
import { PieceSet } from "./PieceSet";
import { SquarePosition } from "../value/SquarePosition";
import { Square } from "../value/Square";
// import { ShogiBoard } from "../value/ShogiBoard";

/**
 * This Type seems to be [0~8][0~8] as [file][rank]
 */

export class Rule {
  // [file][rank]: piece
  static readonly InitialPieceSet: PieceSet = new PieceSet([
    // file 1
    new Piece("Lance", "Gote", new Square(new SquarePosition(1, 1))),
    new Piece("Pawn", "Gote", new Square(new SquarePosition(1, 3))),
    new Piece("Pawn", "Sente", new Square(new SquarePosition(1, 7))),
    new Piece("Lance", "Sente", new Square(new SquarePosition(1, 9))),
    // file 2
    new Piece("kNight", "Gote", new Square(new SquarePosition(2, 1))),
    new Piece("Bishop", "Gote", new Square(new SquarePosition(2, 2))),
    new Piece("Pawn", "Gote", new Square(new SquarePosition(2, 3))),
    new Piece("Pawn", "Sente", new Square(new SquarePosition(2, 7))),
    new Piece("Rook", "Sente", new Square(new SquarePosition(2, 8))),
    new Piece("kNight", "Sente", new Square(new SquarePosition(2, 9))),
    // file 3
    new Piece("Silver", "Gote", new Square(new SquarePosition(3, 1))),
    new Piece("Pawn", "Gote", new Square(new SquarePosition(3, 3))),
    new Piece("Pawn", "Sente", new Square(new SquarePosition(3, 7))),
    new Piece("Silver", "Sente", new Square(new SquarePosition(3, 9))),
    // file 4
    new Piece("Gold", "Gote", new Square(new SquarePosition(4, 1))),
    new Piece("Pawn", "Gote", new Square(new SquarePosition(4, 3))),
    new Piece("Pawn", "Sente", new Square(new SquarePosition(4, 7))),
    new Piece("Gold", "Sente", new Square(new SquarePosition(4, 9))),
    // file 5
    new Piece("King", "Gote", new Square(new SquarePosition(5, 1))),
    new Piece("Pawn", "Gote", new Square(new SquarePosition(5, 3))),
    new Piece("Pawn", "Sente", new Square(new SquarePosition(5, 7))),
    new Piece("King", "Sente", new Square(new SquarePosition(5, 9))),
    // file 6
    new Piece("Gold", "Gote", new Square(new SquarePosition(6, 1))),
    new Piece("Pawn", "Gote", new Square(new SquarePosition(6, 3))),
    new Piece("Pawn", "Sente", new Square(new SquarePosition(6, 7))),
    new Piece("Gold", "Sente", new Square(new SquarePosition(6, 9))),
    // file 7
    new Piece("Silver", "Gote", new Square(new SquarePosition(7, 1))),
    new Piece("Pawn", "Gote", new Square(new SquarePosition(7, 3))),
    new Piece("Pawn", "Sente", new Square(new SquarePosition(7, 7))),
    new Piece("Silver", "Sente", new Square(new SquarePosition(7, 9))),
    // file 8
    new Piece("kNight", "Gote", new Square(new SquarePosition(8, 1))),
    new Piece("Rook", "Gote", new Square(new SquarePosition(8, 2))),
    new Piece("Pawn", "Gote", new Square(new SquarePosition(8, 3))),
    new Piece("Pawn", "Sente", new Square(new SquarePosition(8, 7))),
    new Piece("Bishop", "Sente", new Square(new SquarePosition(8, 8))),
    new Piece("kNight", "Sente", new Square(new SquarePosition(8, 9))),
    // file 9
    new Piece("Lance", "Gote", new Square(new SquarePosition(9, 1))),
    new Piece("Pawn", "Gote", new Square(new SquarePosition(9, 3))),
    new Piece("Pawn", "Sente", new Square(new SquarePosition(9, 7))),
    new Piece("Lance", "Sente", new Square(new SquarePosition(9, 9))),
  ]);
}
