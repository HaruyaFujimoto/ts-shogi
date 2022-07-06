import { Diagram } from "../../domain/model/Diagram";
import { FileRank } from "../../domain/model/FileRank";
import { Kifu } from "../../domain/model/Kifu";
import { PieceStand } from "../../domain/model/PieceStand";
import { Move } from "../../domain/value/Move";
import { PlayerTypes } from "../../domain/value/Player";
import { UIPieceStand, UIPieceStands } from "./UIPieceStand";
import { UIShogiBoard } from "./UIShogiBoard";
import { UISquare } from "./UISquare";

export class UIDiagram {
  private _ui_shogi_board: UIShogiBoard = {};
  private _ui_piece_stands: UIPieceStands = new Map();
  constructor(diagram: Diagram, private kifu: Kifu) {
    PlayerTypes.map((player_type) => {
      this._ui_piece_stands.set(
        player_type,
        new UIPieceStand(diagram.piece_stands.get(player_type) as PieceStand)
      );
    });
    FileRank.numbers.map((file) => {
      this._ui_shogi_board[file] = {};
    });
    FileRank.map((file, rank) => {
      const ui_square = new UISquare(diagram.shogi_board[file][rank]);
      this._ui_shogi_board[file][rank] = ui_square;
    });
    this.update();
  }

  get ui_shogi_board() {
    return this._ui_shogi_board;
  }

  get ui_piece_stands() {
    return this._ui_piece_stands;
  }

  public update() {
    if (this.kifu.move_history.length > 1) {
      const last_move_to = (this.kifu.move_history.at(-1) as Move).to.position;
      const file = last_move_to.file;
      const rank = last_move_to.rank;
      this._ui_shogi_board[file][rank].set_as_last_move_to();
    }
  }
}
