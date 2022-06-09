export type PlayerType = "Sente" | "Gote";

export class Player {
  constructor(public type: PlayerType) {}
  static readonly Sente: PlayerType = "Sente";
  static readonly Gote: PlayerType = "Gote";
}
