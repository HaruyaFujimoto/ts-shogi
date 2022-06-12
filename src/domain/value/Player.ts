import { Piece, PiecePosition } from "./Piece";


export const PlayerTypes = [
  "Sente",
  "Gote",
] as const;

export type PlayerType = typeof PlayerTypes[number];

export class Player {
  constructor(
    public readonly type: PlayerType,
    public pieces: Map<PiecePosition,Piece>,
    ) {}
  static readonly Sente: PlayerType = "Sente";
  static readonly Gote: PlayerType = "Gote";
}
