import { Piece } from "../value/Piece";

export class PieceSet {
  private _pieces :Piece[] = [];
  constructor(
    pieces: Piece[]
  ) {
    this._pieces = pieces;
  }

  get pieces() :Piece[] {
    return this._pieces;
  }

  public has_position_piece(FileRankPair) {
    this._pieces.filter( (piece) => piece.piece_position)
  }
}
