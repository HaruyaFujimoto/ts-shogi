import { Square } from "../../domain/value/Square";

export interface IUISquare {
  select: () => void;
  unselect: () => void;
}

export class UISquare implements IUISquare {
  private static _last_move_to_square: UISquare | null;
  private _is_selected: boolean = false;
  private _is_last_move_to: boolean = false;
  constructor(private _value: Square) {}

  get value(): Square {
    return this._value;
  }

  get is_selected(): boolean {
    return this._is_selected;
  }

  get is_last_move_to(): boolean {
    return this._is_last_move_to;
  }

  public select() {
    this._is_selected = true;
  }

  public unselect() {
    this._is_selected = false;
  }

  public set_as_last_move_to() {
    if (UISquare._last_move_to_square) {
      UISquare._last_move_to_square._is_last_move_to = false;
    }
    this._is_last_move_to = true;
    UISquare._last_move_to_square = this;
  }
}
