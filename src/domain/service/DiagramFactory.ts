import { Diagram } from "../value/Diagram";
import { Piece } from "../value/Piece";
import { Rule } from "../model/Rule";
import { ShogiBoard } from "../value/ShogiBoard";

export class DiagramFactory {
  static default_diagram() {
    const shogi_board: ShogiBoard = new DiagramFactory().deploy_pieces_into_shogi_board(Rule.InitialPiecePosition);
    const diagram = new Diagram(shogi_board);
    return diagram;
  }

  constructor() {
  }

  private deploy_pieces_into_shogi_board(piecess: (Piece | null)[][]) {
    const shogi_board:ShogiBoard = {};
    piecess.map((pieces: (Piece | null)[], i) => {
      pieces.map((piece: Piece | null, j) => {
        if (piece) {
          const f = i + 1;
          const r = j + 1;
          shogi_board[f][r].piece = piece;
        }
      });
    });
    return shogi_board;
  }

}
