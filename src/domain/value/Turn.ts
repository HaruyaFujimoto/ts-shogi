import { Player, PlayerType } from "./Player";

export class Turn {
  private _value: PlayerType;
  constructor(private initial_value: PlayerType) {
    this._value = this.initial_value;
  }

  get value(): PlayerType {
    return this._value;
  }

  public advance() {
    const change_turn = {
      [Player.Sente]: Player.Gote,
      [Player.Gote]: Player.Sente,
    };
    this._value = change_turn[this._value];
  }
}
