import { PlayerType } from "../value/Player";
import { Piece, PieceType, PieceTypes } from "../value/Piece";

export type PieceStands = Map<PlayerType, PieceStand>;

export class PieceStand {
  private _pieces: { [key: string]: number } = {};
  constructor(public readonly master: PlayerType, pieces: Piece[] = []) {
    PieceTypes.map((piece_type: PieceType) => {
      this._pieces[piece_type] = 0;
    });
    pieces.map((piece: Piece) => {
      this._pieces[piece.type] += 1;
    });
  }

  get pieces(): { [key: string]: number } {
    return this._pieces;
  }

  public get_piece(piece: Piece) {
    this._pieces[piece.type] += 1;
  }

  public release_piece(piece: Piece) {
    if (this._pieces[piece.type] < 1) {
      throw Error(`Piece stand has no ${piece.type}.`);
    }
    this._pieces[piece.type] -= 1;
  }
}
