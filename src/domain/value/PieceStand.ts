import { PlayerType } from "./Player";
import { Piece } from "./Piece";

export class PieceStand {
  constructor(public readonly master: PlayerType, public pieces: Piece[]) {}
}
