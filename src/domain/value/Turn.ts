import { Player, PlayerType } from "./Player";

export class Turn {
  private current_turn: PlayerType;
  constructor(private initial_turn: PlayerType) {
    this.current_turn = this.initial_turn;
  }

  get value(): PlayerType {
    return this.current_turn;
  }

  public advance() {
    const change_turn = {
      [Player.Sente]: Player.Gote,
      [Player.Gote]: Player.Sente,
    };
    this.current_turn = change_turn[this.current_turn];
  }
}
