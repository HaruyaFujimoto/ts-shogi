import * as PIXI from "pixi.js";
import { UISquareInStand } from "../model/UISquareInStand";
import { create_pixi_container } from "../PIXIApplication";
import { PieceDrawer } from "./PieceDrawer";
import { ShogiBoardDrawer } from "./ShogiBoardDrawer";

export class SquareInStandDrawer {
  private _container: PIXI.Container;

  private _piece_drawer: PieceDrawer;
  private _number_sprite: PIXI.Text;

  private _sprite: PIXI.Sprite;
  private _graphic: PIXI.Graphics;
  // private _square_status: "normal" | "selected" | "last_move_to" = "normal";
  constructor(
    private _ui_square_in_stand: UISquareInStand,
    x: number,
    y: number,
    width: number,
    height: number
  ) {
    this._container = create_pixi_container(x, y, width, height);
    this._container.sortableChildren = true;
    this._sprite = this._add_sprite_into_container(
      this._container,
      width,
      height
    );
    this._graphic = this._add_graphic_into_container(this._container);
    this.update_square_graphic();
    //
    this._piece_drawer = this._create_piece_drawer(this._container);
    this._number_sprite = this._add_number_sprite_into_container(
      this._container,
      this._ui_square_in_stand.number
    );
  }

  private get _color() {
    if (this._ui_square_in_stand.is_selected) {
      return ShogiBoardDrawer.square_color.selected;
    }
    return ShogiBoardDrawer.square_color.normal;
  }

  public update() {
    this.update_square_graphic();
    this._update_piece_drawer();
    this._update_piece_number(this._ui_square_in_stand.number);
  }

  public update_square_graphic() {
    const color = this._color;
    this._graphic
      .beginFill(color)
      .drawRect(0, 0, this._sprite.width, this._sprite.height)
      .endFill();
  }

  // public unfocus() {
  //   this._ui_square_in_stand.unselect();
  //   this.update_square_graphic();
  // }

  public register_click_event<T>(func: () => T) {
    const sprite = this._sprite;
    sprite.on("click", func);
  }

  private _create_piece_drawer(container: PIXI.Container) {
    return new PieceDrawer(container, null);
  }

  private _update_piece_drawer() {
    if (this._ui_square_in_stand.number > 0) {
      this._piece_drawer.update(this._ui_square_in_stand.piece);
      return;
    }
    this._piece_drawer.update(null);
  }

  private _update_piece_number(n: number) {
    this._number_sprite.text = n > 0 ? n : "";
    // this._number_sprite.updateText(false);
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
    // graphic.lineStyle(this.line_width, 0, 0.85)
    //   .beginFill(ShogiBoardDrawer.square_color.normal)
    //   .drawRect(0, 0, width, height)
    //   .endFill();
    container.addChild(graphic);
    return graphic;
  }

  private _add_number_sprite_into_container(
    container: PIXI.Container,
    n: number
  ): PIXI.Text {
    const text = new PIXI.Text(n > 0 ? n + "" : "", {
      fontFamily: "Arial",
      fontSize: 14,
      // fill : 0xff1010,
      align: "center",
    });
    // console.log(container.x, container.y)
    // text.x = container.x;
    // text.y = container.y;
    // text.width = 8;
    // text.height = 8;
    container.addChild(text);
    text.x = container.width - 10;
    text.y = container.height - 20;
    text.zIndex = 3;
    // text.y = container.y;
    // text.width = 10;
    // text.height = 16;
    return text;
  }
}
