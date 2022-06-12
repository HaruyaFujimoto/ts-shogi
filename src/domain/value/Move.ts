import { PlayerType } from "./Player";
import { PiecePosition } from "./Piece";

export class Move {
  constructor(
    private readonly player_type: PlayerType,
    private readonly from: PiecePosition,
    private readonly to: PiecePosition,
    private readonly promotion: boolean,
  ) {}

  get value(): object {
    return {
      player_type: this.player_type,
      from: this.from,
      to: this.to,
      promotion: this.promotion,
    };
  }
}
