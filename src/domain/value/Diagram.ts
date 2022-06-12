import { ShogiBoard } from "./ShogiBoard";
import { PieceStand } from "./PieceStand";
import { PlayerType } from "./Player";


export class Diagram {
  static readonly default_diagram = (
    () => {

    }
  )();
  constructor(
    public shogi_board: ShogiBoard,
    public piece_in_hands: Map<PlayerType,PieceStand>,
  ){}
}
