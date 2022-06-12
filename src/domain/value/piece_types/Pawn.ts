import { Piece } from "../Piece";

const is_promotable = true;
const is_promoted = false;

export class Pawn extends Piece {
  static readonly Type: string = "P";
  constructor() {
    super(
      is_promotable,
      is_promoted
    );
  }
}
