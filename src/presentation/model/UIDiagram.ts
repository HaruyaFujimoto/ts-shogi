import { Diagram } from "../../domain/model/Diagram";
import { FileRank } from "../../domain/model/FileRank";
import { Kifu } from "../../domain/model/Kifu";
import { PieceStand, PieceStands } from "../../domain/model/PieceStand";
import { Player } from "../../domain/value/Player";
import { ShogiBoard } from "../../domain/value/ShogiBoard";
import { ShogiBoardDrawer } from "../drawer/ShogiBoardDrawer";
import { UIPieceStand, UIPieceStands } from "./UIPieceStand";
import { UIShogiBoard } from "./UIShogiBoard";
import { IUISquare, UISquare } from "./UISquare";

type PieceStandSize = {
  width: number;
  height: number;
  square_size: number;
  board_stand_gap: number;
  board_size: number;
};

export class UIDiagram {
  private _ui_shogi_board: UIShogiBoard;
  private _ui_piece_stands: UIPieceStands;
  // UIShogiBoad はクラスではないので、UIDiagram で ShogiBoardDrawer を持つ
  private _shogi_board_drawer: ShogiBoardDrawer;

  private _selected_ui_square: IUISquare | null = null;

  constructor(private _diagram: Diagram, private _kifu: Kifu) {
    const square_size = ShogiBoardDrawer.square_size;
    const piece_stand_width = square_size * 2;
    const piece_stand_height = square_size * 4;
    const board_stand_gap = ShogiBoardDrawer.board_stand_gap;
    const drawer_x = piece_stand_width + board_stand_gap;
    const drawer_y = 0;
    // background drawer
    this._shogi_board_drawer = new ShogiBoardDrawer(
      drawer_x,
      drawer_y,
      square_size
    );
    // model
    this._ui_shogi_board = this.create_ui_shogi_board(
      _diagram.shogi_board,
      drawer_x,
      drawer_y,
      square_size
    );
    const piece_stand_size: PieceStandSize = {
      width: piece_stand_width,
      height: piece_stand_height,
      square_size,
      board_stand_gap,
      board_size: this._shogi_board_drawer.width,
    };
    // child model
    this._ui_piece_stands = this.create_ui_piece_stands(
      _diagram.piece_stands,
      piece_stand_size
    );

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
  }

  public unfocus_any_square() {
    this._selected_ui_square?.unselect();
    this._selected_ui_square = null;
  }

  public update() {
    this._update_model();
    this._update_drawer();
    this._update_child_model();
  }

  private _update_model() {}

  private _update_drawer() {
    this._shogi_board_drawer.update();
  }

  private _update_child_model() {
    this._set_last_move_to();
    FileRank.map((file, rank) => {
      this._ui_shogi_board[file][rank].update();
    });
    this._ui_piece_stands.forEach((ui_piece_stand) => ui_piece_stand.update());
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

  private create_ui_shogi_board(
    shogi_board: ShogiBoard,
    container_x: number,
    container_y: number,
    square_size: number
  ): UIShogiBoard {
    const ui_shogi_board: UIShogiBoard = {};
    // init
    FileRank.numbers.map((file) => {
      ui_shogi_board[file] = {};
    });
    FileRank.map((file, rank) => {
      const x = container_x + square_size * (10 - file);
      const y = container_y + square_size * rank;
      // const ui_square: UISquare = ui_shogi_board[file][rank];
      const ui_square = new UISquare(
        shogi_board[file][rank],
        x,
        y,
        square_size,
        square_size
      );
      ui_shogi_board[file][rank] = ui_square;
    });
    return ui_shogi_board;
  }

  private create_ui_piece_stands(
    piece_stands: PieceStands,
    piece_stand_size: PieceStandSize
  ): UIPieceStands {
    const ui_piece_stands: UIPieceStands = new Map();
    // PlayerTypes.map((player_type) => {
    //   ui_piece_stands.set(
    //     player_type,
    //     new UIPieceStand(piece_stands.get(player_type) as PieceStand)
    //   );
    // });

    // Gote
    const gote_ui_piece_stand = new UIPieceStand(
      piece_stands.get(Player.Gote) as PieceStand,
      0,
      0,
      piece_stand_size.width,
      piece_stand_size.height,
      piece_stand_size.square_size
    );
    ui_piece_stands.set(Player.Gote, gote_ui_piece_stand);
    // Sente
    const sente_ui_piece_stand = new UIPieceStand(
      piece_stands.get(Player.Sente) as PieceStand,
      piece_stand_size.width +
        piece_stand_size.board_stand_gap +
        piece_stand_size.board_size +
        piece_stand_size.board_stand_gap,
      piece_stand_size.board_size - piece_stand_size.height,
      piece_stand_size.width,
      piece_stand_size.height,
      piece_stand_size.square_size
    );
    ui_piece_stands.set(Player.Sente, sente_ui_piece_stand);

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
