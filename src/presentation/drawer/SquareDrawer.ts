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
  private readonly square_color = {
    normal: ShogiBoardDrawer.shogi_board_color,
    selected: 0xff4b4b,
    last_move_to: 0xe68080,
  };
  private readonly line_width = ShogiBoardDrawer.line_width;

  private container: PIXI.Container;
  private piece_drawer: PieceDrawer;

  private sprite: PIXI.Sprite;
  private graphic: PIXI.Graphics;
  constructor(
    private _ui_square: UISquare,
    x: number,
    y: number,
    width: number,
    height: number
  ) {
    this.container = create_pixi_container(x, y, width, height);
    this.sprite = this.add_sprite_into_container(this.container, width, height);
    // this.graphic = this.add_graphic_into_container(this.container, width, height);
    this.graphic = this.add_graphic_into_container(this.container);
    this.update_square_graphic();
    this.piece_drawer = new PieceDrawer(
      this.container,
      this._ui_square.value.piece
    );
    this.attatch_click_event(this.sprite);
  }

  public update() {
    this.piece_drawer.update();
    this.update_square_graphic();
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

  private get color() {
    if (this._ui_square.is_selected) {
      return this.square_color.selected;
    }
    if (this._ui_square.is_last_move_to) {
      return this.square_color.last_move_to;
    }
    return this.square_color.normal;
  }

  private update_square_graphic() {
    const color = this.color;
    this.graphic
      .lineStyle(this.line_width, 0, 0.85)
      .beginFill(color)
      .drawRect(0, 0, this.sprite.width, this.sprite.height)
      .endFill();
  }

  private add_sprite_into_container(
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

  private add_graphic_into_container(
    container: PIXI.Container
    // width: number,
    // height: number
  ): PIXI.Graphics {
    const graphic = new PIXI.Graphics();
    // graphic.lineStyle(this.line_width, 0, 0.85)
    //   .beginFill(this.square_color.normal)
    //   .drawRect(0, 0, width, height)
    //   .endFill();
    container.addChild(graphic);
    return graphic;
  }

  private attatch_click_event(sprite: PIXI.Sprite) {
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

  public focus(): boolean {
    if (
      this._ui_square.value.piece &&
      GameController.game.turn == this._ui_square.value.piece.master
    ) {
      this._ui_square.select();
      this.update_square_graphic();
      return true;
    }
    return false;
  }

  public unfocus() {
    this.ui_square.unselect();
    this.update_square_graphic();
  }
}
