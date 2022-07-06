import * as PIXI from "pixi.js";
import { Piece, PieceType } from "../../domain/value/Piece";
import { Player, PlayerType } from "../../domain/value/Player";
import { UIPieceStand } from "../model/UIPieceStand";
import { UISquareInStand } from "../model/UISquareInStand";
import { create_pixi_container } from "../PIXIApplication";
import { ShogiBoardDrawer } from "./ShogiBoardDrawer";
import { SquareInStandDrawer } from "./SquareInStandDrawer";

export type PieceStandDrawers = Map<PlayerType, PieceStandDrawer>;

export class PieceStandDrawer {
  static readonly piece_stand_color: number =
    ShogiBoardDrawer.shogi_board_color;

  private container: PIXI.Container;
  private sprite: PIXI.Sprite;
  private graphic: PIXI.Graphics;
  private square_in_stand_drawers: SquareInStandDrawer[] = [];
  constructor(
    private ui_piece_stand: UIPieceStand,
    x: number,
    y: number,
    width: number,
    height: number,
    square_size: number
  ) {
    // this.ui_piece_stand.value.take_piece(new Piece("Pawn", this.ui_piece_stand.value.master));
    // this.ui_piece_stand.value.take_piece(new Piece("Lance", this.ui_piece_stand.value.master));
    // this.ui_piece_stand.value.take_piece(new Piece("kNight", this.ui_piece_stand.value.master));
    // this.ui_piece_stand.value.take_piece(new Piece("Silver", this.ui_piece_stand.value.master));
    // this.ui_piece_stand.value.take_piece(new Piece("Gold", this.ui_piece_stand.value.master));
    // this.ui_piece_stand.value.take_piece(new Piece("Bishop", this.ui_piece_stand.value.master));
    // this.ui_piece_stand.value.take_piece(new Piece("Rook", this.ui_piece_stand.value.master));
    // stand
    this.container = create_pixi_container(x, y, width, height);
    this.sprite = this.add_sprite(this.container, width, height);
    this.graphic = this.add_graphic(this.container, width, height);
    // pieces
    // this.piece_containers = this.create_pieces_contaners(square_size);
    this.create_pieces_contaners(square_size);
    // this.draw_pieces(this.ui_piece_stand.value, this.piece_containers);
  }

  private create_pieces_contaners(square_size: number) {
    // const containers: PieceContainers = {};
    const piece_array = [
      "Pawn",
      "",
      "Lance",
      "kNight",
      "Silver",
      "Gold",
      "Bishop",
      "Rook",
    ];
    if (this.ui_piece_stand.value.master == Player.Gote) {
      piece_array.reverse();
    }
    piece_array.map((piece_type, index) => {
      if (!piece_type) {
        return;
      }
      const x = this.container.x + square_size * (index % 2);
      const y = this.container.y + square_size * Math.floor(index / 2);
      const width = square_size;
      const height = square_size;
      // const container = create_pixi_container(x, y, width, height);
      // this.add_sprite(container, width, height);
      // containers[piece_type] = container;
      // new
      const piece = // this.ui_piece_stand.value.get_piece(piece_type as PieceType);
        new Piece(piece_type as PieceType, this.ui_piece_stand.value.master);
      const ui_square_in_stand = new UISquareInStand(
        this.ui_piece_stand,
        piece,
        this.ui_piece_stand.value.pieces[piece_type]
      );
      const square_in_stand_drawer = new SquareInStandDrawer(
        ui_square_in_stand,
        x,
        y,
        width,
        height
      );
      this.square_in_stand_drawers.push(square_in_stand_drawer);
    });
    // return containers;
  }

  private add_sprite(container: PIXI.Container, width: number, height: number) {
    const sprite = new PIXI.Sprite();
    container.addChild(sprite);
    sprite.interactive = true;
    sprite.width = width;
    sprite.height = height;
    return sprite;
  }

  private add_graphic(
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

  public update() {
    this.square_in_stand_drawers.map((square_in_stand_drawer) => {
      square_in_stand_drawer.update();
    });
    return;
  }
}
