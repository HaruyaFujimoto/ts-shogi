import { PlayerType } from "./Player";
import { PiecePosition } from "./Piece";

export class Move {
  constructor(
    public readonly player_type: PlayerType,
    public readonly from: PiecePosition,
    public readonly to: PiecePosition,
    public readonly promotion: boolean,
  ) {}

}
