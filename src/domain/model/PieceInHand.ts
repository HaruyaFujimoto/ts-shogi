import { Piece } from "./Piece";
import { PlayerType } from "./Player";

export class PieceInHand {
  constructor(public value: Piece[], public master: PlayerType) {}
}
