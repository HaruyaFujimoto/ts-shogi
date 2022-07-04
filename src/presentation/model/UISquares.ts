import * as PIXI from "pixi.js";
import { FileRank } from "../../domain/value/Square";
import { UIShogiBoard } from "./UIShogiBoard";

export class UISquares {
  private is_focused: FileRank = [0, 0];
  constructor(private ui_shogi_board: UIShogiBoard) {}

  public clicked(file_rank): void {
    if (this.is_focused) {
      return;
    }
    this.is_focused = true;
  }

  private;
}
