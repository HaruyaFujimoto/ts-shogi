import * as PIXI from "pixi.js";
import { PieceDrawer } from "./PieceDrawer";
import { ShogiBoardDrawer } from "./ShogiBoardDrawer";
import { create_pixi_container } from "../PIXIApplication";
import { UISquare } from "../model/UISquare";
import { ClickEventController } from "../controller/ClickEventController";
import { GameController } from "../controller/GameController";
import { Piece } from "../../domain/value/Piece";
import { SquarePosition } from "../../domain/value/SquarePosition";
import { PieceStand } from "../../domain/model/PieceStand";

export interface SquareDrawers {
  [key: string]: { [key: string]: SquareDrawer };
}

export interface ISquareDrawer {
  focus: () => boolean;
  unfocus: () => void;
  position: SquarePosition | PieceStand;
  piece: Piece | null;
}

export class SquareDrawer implements ISquareDrawer {
  private readonly _square_color = {
    normal: ShogiBoardDrawer.shogi_board_color,
    selected: 0xff4b4b,
    last_move_to: 0xe68080,
  };
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
    // this.graphic = this.add_graphic_into_container(this._container, width, height);
    this._graphic = this._add_graphic_into_container(this._container);
    this._update_square_graphic();
    this._piece_drawer = this._create_piece_drawer(this.piece, this._container);
    // new PieceDrawer(
    //   this._container,
    //   this._ui_square.value.piece
    // );
    this._attatch_click_event(this._sprite);
  }

  get position(): SquarePosition {
    return this._ui_square.value.position;
  }

  get piece(): Piece | null {
    return this._ui_square.value.piece;
  }

  get ui_square() {
    return this._ui_square;
  }

  public update() {
    this._piece_drawer.update(this.piece);
    this._update_square_graphic();
  }

  public focus(): boolean {
    if (
      this._ui_square.value.piece &&
      GameController.game.turn == this._ui_square.value.piece.master
    ) {
      this._ui_square.select();
      this._update_square_graphic();
      return true;
    }
    return false;
  }

  public unfocus() {
    this.ui_square.unselect();
    this._update_square_graphic();
  }

  private get _color() {
    if (this._ui_square.is_selected) {
      return this._square_color.selected;
    }
    if (this._ui_square.is_last_move_to) {
      return this._square_color.last_move_to;
    }
    return this._square_color.normal;
  }

  private _create_piece_drawer(piece: Piece | null, container: PIXI.Container) {
    return new PieceDrawer(container, piece);
  }

  private _update_square_graphic() {
    const color = this._color;
    this._graphic
      .lineStyle(this._line_width, 0, 0.85)
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
    // graphic.lineStyle(this._line_width, 0, 0.85)
    //   .beginFill(this._square_color.normal)
    //   .drawRect(0, 0, width, height)
    //   .endFill();
    container.addChild(graphic);
    return graphic;
  }

  private _attatch_click_event(sprite: PIXI.Sprite) {
    sprite.on("click", () => {
      // console.log(this.sprite.position);
      const skip_condition = this._ui_square.is_selected;
      if (skip_condition) {
        return;
      }
      ClickEventController.instance.click_square(this);
      // this.square_status = "selected";
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
