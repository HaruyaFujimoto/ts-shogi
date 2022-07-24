// import { Diagram } from "../value/Diagram";
import { Piece } from "../value/Piece";
// import { ShogiBoard } from "../value/ShogiBoard";

/**
 * This Type seems to be [0~8][0~8] as [file][rank]
 */
export type PiecesInShogiBoardAsArray = (Piece | null)[][];

export class Rule {
  // [file][rank]: piece
  static readonly InitialPieceMoveFrom: PiecesInShogiBoardAsArray = [
    [
      // file 1
      new Piece("Lance", "Gote"),
      null,
      new Piece("Pawn", "Gote"),
      null,
      null,
      null,
      new Piece("Pawn", "Sente"),
      null,
      new Piece("Lance", "Sente"),
    ],
    [
      // file 2
      new Piece("kNight", "Gote"),
      new Piece("Bishop", "Gote"),
      new Piece("Pawn", "Gote"),
      null,
      null,
      null,
      new Piece("Pawn", "Sente"),
      new Piece("Rook", "Sente"),
      new Piece("kNight", "Sente"),
    ],
    [
      // file 3
      new Piece("Silver", "Gote"),
      null,
      new Piece("Pawn", "Gote"),
      null,
      null,
      null,
      new Piece("Pawn", "Sente"),
      null,
      new Piece("Silver", "Sente"),
    ],
    [
      // file 4
      new Piece("Gold", "Gote"),
      null,
      new Piece("Pawn", "Gote"),
      null,
      null,
      null,
      new Piece("Pawn", "Sente"),
      null,
      new Piece("Gold", "Sente"),
    ],
    [
      // file 5
      new Piece("King", "Gote"),
      null,
      new Piece("Pawn", "Gote"),
      null,
      null,
      null,
      new Piece("Pawn", "Sente"),
      null,
      new Piece("King", "Sente"),
    ],
    [
      // file 6
      new Piece("Gold", "Gote"),
      null,
      new Piece("Pawn", "Gote"),
      null,
      null,
      null,
      new Piece("Pawn", "Sente"),
      null,
      new Piece("Gold", "Sente"),
    ],
    [
      // file 7
      new Piece("Silver", "Gote"),
      null,
      new Piece("Pawn", "Gote"),
      null,
      null,
      null,
      new Piece("Pawn", "Sente"),
      null,
      new Piece("Silver", "Sente"),
    ],
    [
      // file 8
      new Piece("kNight", "Gote"),
      new Piece("Rook", "Gote"),
      new Piece("Pawn", "Gote"),
      null,
      null,
      null,
      new Piece("Pawn", "Sente"),
      new Piece("Bishop", "Sente"),
      new Piece("kNight", "Sente"),
    ],
    [
      // file 9
      new Piece("Lance", "Gote"),
      null,
      new Piece("Pawn", "Gote"),
      null,
      null,
      null,
      new Piece("Pawn", "Sente"),
      null,
      new Piece("Lance", "Sente"),
    ],
  ];
}
