import * as PIXI from "pixi.js";
import { PieceStand } from "../../domain/model/PieceStand";
import { Piece } from "../../domain/value/Piece";
import { ClickEventController } from "../controller/ClickEventController";
import { GameController } from "../controller/GameController";
import { UISquareInStand } from "../model/UISquareInStand";
import { create_pixi_container } from "../PIXIApplication";
import { PieceDrawer } from "./PieceDrawer";
import { ShogiBoardDrawer } from "./ShogiBoardDrawer";
import { ISquareDrawer } from "./SquareDrawer";
import { UIPieceStand } from "../model/UIPieceStand";

export class SquareInStandDrawer implements ISquareDrawer {
  private readonly _square_color = {
    normal: ShogiBoardDrawer.shogi_board_color,
    selected: 0xff4b4b,
  };

  private _container: PIXI.Container;

  private _piece_drawer: PieceDrawer;

  private _sprite: PIXI.Sprite;
  private _graphic: PIXI.Graphics;
  private _square_status: "normal" | "selected" | "last_move_to" = "normal";
  constructor(
    private _ui_piece_stand: UIPieceStand,
    private _ui_square_in_stand: UISquareInStand,
    // piece_type: PieceType,
    x: number,
    y: number,
    width: number,
    height: number
  ) {
    // this._ui_square_in_stand = new UISquareInStand(
    //   this._ui_piece_stand,
    //   piece_type
    // );
    this._container = create_pixi_container(x, y, width, height);
    this._sprite = this._add_sprite_into_container(
      this._container,
      width,
      height
    );
    // this._graphic = this._add_graphic_into_container(this._container, width, height);
    this._graphic = this._add_graphic_into_container(this._container);
    this._update_square_graphic();
    //
    this._piece_drawer = this._create_piece_drawer(this._container);
    this._update_piece_drawer();
    this._attatch_click_event(this._sprite);
  }

  get position(): PieceStand {
    return this._ui_piece_stand.value;
  }

  get piece(): Piece {
    return this._ui_square_in_stand.piece;
  }

  get ui_square_in_stand(): UISquareInStand {
    return this._ui_square_in_stand;
  }

  public update() {
    this._update_square_graphic();
    this._update_piece_drawer();
  }

  public focus(): boolean {
    if (
      this._ui_square_in_stand.piece &&
      GameController.game.turn == this._ui_square_in_stand.piece.master
    ) {
      this._ui_square_in_stand.select();
      this._update_square_graphic();
      return true;
    }
    return false;
  }

  public unfocus() {
    this._ui_square_in_stand.unselect();
    this._update_square_graphic();
  }

  private _create_piece_drawer(container: PIXI.Container) {
    return new PieceDrawer(container, null);
  }

  private _update_piece_drawer() {
    if (this._ui_square_in_stand.number > 0) {
      this._piece_drawer.update(this.piece);
      return;
    }
    this._piece_drawer.update(null);
  }

  private get _color() {
    if (this._ui_square_in_stand.is_selected) {
      return this._square_color.selected;
    }
    return this._square_color.normal;
  }

  private _update_square_graphic() {
    const color = this._color;
    this._graphic
      .beginFill(color)
      .drawRect(0, 0, this._sprite.width, this._sprite.height)
      .endFill();
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
    //   .beginFill(this._square_color.normal)
    //   .drawRect(0, 0, width, height)
    //   .endFill();
    container.addChild(graphic);
    return graphic;
  }

  private _attatch_click_event(sprite: PIXI.Sprite) {
    sprite.on("click", () => {
      // console.log(this._sprite.position);
      const skip_condition =
        this._ui_square_in_stand.number == 0 ||
        this._square_status == "selected";
      if (skip_condition) {
        return;
      }
      ClickEventController.instance.click_square(this);
      // this._square_status = "selected";
      // this.update_square_graphic();
      // const last_selected = SquareDrawer.last_selected_instance;
      // if (last_selected) {
      //   last_selected.square_status = "normal";
      //   last_selected.update_square_graphic();
      // }
      // SquareDrawer.last_selected_instance = this;
    });
  }
}
