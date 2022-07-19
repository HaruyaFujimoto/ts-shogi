import * as PIXI from "pixi.js";
import { PieceType } from "../../domain/value/Piece";
import { Player, PlayerType } from "../../domain/value/Player";
import { UIPieceStand } from "../model/UIPieceStand";
import { create_pixi_container } from "../PIXIApplication";
import { ShogiBoardDrawer } from "./ShogiBoardDrawer";
import { SquareInStandDrawer } from "./SquareInStandDrawer";

export type PieceStandDrawers = Map<PlayerType, PieceStandDrawer>;

export class PieceStandDrawer {
  static readonly piece_stand_color: number =
    ShogiBoardDrawer.shogi_board_color;

  private _container: PIXI.Container;
  private _sprite: PIXI.Sprite;
  private _graphic: PIXI.Graphics;
  private _square_in_stand_drawers: SquareInStandDrawer[];
  constructor(
    private _ui_piece_stand: UIPieceStand,
    x: number,
    y: number,
    width: number,
    height: number,
    square_size: number
  ) {
    // this._ui_piece_stand.value.take_piece(new Piece("Pawn", this._ui_piece_stand.value.master));
    // this._ui_piece_stand.value.take_piece(new Piece("Lance", this._ui_piece_stand.value.master));
    // this._ui_piece_stand.value.take_piece(new Piece("kNight", this._ui_piece_stand.value.master));
    // this._ui_piece_stand.value.take_piece(new Piece("Silver", this._ui_piece_stand.value.master));
    // this._ui_piece_stand.value.take_piece(new Piece("Gold", this._ui_piece_stand.value.master));
    // this._ui_piece_stand.value.take_piece(new Piece("Bishop", this._ui_piece_stand.value.master));
    // this._ui_piece_stand.value.take_piece(new Piece("Rook", this._ui_piece_stand.value.master));

    // stand
    this._container = create_pixi_container(x, y, width, height);
    this._sprite = this._add_sprite(this._container, width, height);
    this._graphic = this._add_graphic(this._container, width, height);
    // pieces
    // this.piece_containers = this.create_pieces_contaners(square_size);
    this._square_in_stand_drawers = this._create_square_in_stand_drawers(
      this._ui_piece_stand,
      square_size,
      this._container
    );
    // this.draw_pieces(this._ui_piece_stand.value, this.piece_containers);
  }

  get selected_square_in_stand_drawer(): SquareInStandDrawer | null {
    for (let square_in_stand_drawer of this._square_in_stand_drawers) {
      const ui_square_in_stand = square_in_stand_drawer.ui_square_in_stand;
      if (ui_square_in_stand.is_selected) {
        return square_in_stand_drawer;
      }
    }
    return null;
  }

  public update() {
    this._square_in_stand_drawers.map((square_in_stand_drawer) => {
      square_in_stand_drawer.update();
    });
    return;
  }

  private _create_square_in_stand_drawers(
    ui_piece_stand: UIPieceStand,
    square_size: number,
    container: PIXI.Container
  ) {
    // const containers: PieceContainers = {};
    const square_in_stand_drawers: SquareInStandDrawer[] = [];
    const piece_array: (PieceType | "")[] = [
      "Pawn",
      "",
      "Lance",
      "kNight",
      "Silver",
      "Gold",
      "Bishop",
      "Rook",
    ];
    if (ui_piece_stand.value.master == Player.Gote) {
      piece_array.reverse();
    }
    // main
    ui_piece_stand.ui_square_in_stand_list.map( (ui_square_in_stand) => {
      const index = piece_array.indexOf(ui_square_in_stand.piece_type);
      const x = container.x + square_size * (index % 2);
      const y = container.y + square_size * Math.floor(index / 2);
      const width = square_size;
      const height = square_size;
      // const container = create_pixi_container(x, y, width, height);
      // this.add_sprite(container, width, height);
      // containers[piece_type] = container;
      // new
      const square_in_stand_drawer = new SquareInStandDrawer(
        ui_piece_stand,
        ui_square_in_stand,
        x,
        y,
        width,
        height
      );
      square_in_stand_drawers.push(square_in_stand_drawer);
    });
    return square_in_stand_drawers;
  }

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
