import { Diagram } from "../model/Diagram";
import { Piece } from "../value/Piece";
import { Rule } from "../model/Rule";
import { ShogiBoard } from "../value/ShogiBoard";
import { ShogiBoardFactory } from "./ShogiBoardFactory";
import { Player } from "../value/Player";
// import { Player, PlayerType, PlayerTypes } from "../value/Player";
// import { PieceStand, PieceStands } from "../value/PieceStand";
import { Turn } from "../value/Turn";

export class DiagramFactory {
  public default_diagram() {
    const turn = new Turn(Player.Sente);
    const shogi_board: ShogiBoard = this.deploy_pieces_into_shogi_board(
      Rule.InitialPiecePosition
    );
    // const piece_stands = this.create_new_piece_stand();
    const diagram = new Diagram(turn, shogi_board);
    return diagram;
  }

  private deploy_pieces_into_shogi_board(piecess: (Piece | null)[][]) {
    const shogi_board: ShogiBoard =
      new ShogiBoardFactory().create_shogi_board();
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

  // private create_new_piece_stand(): PieceStands {
  //   const default_piece_stands: PieceStands = new Map(
  //     PlayerTypes.map((player_type: PlayerType) => [
  //       player_type,
  //       new PieceStand(player_type, []),
  //     ])
  //   );
  //   return default_piece_stands;
  // }
}
