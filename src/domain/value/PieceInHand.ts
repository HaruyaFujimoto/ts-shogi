import { PlayerType } from "./Player";

// piece in hand is used for specify a piece's position
export class PieceInHand {
  constructor(
    public readonly master: PlayerType,
  ){}
}
