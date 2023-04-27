import { SquarePosition } from "./SquarePosition";
// import { Piece } from "./Piece";

export class Square {
  constructor(
    public readonly position: SquarePosition,
    // public _piece: Piece | null
  ) {}

  // get piece() {
  //   return this._piece;
  // }

  // public put_piece(piece: Piece) {
  //   if (this._piece) {
  //     const current_piece = this._piece.replicate();
  //     this._piece = piece;
  //     return current_piece;
  //   }
  //   this._piece = piece;
  //   return null;
  // }

  // public remove_piece() {
  //   this._piece = null;
  // }
}
