import { PieceStand } from "../../domain/model/PieceStand";
import { PlayerType } from "../../domain/value/Player";

export type UIPieceStands = Map<PlayerType, UIPieceStand>;

export class UIPieceStand {
  constructor(private _value: PieceStand) {}

  get value() {
    return this._value;
  }
}
