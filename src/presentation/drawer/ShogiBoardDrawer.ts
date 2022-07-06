import * as PIXI from "pixi.js";
import { FileRank } from "../../domain/model/FileRank";
import { UIShogiBoard } from "../model/UIShogiBoard";
import { UISquare } from "../model/UISquare";
import { create_pixi_container } from "../PIXIApplication";
import { SquareDrawer, SquareDrawers } from "./SquareDrawer";

export class ShogiBoardDrawer {
  static readonly shogi_board_color: number = 0xe59e50;
  static readonly line_width: number = 2;

  private container: PIXI.Container;
  private _square_drawers: SquareDrawers = {};
  constructor(
    private _ui_shogi_board: UIShogiBoard,
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

  get square_containers(): SquareDrawers {
    return this._square_drawers;
  }

  public update(): void {
    this.draw_all_squares();
    // FileRank.map((file, rank) => {
    //   this._square_drawers[file][rank].update();
    // });
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
      const ui_square: UISquare = this._ui_shogi_board[file][rank];
      this._square_drawers[file][rank] = new SquareDrawer(
        ui_square,
        x,
        y,
        this.square_size,
        this.square_size
      );
    });
  }
}
