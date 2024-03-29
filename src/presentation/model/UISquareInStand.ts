import { PieceStand } from "../../domain/model/PieceStand";
import { Piece, PieceType } from "../../domain/value/Piece";
import { GameController } from "../controller/GameController";
import { SquareInStandDrawer } from "../drawer/SquareInStandDrawer";
import { UIPieceStand } from "./UIPieceStand";
import { IUISquare } from "./UISquare";
import { UIEvent } from "../service/UIEvent";

export class UISquareInStand implements IUISquare {
  private _is_selected: boolean = false;
  private _drawer: SquareInStandDrawer;
  constructor(
    private _ui_piece_stand: UIPieceStand, // 駒の枚数を数えるために必要
    private _piece_type: PieceType,
    x: number,
    y: number,
    width: number,
    height: number // private _number: number
  ) {
    this._drawer = this._create_drawer(this, x, y, width, height);
    this._register_click_event(() => {
      UIEvent.click_square(this);
    });
  }

  get ui_piece_stand() {
    return this._ui_piece_stand;
  }

  get piece(): Piece | null {
    return this._ui_piece_stand.value.get_piece(this._piece_type);
  }

  get has_piece(): boolean {
    return this.number > 0;
  }

  get piece_type(): PieceType {
    return this._piece_type;
  }

  get number(): number {
    return this._ui_piece_stand.value.pieces[this._piece_type];
  }

  get from(): PieceStand {
    return this._ui_piece_stand.value;
  }

  get is_selected(): boolean {
    return this._is_selected;
  }

  public select() {
    if (this.has_piece && GameController.game.turn == this.piece?.master) {
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

  public update() {
    this._update_model();
    this._update_drawer();
  }

  private _register_click_event<T>(func: () => T) {
    this._drawer.register_click_event(func);
  }

  private _update_model() {
    // this._ui_piece_stand.update();
  }

  private _update_drawer() {
    this._drawer.update();
  }

  private _create_drawer(
    ui_square_in_stand: UISquareInStand,
    x: number,
    y: number,
    width: number,
    height: number
  ): SquareInStandDrawer {
    const square_in_stand_drawer = new SquareInStandDrawer(
      ui_square_in_stand,
      x,
      y,
      width,
      height
    );
    return square_in_stand_drawer;
  }
}
