import { Piece } from "../Piece";

const is_promotable = false;
const is_promoted = false;

export class Lance extends Piece {
  static readonly Type: string = "L";
  constructor() {
    super(
      is_promotable,
      is_promoted
    );
  }
}
