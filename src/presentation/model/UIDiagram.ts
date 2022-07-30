import { Diagram } from "../../domain/model/Diagram";
import { FileRank } from "../../domain/model/FileRank";
import { Kifu } from "../../domain/model/Kifu";
import { ShogiBoardDrawer } from "../drawer/ShogiBoardDrawer";
import { UIPieceStands } from "./UIPieceStand";
import { UIShogiBoard } from "./UIShogiBoard";
import { IUISquare, UISquare } from "./UISquare";
import { PieceMoveAreaServer } from "../../domain/service/PieceMoveAreaServer";

// UIDiagramFactory から生成して使用する
export class UIDiagram {
  private _selected_ui_square: IUISquare | null = null;

  constructor(
    private _diagram: Diagram,
    private _kifu: Kifu,
    private _ui_shogi_board: UIShogiBoard,
    private _ui_piece_stands: UIPieceStands,
    // UIShogiBoad はクラスではないので、UIDiagram で ShogiBoardDrawer を持つ
    private _shogi_board_drawer: ShogiBoardDrawer
  ) {
    this.update();
  }

  get st() {
    console.log(this.selected_ui_square);
    return null;
  }

  get value() {
    return this._diagram;
  }

  get ui_shogi_board() {
    return this._ui_shogi_board;
  }

  get ui_piece_stands() {
    return this._ui_piece_stands;
  }

  get selected_ui_square(): IUISquare | null {
    return this._selected_ui_square?.is_selected
      ? this._selected_ui_square
      : null;
  }

  public focus_any_square(ui_square: IUISquare) {
    this._selected_ui_square?.unselect();
    ui_square.select();
    this._selected_ui_square = ui_square;
    // 着手可能なマスを強調表示する
    this._clear_move_area();
    if (
      ui_square instanceof UISquare &&
      ui_square.value.piece?.master == this._diagram.turn
    ) {
      const move_area_square_list = PieceMoveAreaServer.get_move_area(
        ui_square.value,
        this._diagram
      );
      move_area_square_list.map((square_position) => {
        const { file, rank } = square_position;
        // console.log(file, rank);c
        this._ui_shogi_board[file][rank].is_can_move_area = true;
      });
    }
    this._update_child_model();
  }

  public unfocus_any_square() {
    this._selected_ui_square?.unselect();
    this._selected_ui_square = null;
    this._clear_move_area();
    this._update_child_model();
  }

  public update() {
    this._update_model();
    this._update_drawer();
    this._update_child_model();
  }

  public update_by_add_move() {
    this._set_last_move_to();
    this.unfocus_any_square();
    // target_square.update();
    // if (last_move_player) {
    //   this._ui_piece_stands.get(last_move_player)?.update();
    // }
  }

  private _update_model() {}

  private _update_drawer() {
    // 将棋盤の背景 (線を含まない)
    this._shogi_board_drawer.update();
    // 全てのマス
    FileRank.map((file, rank) => {
      this._ui_shogi_board[file][rank].update();
    });
    // 駒台
    this._ui_piece_stands.forEach((ui_piece_stand) => {
      ui_piece_stand.update();
    });
  }

  private _update_child_model() {
    this._set_last_move_to();
    FileRank.map((file, rank) => {
      this._ui_shogi_board[file][rank].update();
    });
    this._ui_piece_stands.forEach((ui_piece_stand) => ui_piece_stand.update());
  }

  private _set_last_move_to() {
    const last_move = this._kifu.last_move;
    if (last_move) {
      const last_move_to = last_move.to.position;
      const file = last_move_to.file;
      const rank = last_move_to.rank;
      const ui_square: UISquare = this._ui_shogi_board[file][rank];
      ui_square.set_as_last_move_to();
    }
  }

  private _clear_move_area() {
    FileRank.map((file, rank) => {
      this._ui_shogi_board[file][rank].is_can_move_area = false;
    });
  }
}
