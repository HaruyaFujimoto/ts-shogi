import { Player } from "../../domain/value/Player";
import { PieceStandDrawer, PieceStandDrawers } from "./PieceStandDrawer";
import { ShogiBoardDrawer } from "./ShogiBoardDrawer";
import { UIDiagram } from "../model/UIDiagram";
import { UIPieceStand } from "../model/UIPieceStand";

export class DiagramDrawer {
  static readonly square_size: number = 40;

  private _shogi_board_drawer: ShogiBoardDrawer;
  private _piece_stand_drawers: PieceStandDrawers;

  constructor(
    private ui_diagram: UIDiagram,
    private square_size: number = DiagramDrawer.square_size,
    private board_stand_gap: number = 10
  ) {
    const piece_stand_size: { width: number; height: number } = {
      width: this.square_size * 2,
      height: this.square_size * 4,
    };
    this._shogi_board_drawer = new ShogiBoardDrawer(
      this.ui_diagram.ui_shogi_board,
      piece_stand_size.width + this.board_stand_gap,
      0,
      this.square_size
    );

    const board_size = this._shogi_board_drawer.width;
    this._piece_stand_drawers = this.generate_piece_stand_drawer(
      this.square_size,
      piece_stand_size,
      board_size
    );
  }

  private generate_piece_stand_drawer(
    square_size: number,
    piece_stand_size: { width: number; height: number },
    board_size: number
  ): PieceStandDrawers {
    const piece_stand_drawers = new Map();
    const sente_piece_stand = new PieceStandDrawer(
      this.ui_diagram.ui_piece_stands.get(Player.Gote) as UIPieceStand,
      0,
      0,
      piece_stand_size.width,
      piece_stand_size.height,
      square_size
    );
    piece_stand_drawers.set(Player.Gote, sente_piece_stand);

    const gote_piece_stand = new PieceStandDrawer(
      this.ui_diagram.ui_piece_stands.get(Player.Sente) as UIPieceStand,
      piece_stand_size.width +
        this.board_stand_gap +
        board_size +
        this.board_stand_gap,
      board_size - piece_stand_size.height,
      piece_stand_size.width,
      piece_stand_size.height,
      square_size
    );
    piece_stand_drawers.set(Player.Sente, gote_piece_stand);
    return piece_stand_drawers;
  }

  public update() {
    this.ui_diagram.update();
    this._shogi_board_drawer.update();
    this._piece_stand_drawers.forEach((piece_stand_drawer) =>
      piece_stand_drawer.update()
    );
  }
}
