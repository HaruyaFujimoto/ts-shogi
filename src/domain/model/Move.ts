import { SquarePosition } from "./SquarePosition";
import { PlayerType } from "./Player";

export class Move {
  constructor(
    public player_type: PlayerType,
    public from: SquarePosition,
    public to: SquarePosition
  ) {}
}
