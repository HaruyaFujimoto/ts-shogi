import { Piece } from "../../domain/value/Piece";
import { UIPieceStand } from "./UIPieceStand";
import { IUISquare } from "./UISquare";

export class UISquareInStand implements IUISquare {
  private _is_selected: boolean = false;
  constructor(
    private _ui_piece_stand: UIPieceStand,
    private _piece: Piece,
    private _number: number
  ) {}

  get ui_piece_stand() {
    return this._ui_piece_stand;
  }

  get piece() {
    return this._piece;
  }

  get number() {
    return this._number;
  }

  get is_selected(): boolean {
    return this._is_selected;
  }

  public select() {
    this._is_selected = true;
  }

  public unselect() {
    this._is_selected = false;
  }
}
