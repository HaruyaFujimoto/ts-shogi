import { Diagram } from "../../domain/model/Diagram";
import { Player } from "../../domain/value/Player";
import { PieceStandDrawer, PieceStandDrawers } from "./PieceStandDrawer";
import { ShogiBoardDrawer } from "./ShogiBoardDrawer";
import { PieceStand } from "../../domain/model/PieceStand";

export class DiagramDrawer {
  static readonly square_size: number = 40;

  private _shogi_board_drawer: ShogiBoardDrawer;
  private _piece_stand_drawers: PieceStandDrawers;
  constructor(
    public diagram: Diagram,
    private square_size: number = DiagramDrawer.square_size,
    private board_stand_gap: number = 10
  ) {
    const piece_stand_size: { width: number; height: number } = {
      width: this.square_size * 3,
      height: this.square_size * 4,
    };
    this._shogi_board_drawer = new ShogiBoardDrawer(
      this.diagram.shogi_board,
      piece_stand_size.width + this.board_stand_gap,
      0,
      this.square_size
    );

    const board_size = this._shogi_board_drawer.width;
    this._piece_stand_drawers = this.generate_piece_stand_drawer(piece_stand_size, board_size);
  }

  private generate_piece_stand_drawer(piece_stand_size: { width: number; height: number }, board_size: number): PieceStandDrawers {
    const piece_stand_drawers = new Map();
    const sente_piece_stand = new PieceStandDrawer(
      this.diagram.piece_stands.get(Player.Sente) as PieceStand,
      0,
      0,
      piece_stand_size.width,
      piece_stand_size.height
    );
    piece_stand_drawers.set(Player.Sente, sente_piece_stand);

    const gote_piece_stand = new PieceStandDrawer(
      this.diagram.piece_stands.get(Player.Gote) as PieceStand,
      piece_stand_size.width +
        this.board_stand_gap +
        board_size +
        this.board_stand_gap,
      board_size - piece_stand_size.height,
      piece_stand_size.width,
      piece_stand_size.height
    );
    piece_stand_drawers.set(Player.Gote, gote_piece_stand);
    return piece_stand_drawers;
  }

  public update() {
    this._shogi_board_drawer.update();
    this._piece_stand_drawers.forEach(
      (piece_stand_drawer) => piece_stand_drawer.update());
  }
}
