import * as PIXI from "pixi.js";
import { FileRank } from "../../domain/model/FileRank";
import { UIShogiBoard } from "../model/UIShogiBoard";
import { UISquare } from "../model/UISquare";
import { create_pixi_container } from "../PIXIApplication";
import { SquareDrawer, SquareDrawers } from "./SquareDrawer";

export class ShogiBoardDrawer {
  static readonly shogi_board_color: number = 0xe59e50;
  static readonly line_width: number = 2;

  private _container: PIXI.Container;
  private _square_drawers: SquareDrawers;
  constructor(
    private _ui_shogi_board: UIShogiBoard,
    x: number,
    y: number,
    private _square_size: number
  ) {
    this._container = create_pixi_container(x, y, this.width, this.height);
    this._draw_background();
    this._square_drawers = this._create_all_squares(
      this._ui_shogi_board,
      this._container,
      this._square_size
    );
    // this.draw_pieces();
  }

  get width(): number {
    return this._square_size * 11;
  }

  get height(): number {
    return this._square_size * 11;
  }

  get square_containers(): SquareDrawers {
    return this._square_drawers;
  }

  public update(): void {
    // this._create_all_squares();
    FileRank.map((file, rank) => {
      this._square_drawers[file][rank].update();
    });
  }

  private _draw_background() {
    const board_size = this._square_size * 11;
    const graphics = new PIXI.Graphics();
    // graphics.lineStyle(2, 0xFF00FF, 1);
    graphics.beginFill(ShogiBoardDrawer.shogi_board_color);
    graphics.drawRect(0, 0, board_size, board_size);
    graphics.endFill();
    this._container.addChild(graphics);
    // event
    graphics.interactive = true;
    graphics.on("click", (e) => {
      console.dir(e);
    });
  }

  private _create_all_squares(
    ui_shogi_board: UIShogiBoard,
    container: PIXI.Container,
    square_size: number
  ): SquareDrawers {
    const square_drawers: SquareDrawers = {};
    // init two-dimensional
    FileRank.numbers.map((file) => {
      square_drawers[file] = {};
    });
    FileRank.map((file, rank) => {
      const x = container.x + square_size * (10 - file);
      const y = container.y + square_size * rank;
      const ui_square: UISquare = ui_shogi_board[file][rank];
      square_drawers[file][rank] = new SquareDrawer(
        ui_square,
        x,
        y,
        square_size,
        square_size
      );
    });
    return square_drawers;
  }
}
