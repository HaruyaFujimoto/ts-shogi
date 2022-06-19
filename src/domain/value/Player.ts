import { Piece, PiecePosition } from "./Piece";

export const PlayerTypes = ["Sente", "Gote"] as const;

export type PlayerType = typeof PlayerTypes[number];

export class Player {
  static readonly Sente: PlayerType = "Sente";
  static readonly Gote: PlayerType = "Gote";

  constructor(
    public readonly type: PlayerType,
    public pieces: Map<PiecePosition, Piece>
  ) {}

  static create_players() {
    return [
      new Player(Player.Sente, new Map()),
      new Player(Player.Gote, new Map()),
    ];
  }
}
