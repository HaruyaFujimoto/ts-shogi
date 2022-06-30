export const PlayerTypes = ["Sente", "Gote"] as const;

export type PlayerType = typeof PlayerTypes[number];

export class Player {
  static readonly Sente: PlayerType = "Sente";
  static readonly Gote: PlayerType = "Gote";

  constructor(public readonly type: PlayerType) {}
}
