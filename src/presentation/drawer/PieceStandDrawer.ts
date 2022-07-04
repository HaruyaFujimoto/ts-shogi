import * as PIXI from "pixi.js";
import { PieceStand } from "../../domain/model/PieceStand";
import { PieceType, PieceTypes } from "../../domain/value/Piece";
import { PlayerType } from "../../domain/value/Player";
import { create_pixi_container } from "../PIXIApplication";
import { ShogiBoardDrawer } from "./ShogiBoardDrawer";

export type PieceStandDrawers = Map<PlayerType, PieceStandDrawer>;

export class PieceStandDrawer {
  static readonly piece_stand_color: number =
    ShogiBoardDrawer.shogi_board_color;

  private container: PIXI.Container;
  private sprite: PIXI.Sprite;
  private graphic: PIXI.Graphics;
  constructor(
    private piece_stand: PieceStand,
    x: number,
    y: number,
    width: number,
    height: number
  ) {
    this.container = create_pixi_container(x, y, width, height);
    this.sprite = this.add_sprite(this.container, width, height);
    this. graphic = this.add_graphic(this.container, width, height);
  }

  private add_sprite(container: PIXI.Container, width: number, height: number) {
    const sprite = new PIXI.Sprite();
    container.addChild(sprite);
    sprite.interactive = true;
    sprite.width = width;
    sprite.height = height;
    return sprite;
  }

  private add_graphic(container: PIXI.Container, width: number, height: number) {
    const graphic = new PIXI.Graphics();
    container.addChild(graphic);
    graphic.beginFill(PieceStandDrawer.piece_stand_color);
    graphic.drawRect(0, 0, width, height);
    graphic.endFill();
    return graphic;
  }

  public update() {
    return;
  }

  private draw_pieces(piece_stand: PieceStand, container: PIXI.Container) {
    PieceTypes.map(
      (piece_type: PieceType) => {
        this.draw_piece(piece_type, piece_stand.pieces[piece_type], container);
      }
    )
  }

  private draw_piece(piece_type: PieceType, n: number, container: PIXI.Container) {
    if (n < 1) {
      return;
    }

  }
}
