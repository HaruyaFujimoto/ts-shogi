import { Diagram } from "../../domain/model/Diagram";
import { FileRank } from "../../domain/model/FileRank";
import { Kifu } from "../../domain/model/Kifu";
import { PieceStands, PieceStand } from "../../domain/model/PieceStand";
import { Player } from "../../domain/value/Player";
import { ShogiBoard } from "../../domain/value/ShogiBoard";
import { ShogiBoardDrawer } from "../drawer/ShogiBoardDrawer";
import { UIDiagram } from "../model/UIDiagram";
import { UIPieceStand, UIPieceStands } from "../model/UIPieceStand";
import { UIShogiBoard } from "../model/UIShogiBoard";
import { UISquare } from "../model/UISquare";


type PieceStandSize = {
  width: number;
  height: number;
  square_size: number;
  board_stand_gap: number;
  board_size: number;
};


export class UIDiagramFactory {
  static factory(diagram: Diagram, kifu: Kifu) {
    const square_size = ShogiBoardDrawer.square_size;
    const piece_stand_width = square_size * 2;
    const piece_stand_height = square_size * 4;
    const board_stand_gap = ShogiBoardDrawer.board_stand_gap;
    const drawer_x = piece_stand_width + board_stand_gap;
    const drawer_y = 0;
    // background drawer
    const shogi_board_drawer = new ShogiBoardDrawer(
      drawer_x,
      drawer_y,
      square_size
    );
    // ui shogi board
    const ui_shogi_board = this._create_ui_shogi_board(
      diagram.shogi_board,
      drawer_x,
      drawer_y,
      square_size
      );
    const piece_stand_size: PieceStandSize = {
      width: piece_stand_width,
      height: piece_stand_height,
      square_size,
      board_stand_gap,
      board_size: shogi_board_drawer.width,
    };
    const ui_piece_stands = this._create_ui_piece_stands(
      diagram.piece_stands,
      piece_stand_size
    );

    return new UIDiagram(
      diagram,
      kifu,
      ui_shogi_board,
      ui_piece_stands,
      shogi_board_drawer
    );
  }


  private static _create_ui_shogi_board(
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

  private static _create_ui_piece_stands(
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
}
