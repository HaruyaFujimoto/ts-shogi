import * as PIXI from "pixi.js";
import { Square } from "../../domain/value/Square";
import { PieceDrawer } from "./PieceDrawer";
import { ShogiBoardDrawer } from "./ShogiBoardDrawer";
import { create_pixi_container } from "../PIXIApplication";

export class SquareDrawer {
  private static last_selected_instance: SquareDrawer | null = null;

  private readonly square_color = {
    normal: ShogiBoardDrawer.shogi_board_color,
    selected: 0xff4b4b,
    last_move_to: 0xff824b,
  };
  private readonly line_width = ShogiBoardDrawer.line_width;

  private container: PIXI.Container;
  private piece_drawer: PieceDrawer;

  private sprite: PIXI.Sprite;
  private graphic: PIXI.Graphics;
  private square_status: "normal" | "selected" | "last_move_to" = "normal";
  constructor(
    private square: Square,
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
    this.piece_drawer = new PieceDrawer(this.container, this.square.piece);
    this.attatch_click_event(this.sprite);
  }

  public update(square: Square) {
    this.piece_drawer.update(square.piece);
    this.update_square_graphic();
  }

  private update_square_graphic() {
    const color = this.square_color[this.square_status];
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
      const skip_condition =
        !this.square.piece || this.square_status == "selected";
      if (skip_condition) {
        return;
      }
      this.square_status = "selected";
      this.update_square_graphic();
      const last_selected = SquareDrawer.last_selected_instance;
      if (last_selected) {
        last_selected.square_status = "normal";
        last_selected.update_square_graphic();
      }
      SquareDrawer.last_selected_instance = this;
    });
  }
}
