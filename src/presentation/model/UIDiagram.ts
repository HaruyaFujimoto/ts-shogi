import { Diagram } from "../../domain/model/Diagram";
import { FileRank } from "../../domain/model/FileRank";
import { Kifu } from "../../domain/model/Kifu";
import { PieceStand } from "../../domain/model/PieceStand";
import { PlayerTypes } from "../../domain/value/Player";
import { UIPieceStand, UIPieceStands } from "./UIPieceStand";
import { UIShogiBoard } from "./UIShogiBoard";
import { UISquare } from "./UISquare";

export class UIDiagram {
  private _ui_shogi_board: UIShogiBoard = {};
  private _ui_piece_stands: UIPieceStands = new Map();
  constructor(private _diagram: Diagram, private _kifu: Kifu) {
    PlayerTypes.map((player_type) => {
      this._ui_piece_stands.set(
        player_type,
        new UIPieceStand(_diagram.piece_stands.get(player_type) as PieceStand)
      );
    });
    FileRank.numbers.map((file) => {
      this._ui_shogi_board[file] = {};
    });
    FileRank.map((file, rank) => {
      const ui_square = new UISquare(_diagram.shogi_board[file][rank]);
      this._ui_shogi_board[file][rank] = ui_square;
    });
    this.update();
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

  public update() {
    const last_move = this._kifu.last_move;
    if (last_move) {
      const last_move_to = last_move.to.position;
      const file = last_move_to.file;
      const rank = last_move_to.rank;
      const ui_square: UISquare = this._ui_shogi_board[file][rank];
      ui_square.set_as_last_move_to();
    }
  }
}
