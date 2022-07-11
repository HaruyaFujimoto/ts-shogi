import { Diagram } from "../model/Diagram";
import { Piece } from "../value/Piece";
import { PiecesInShogiBoardAsArray, Rule } from "../model/Rule";
import { ShogiBoard } from "../value/ShogiBoard";
import { ShogiBoardFactory } from "./ShogiBoardFactory";
import { Player } from "../value/Player";
import { Turn } from "../value/Turn";

export class DiagramFactory {
  public default_diagram() {
    const turn = new Turn(Player.Sente);
    const shogi_board: ShogiBoard = this._deploy_pieces_into_shogi_board(
      Rule.InitialPiecePosition
    );
    // const piece_stands = this.create_new_piece_stand();
    const diagram = new Diagram(turn, shogi_board);
    return diagram;
  }

  private _deploy_pieces_into_shogi_board(piecess: PiecesInShogiBoardAsArray) {
    const shogi_board: ShogiBoard =
      new ShogiBoardFactory().create_shogi_board();
    piecess.map((pieces: (Piece | null)[], i) => {
      pieces.map((piece: Piece | null, j) => {
        if (piece) {
          const f = i + 1;
          const r = j + 1;
          shogi_board[f][r].put_piece(piece);
        }
      });
    });
    return shogi_board;
  }
}
