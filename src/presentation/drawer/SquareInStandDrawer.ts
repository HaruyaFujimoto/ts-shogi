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

export class SquareInStandDrawer implements ISquareDrawer {
  private readonly square_color = {
    normal: ShogiBoardDrawer.shogi_board_color,
    selected: 0xff4b4b,
  };

  private container: PIXI.Container;
  private piece_drawer: PieceDrawer;

  private sprite: PIXI.Sprite;
  private graphic: PIXI.Graphics;
  private square_status: "normal" | "selected" | "last_move_to" = "normal";
  constructor(
    private ui_square_in_stand: UISquareInStand,
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
      this.ui_square_in_stand.piece
    );
    this.attatch_click_event(this.sprite);
  }

  get position(): PieceStand {
    return this.ui_square_in_stand.ui_piece_stand.value;
  }

  get piece(): Piece {
    return this.ui_square_in_stand.piece;
  }

  public update() {
    this.piece_drawer.update();
    this.update_square_graphic();
  }

  private get color() {
    if (this.ui_square_in_stand.is_selected) {
      return this.square_color.selected;
    }
    return this.square_color.normal;
  }

  private update_square_graphic() {
    const color = this.color;
    this.graphic
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
      const skip_condition =
        this.ui_square_in_stand.number == 0 || this.square_status == "selected";
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
      this.ui_square_in_stand.piece &&
      GameController.game.turn == this.ui_square_in_stand.piece.master
    ) {
      this.ui_square_in_stand.select();
      this.update_square_graphic();
      return true;
    }
    return false;
  }

  public unfocus() {
    this.ui_square_in_stand.unselect();
    this.update_square_graphic();
  }
}
