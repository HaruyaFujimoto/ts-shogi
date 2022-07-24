import { PieceMoveFrom } from "../../domain/value/Piece";
import { Square } from "../../domain/value/Square";
import { GameController } from "../controller/GameController";
import { SquareDrawer } from "../drawer/SquareDrawer";
import { UIEvent } from "../service/UIEvent";

export interface IUISquare {
  from: PieceMoveFrom;
  is_selected: boolean;
  select: () => void;
  unselect: () => void;
  update: () => void;
}

export class UISquare implements IUISquare {
  private static _last_move_to_square: UISquare | null;
  private _is_selected: boolean = false;
  private _is_last_move_to: boolean = false;

  private _drawer: SquareDrawer;
  constructor(
    private _value: Square,
    x: number,
    y: number,
    width: number,
    height: number
  ) {
    this._drawer = this._create_drawer(this, x, y, width, height);
    this._register_click_event(() => { UIEvent.click_square(this)})
  }

  // get value(): Square {
  //   return this._value;
  // }

  get is_selected(): boolean {
    return this._is_selected;
  }

  get is_last_move_to(): boolean {
    return this._is_last_move_to;
  }

  // get piece(): Piece | null {
  //   return this._value._piece;
  // }

  get from(): Square {
    return this._value;
  }

  get value(): Square {
    return this._value;
  }

  public update() {
    this._update_drawer();
  }

  private _register_click_event(func: ()=>any) {
    this._drawer.register_click_event(func);
  }

  private _update_drawer() {
    this._drawer.update();
  }

  public select() {
    if (
      this._value.piece &&
      GameController.game.turn == this._value.piece.master
    ) {
      console.log("work");
      this._is_selected = true;
      this._drawer.update_square_graphic();
      return true;
    }
    return false;
  }

  public unselect() {
    this._is_selected = false;
    this._drawer.update_square_graphic();
  }

  public set_as_last_move_to() {
    if (UISquare._last_move_to_square) {
      UISquare._last_move_to_square._is_last_move_to = false;
    }
    this._is_last_move_to = true;
    UISquare._last_move_to_square = this;
  }

  private _create_drawer(
    ui_square: UISquare,
    x: number,
    y: number,
    width: number,
    height: number
  ): SquareDrawer {
    const square_drawer = new SquareDrawer(ui_square, x, y, width, height);
    return square_drawer;
  }
}
