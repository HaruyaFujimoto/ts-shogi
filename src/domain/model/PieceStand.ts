import { PlayerType } from "../value/Player";
import { Piece, PieceType, PieceTypes } from "../value/Piece";

export type PieceStands = Map<PlayerType, PieceStand>;
export type PiecesInStand = { [key: string]: number };

export class PieceStand {
  constructor(public readonly master: PlayerType, private _pieces: Piece[]) {}

  get pieces(): PiecesInStand {
    const piece_map: PiecesInStand = {};
    PieceTypes.map((piece_type: PieceType) => {
      piece_map[piece_type] = 0;
    });
    this._pieces.map((piece: Piece) => {
      piece_map[piece.type] += 1;
    });
    return piece_map;
  }

  public get_piece(piece_type: PieceType): Piece {
    const piece_index = this._pieces.findIndex((piece) => {
      return piece.type == piece_type;
    });
    if (piece_index < 0) {
      throw Error(`Piece stand has no ${piece_type}.`);
    }
    return this._pieces[piece_index];
  }

  public take_piece(piece: Piece): void {
    this._pieces.push(piece);
  }

  public release_piece(piece: Piece): void {
    const piece_index = this._pieces.indexOf(piece);
    if (piece_index < 0) {
      throw Error(`Piece stand has no ${piece.type}.`);
    }
    this._pieces.splice(piece_index, 1);
  }
}
