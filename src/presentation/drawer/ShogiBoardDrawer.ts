import * as PIXI from "pixi.js";
import { range } from "../../domain/service/utils";
import { ShogiBoard } from "../../domain/value/ShogiBoard";
import { UIShogiBoard } from "../model/UIShogiBoard";
import { PieceDrawer } from "./PieceDrawer";

export class ShogiBoardDrawer {
  static readonly shogi_board_color: number = 0xe59e50;
  static readonly line_width: number = 2;

  private _square_containers: UIShogiBoard = {};
  constructor(
    private shogi_board: ShogiBoard,
    private app: PIXI.Application,
    private x: number,
    private y: number,
    private square_size: number
  ) {
    this.draw_background();
    this.draw_all_squares();
    this.draw_pieces();
  }

  get width(): number {
    return this.square_size * 11;
  }

  get height(): number {
    return this.square_size * 11;
  }

  get square_containers(): UIShogiBoard {
    return this._square_containers;
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
    graphics.on("click", (e) => {
      console.dir(e);
    });
  }

  private draw_all_squares() {
    const origin_X = this.x + this.square_size;
    const origin_Y = this.y + this.square_size;
    for (const i of range(0, 9)) {
      for (const j of range(0, 9)) {
        const x = origin_X + this.square_size * i;
        const y = origin_Y + this.square_size * j;
        const file = 9 - i;
        const rank = j + 1;
        const container = this.create_pixi_container(
          x,
          y,
          this.square_size,
          this.square_size
        );
        if (!this._square_containers[file]) {
          this._square_containers[file] = {};
        }
        this._square_containers[file][rank] = container;
        this.add_sprite_into_container(
          container,
          this.square_size,
          this.square_size,
          [file, rank]
        );
        this.add_graphic_into_container(
          container,
          this.square_size,
          this.square_size
        );
      }
    }
  }

  private create_pixi_container(
    x: number,
    y: number,
    width: number,
    height: number
  ) {
    const container = new PIXI.Container();
    container.x = x;
    container.y = y;
    container.width = width;
    container.height = height;
    this.app.stage.addChild(container);
    return container;
  }

  private add_sprite_into_container(
    container: PIXI.Container,
    width: number,
    height: number,
    fr?: number[]
  ) {
    const square = new PIXI.Sprite();
    container.addChild(square);
    square.interactive = true;
    // squaress[i][j] = square;
    // prop
    square.width = width;
    square.height = height;
    // square.x = x;
    // square.y = y;
    // event
    square.on("click", () => {
      console.log(fr);
      // console.dir(e.data);
      const g = new PIXI.Graphics()
        .beginFill(0xffffff, 0.3)
        .drawRect(square.x, square.y, width, height)
        .endFill();
      container.addChild(g);
      // setTimeout(() => g.destroy(), 1000);
    });
  }

  private add_graphic_into_container(
    container: PIXI.Container,
    width: number,
    height: number
  ) {
    const g = new PIXI.Graphics();
    g.lineStyle(ShogiBoardDrawer.line_width, 0, 0.85);
    g.beginFill(ShogiBoardDrawer.shogi_board_color);
    g.drawRect(0, 0, width, height);
    g.endFill();
    container.addChild(g);
  }

  private draw_pieces() {
    for (const file of range(1, 9)) {
      for (const rank of range(1, 9)) {
        const square = this.shogi_board[file][rank];
        if (square.piece) {
          const container = this._square_containers[file][rank];
          new PieceDrawer(container, square.piece);
        }
      }
    }
  }
}
