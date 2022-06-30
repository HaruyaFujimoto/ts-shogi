import * as PIXI from "pixi.js";
import { ShogiBoardDrawer } from "./ShogiBoardDrawer";

export class PieceStandDrawer {
  static readonly piece_stand_color: number = ShogiBoardDrawer.shogi_board_color;

  constructor(
    private app: PIXI.Application,
    private x: number,
    private y: number,
    private width: number,
    private height: number
  ) {
    this.add_sprite();
    this.add_graphic();
  }

  private add_sprite() {
    const sprite = new PIXI.Sprite();
    this.app.stage.addChild(sprite);
    sprite.interactive = true;
    sprite.x = this.x;
    sprite.y = this.y;
    sprite.width = this.width;
    sprite.height = this.height;
  }

  private add_graphic() {
    const graphic = new PIXI.Graphics();
    graphic.beginFill(PieceStandDrawer.piece_stand_color);
    graphic.drawRect(this.x, this.y, this.width, this.height);
    graphic.endFill();
    this.app.stage.addChild(graphic);
  }
}
