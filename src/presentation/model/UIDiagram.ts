import { Diagram } from "../../domain/model/Diagram";
import { FileRank } from "../../domain/model/FileRank";
import { Kifu } from "../../domain/model/Kifu";
import { PieceStand, PieceStands } from "../../domain/model/PieceStand";
import { PlayerTypes } from "../../domain/value/Player";
import { ShogiBoard } from "../../domain/value/ShogiBoard";
import { DiagramDrawer } from "../drawer/DiagramDrawer";
import { ShogiBoardDrawer } from "../drawer/ShogiBoardDrawer";
import { UIPieceStand, UIPieceStands } from "./UIPieceStand";
import { UIShogiBoard } from "./UIShogiBoard";
import { UISquare } from "./UISquare";
import { UISquareInStand } from "./UISquareInStand";

export class UIDiagram {
  private _ui_shogi_board: UIShogiBoard;
  private _ui_piece_stands: UIPieceStands;
  // UIShogiBoad はクラスではないので、UIDiagram で ShogiBoardDrawer を持つ
  private _shogi_board_drawer: ShogiBoardDrawer;

  constructor(private _diagram: Diagram, private _kifu: Kifu) {
    this._ui_piece_stands = this.create_ui_piece_stands(_diagram.piece_stands);
    this._ui_shogi_board = this.create_ui_shogi_board(_diagram.shogi_board);

    // drawer
    const square_size = DiagramDrawer.square_size;
    const board_stand_gap = DiagramDrawer.board_stand_gap
    const piece_stand_size: { width: number; height: number } = {
      width: square_size * 2,
      height: square_size * 4,
    };
    this._shogi_board_drawer = new ShogiBoardDrawer(
      this._ui_shogi_board,
      piece_stand_size.width + board_stand_gap,
      0,
      square_size
    );

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

  get selected_ui_square(): UISquare | UISquareInStand | null {
    let selected_square = null;
    // shogi_board
    FileRank.map( (file, rank) => {
      const square = this._ui_shogi_board[file][rank];
      if (square.is_selected) {
        selected_square = square;
      }
    });
    if (selected_square){
      return selected_square;
    }
    // piece stands
    for (let player_type of PlayerTypes) {
      const ui_piece_stand = this._ui_piece_stands.get(player_type) as UIPieceStand;
      if (ui_piece_stand.selected_ui_square_in_stand) {
        return ui_piece_stand.selected_ui_square_in_stand;
      }
    }
    return null;
  }

  public update() {
    this._update_model();
    this._update_drawer();
  }

  private _update_model() {
    this._set_last_move_to();
    this._ui_piece_stands.forEach((ui_piece_stand) =>
      ui_piece_stand.update()
    );
  }

  private _update_drawer() {
    this._shogi_board_drawer.update();
  }


  // public update() {
  //   const last_move = this._kifu.last_move;
  //   if (last_move) {
  //     const last_move_to = last_move.to.position;
  //     const file = last_move_to.file;
  //     const rank = last_move_to.rank;
  //     const ui_square: UISquare = this._ui_shogi_board[file][rank];
  //     ui_square.set_as_last_move_to();
  //   }
  // }

  private create_ui_shogi_board(shogi_board: ShogiBoard): UIShogiBoard {
    const ui_shogi_board: UIShogiBoard = {};
    // init
    FileRank.numbers.map((file) => {
      ui_shogi_board[file] = {};
    });
    FileRank.map((file, rank) => {
      const ui_square = new UISquare(shogi_board[file][rank]);
      ui_shogi_board[file][rank] = ui_square;
    });
    return ui_shogi_board;
  }

  private create_ui_piece_stands(piece_stands: PieceStands): UIPieceStands {
    const ui_piece_stands: UIPieceStands = new Map();
    PlayerTypes.map((player_type) => {
      ui_piece_stands.set(
        player_type,
        new UIPieceStand(piece_stands.get(player_type) as PieceStand)
      );
    });
    return ui_piece_stands;
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
}
