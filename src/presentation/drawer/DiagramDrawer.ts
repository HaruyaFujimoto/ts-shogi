import * as PIXI from "pixi.js";
import { Diagram } from "../../domain/value/Diagram";
import { PieceStandDrawer } from "./PieceStandDrawer";
import { ShogiBoardDrawer } from "./ShogiBoardDrawer";

export class DiagramDrawer {
  static readonly square_size: number = 40;
  constructor(
    private app: PIXI.Application,
    public diagram: Diagram,
    private square_size: number = DiagramDrawer.square_size,
    private board_stand_gap: number = 10
  ) {
    const piece_stand_size: { width: number; height: number } = {
      width: this.square_size * 3,
      height: this.square_size * 4,
    };
    new PieceStandDrawer(
      this.app,
      0,
      0,
      piece_stand_size.width,
      piece_stand_size.height
    );
    const shogi_board_drawer = new ShogiBoardDrawer(
      this.diagram.shogi_board,
      this.app,
      piece_stand_size.width + this.board_stand_gap,
      0,
      this.square_size
    );
    const board_size = shogi_board_drawer.width;
    new PieceStandDrawer(
      this.app,
      piece_stand_size.width +
        this.board_stand_gap +
        board_size +
        this.board_stand_gap,
      board_size - piece_stand_size.height,
      piece_stand_size.width,
      piece_stand_size.height
    );
  }
}
