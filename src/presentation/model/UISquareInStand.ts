import { Piece, PieceType } from "../../domain/value/Piece";
import { UIPieceStand } from "./UIPieceStand";
import { IUISquare } from "./UISquare";

export class UISquareInStand implements IUISquare {
  private _is_selected: boolean = false;
  constructor(
    private _ui_piece_stand: UIPieceStand,  // 駒の枚数を数えるために必要
    private _piece_type: PieceType
  ) // private _number: number
  {}

  get ui_piece_stand() {
    return this._ui_piece_stand;
  }

  get piece(): Piece {
    return this._ui_piece_stand.value.get_piece(this._piece_type);
  }

  get piece_type(): PieceType{
    return this._piece_type;
  }

  get number(): number {
    return this._ui_piece_stand.value.pieces[this._piece_type];
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
