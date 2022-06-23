import * as PIXI from "pixi.js";
import { range } from "../../domain/service/utils";

export class ShogiBoardDrawer {
  static readonly shogi_board_color: number = 0xffbd77;
  static readonly line_width: number = 2;

  constructor(
    private app: PIXI.Application,
    private x: number,
    private y: number,
    private square_size: number
  ) {
    this.draw_background();
    this.draw_all_squares();
  }

  get width(): number {
    return this.square_size * 11;
  }

  get height(): number {
    return this.square_size * 11;
  }

  private draw_background() {
    const board_size = this.square_size * 11;
    const graphics = new PIXI.Graphics();
    // graphics.lineStyle(2, 0xFF00FF, 1);
    graphics.beginFill(ShogiBoardDrawer.shogi_board_color);
    graphics.drawRect(this.x, this.y, board_size, board_size);
    graphics.endFill();
    this.app.stage.addChild(graphics);
    // event
    graphics.interactive = true;
    graphics.on("click", (e)=> {
      console.dir(e);
    });

  }

  private draw_all_squares(){
    const origin_X = this.x + this.square_size;
    const origin_Y = this.y + this.square_size;
    for (let i of range(0, 9)) {
      for (let j of range(0, 9)) {
        const x = origin_X + this.square_size * i;
        const y = origin_Y + this.square_size * j;
        const file = 9 - i;
        const rank = j + 1;
        this.add_sprite(x, y, this.square_size, this.square_size, [file, rank]);
        this.add_graphic(x, y, this.square_size, this.square_size);
      }
    }
  }

  private add_sprite(x: number, y: number, width: number, height: number, fr?: number[]) {
    let square = new PIXI.Sprite();
    this.app.stage.addChild(square);
    square.interactive = true;
    // squaress[i][j] = square;
    // prop
    square.width = width;
    square.height = height;
    square.x = x;
    square.y = y;
    // event
    square.on("click", () => {
      console.log(fr);
      // console.dir(e.data);
      let g = new PIXI.Graphics()
        .beginFill(0xffffff, 0.3)
        .drawRect(square.x, square.y, width, height)
        .endFill();
      this.app.stage.addChild(g);
      // setTimeout(() => g.destroy(), 1000);
    });

  }

  private add_graphic(x: number, y: number, width: number, height: number) {
    const g = new PIXI.Graphics();
    g.lineStyle(ShogiBoardDrawer.line_width, 0, 0.85);
    g.beginFill(ShogiBoardDrawer.shogi_board_color);
    g.drawRect(x, y, width, height);
    g.endFill();
    this.app.stage.addChild(g);
  }
}
