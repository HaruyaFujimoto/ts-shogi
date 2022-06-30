import { Player, PlayerType } from "./Player";

export class Turn {
  constructor(private _current_turn: PlayerType) {}

  get current_turn(): PlayerType {
    return this._current_turn;
  }

  public advance() {
    const swap_turn = {
      [Player.Sente]: Player.Gote,
      [Player.Gote]: Player.Sente,
    };
    this._current_turn = swap_turn[this._current_turn];
  }
}
