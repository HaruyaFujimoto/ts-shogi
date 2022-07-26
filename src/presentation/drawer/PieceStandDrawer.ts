import * as PIXI from "pixi.js";
import { PlayerType } from "../../domain/value/Player";
import { create_pixi_container } from "../PIXIApplication";
import { ShogiBoardDrawer } from "./ShogiBoardDrawer";

export type PieceStandDrawers = Map<PlayerType, PieceStandDrawer>;

export class PieceStandDrawer {
  static readonly piece_stand_color: number =
    ShogiBoardDrawer.shogi_board_color;

  private _container: PIXI.Container;
  // private _sprite: PIXI.Sprite;
  // private _graphic: PIXI.Graphics;
  constructor(x: number, y: number, width: number, height: number) {
    // stand
    this._container = create_pixi_container(x, y, width, height);
    // this._sprite =
    this._add_sprite(this._container, width, height);
    // this._graphic =
    this._add_graphic(this._container, width, height);
  }

  get x(): number {
    return this._container.x;
  }

  get y(): number {
    return this._container.y;
  }

  public update() {}

  private _add_sprite(
    container: PIXI.Container,
    width: number,
    height: number
  ) {
    const sprite = new PIXI.Sprite();
    container.addChild(sprite);
    sprite.interactive = true;
    sprite.width = width;
    sprite.height = height;
    return sprite;
  }

  private _add_graphic(
    container: PIXI.Container,
    width: number,
    height: number
  ) {
    const graphic = new PIXI.Graphics();
    container.addChild(graphic);
    graphic.beginFill(PieceStandDrawer.piece_stand_color);
    graphic.drawRect(0, 0, width, height);
    graphic.endFill();
    return graphic;
  }
}
