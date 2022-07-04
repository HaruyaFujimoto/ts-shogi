import * as PIXI from "pixi.js";
import { FileRank } from "../../domain/value/FileRank";
import { ShogiBoard } from "../../domain/value/ShogiBoard";
import { Square } from "../../domain/value/Square";
import { UIShogiBoard } from "../model/UIShogiBoard";
import { create_pixi_container } from "../PIXIApplication";
import { SquareDrawer } from "./SquareDrawer";

export class ShogiBoardDrawer {
  static readonly shogi_board_color: number = 0xe59e50;
  static readonly line_width: number = 2;

  private container: PIXI.Container;
  private _square_drawers: UIShogiBoard = {};
  constructor(
    private shogi_board: ShogiBoard,
    x: number,
    y: number,
    private square_size: number
  ) {
    this.container = create_pixi_container(x, y, this.width, this.height);
    this.draw_background();
    this.draw_all_squares();
    // this.draw_pieces();
  }

  get width(): number {
    return this.square_size * 11;
  }

  get height(): number {
    return this.square_size * 11;
  }

  get square_containers(): UIShogiBoard {
    return this._square_drawers;
  }

  public update(): void {
    FileRank.map((file, rank) => {
      const square: Square = this.shogi_board[file][rank];
      this._square_drawers[file][rank].update(square);
    });
  }

  private draw_background() {
    const board_size = this.square_size * 11;
    const graphics = new PIXI.Graphics();
    // graphics.lineStyle(2, 0xFF00FF, 1);
    graphics.beginFill(ShogiBoardDrawer.shogi_board_color);
    graphics.drawRect(0, 0, board_size, board_size);
    graphics.endFill();
    this.container.addChild(graphics);
    // event
    graphics.interactive = true;
    graphics.on("click", (e) => {
      console.dir(e);
    });
  }

  private draw_all_squares() {
    // init two-dimensional
    FileRank.numbers.map((file) => {
      this._square_drawers[file] = {};
    });
    FileRank.map((file, rank) => {
      const x = this.container.x + this.square_size * (10 - file);
      const y = this.container.y + this.square_size * rank;
      const square = this.shogi_board[file][rank];
      if (!this._square_drawers[file]) {
        this._square_drawers[file] = {};
      }
      this._square_drawers[file][rank] = new SquareDrawer(
        square,
        x,
        y,
        this.square_size,
        this.square_size
      );
    });
  }
}
