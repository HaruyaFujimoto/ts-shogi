import * as PIXI from "pixi.js";
import { create_pixi_container } from "../PIXIApplication";

export class ShogiBoardDrawer {
  static readonly shogi_board_color: number = 0xe59e50;
  static readonly square_color = {
    normal: ShogiBoardDrawer.shogi_board_color,
    selected: 0xff4b4b,
    last_move_to: 0xe68080,
  };
  static readonly square_size: number = 40;
  static readonly board_stand_gap: number = 10;

  static readonly line_width: number = 2;

  private _container: PIXI.Container;
  constructor(x: number, y: number, private _square_size: number) {
    this._container = create_pixi_container(x, y, this.width, this.height);
    this._draw_background();
  }

  get x(): number {
    return this._container.x;
  }

  get y(): number {
    return this._container.y;
  }

  get width(): number {
    return this._square_size * 11;
  }

  get height(): number {
    return this._square_size * 11;
  }

  public update(): void {}

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
}
