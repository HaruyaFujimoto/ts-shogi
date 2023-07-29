import * as PIXI from "pixi.js";
import { PieceDrawer } from "./PieceDrawer";
import { ShogiBoardDrawer } from "./ShogiBoardDrawer";
import { create_pixi_container } from "../PIXIApplication";
import { UISquare } from "../model/UISquare";
import { Piece } from "../../domain/value/Piece";

export interface SquareDrawers {
  [key: string]: { [key: string]: SquareDrawer };
}

export class SquareDrawer {
  private readonly _line_width = ShogiBoardDrawer.line_width;

  private _container: PIXI.Container;
  private _piece_drawer: PieceDrawer;

  private _sprite: PIXI.Sprite;
  private _graphic: PIXI.Graphics;
  constructor(
    private _ui_square: UISquare,
    x: number,
    y: number,
    width: number,
    height: number
  ) {
    this._container = create_pixi_container(x, y, width, height);
    this._sprite = this._add_sprite_into_container(
      this._container,
      width,
      height
    );
    this._graphic = this._add_graphic_into_container(this._container);
    this.update_square_graphic();
    this._piece_drawer = this._create_piece_drawer(
      this._ui_square.value.piece,
      this._container
    );
  }

  private get _color() {
    if (this._ui_square.is_selected) {
      return ShogiBoardDrawer.square_color.selected;
    }
    if (this._ui_square.is_can_move_area) {
      return ShogiBoardDrawer.square_color.can_move_area;
    }
    if (this._ui_square.is_last_move_to) {
      return ShogiBoardDrawer.square_color.last_move_to;
    }
    return ShogiBoardDrawer.square_color.normal;
  }

  public update() {
    this._piece_drawer.update(this._ui_square.value.piece);
    this.update_square_graphic();
  }

  public update_square_graphic() {
    const color = this._color;
    this._graphic
      .lineStyle(this._line_width, 0, 0.85)
      .beginFill(color)
      .drawRect(0, 0, this._sprite.width, this._sprite.height)
      .endFill();
  }

  public register_click_event<T>(func: () => T) {
    const sprite = this._sprite;
    const events = ["click", "tap"];
    events.forEach((event) => {
      sprite.on(event, func);
    });
  }

  private _create_piece_drawer(piece: Piece | null, container: PIXI.Container) {
    return new PieceDrawer(container, piece);
  }

  private _add_sprite_into_container(
    container: PIXI.Container,
    width: number,
    height: number
  ) {
    const sprite = new PIXI.Sprite();
    container.addChild(sprite);
    sprite.interactive = true;
    // prop
    sprite.width = width;
    sprite.height = height;
    // sprite.x = x;
    // sprite.y = y;
    // event

    return sprite;
  }

  private _add_graphic_into_container(
    container: PIXI.Container
    // width: number,
    // height: number
  ): PIXI.Graphics {
    const graphic = new PIXI.Graphics();
    // graphic.lineStyle(this._line_width, 0, 0.85)
    //   .beginFill(ShogiBoardDrawer.square_color.normal)
    //   .drawRect(0, 0, width, height)
    //   .endFill();
    container.addChild(graphic);
    return graphic;
  }
}
