import { Player, PlayerType } from "./Player";

export class Turn {
  constructor(public value: PlayerType) {}

  public advanceTurn() {
    const change_turn = {
      [Player.Sente]: Player.Gote,
      [Player.Gote]: Player.Sente,
    };
    this.value = change_turn[this.value];
  }
}
