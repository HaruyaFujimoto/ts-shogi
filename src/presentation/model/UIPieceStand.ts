import { PieceStand } from "../../domain/model/PieceStand";
import { Piece, PieceType } from "../../domain/value/Piece";
import { Player, PlayerType } from "../../domain/value/Player";
import { PieceStandDrawer } from "../drawer/PieceStandDrawer";
import { ShogiBoardDrawer } from "../drawer/ShogiBoardDrawer";
import { UISquareInStand } from "./UISquareInStand";

export type UIPieceStands = Map<PlayerType, UIPieceStand>;

export class UIPieceStand {
  private _ui_square_in_stand_list: UISquareInStand[];
  private _drawer: PieceStandDrawer;

  constructor(
    private _value: PieceStand,
    x: number,
    y: number,
    width: number,
    height: number,
    square_size: number = ShogiBoardDrawer.square_size
  ) {
    this._drawer = this._create_drawer(x, y, width, height);
    this._ui_square_in_stand_list = this._create_ui_square_in_stand_list(
      this._value.master,
      this._drawer.x,
      this._drawer.y,
      square_size
    );

    this.value.take_piece(new Piece("Pawn", this.value.master));
    this.value.take_piece(new Piece("Lance", this.value.master));
    this.value.take_piece(new Piece("kNight", this.value.master));
    this.value.take_piece(new Piece("Silver", this.value.master));
    this.value.take_piece(new Piece("Gold", this.value.master));
    this.value.take_piece(new Piece("Bishop", this.value.master));
    this.value.take_piece(new Piece("Rook", this.value.master));
    this.update();
  }

  get value() {
    return this._value;
  }

  get ui_square_in_stand_list() {
    return this._ui_square_in_stand_list;
  }

  get selected_ui_square_in_stand(): UISquareInStand | null {
    for (let ui_square_in_stand of this._ui_square_in_stand_list) {
      if (ui_square_in_stand.is_selected) {
        return ui_square_in_stand;
      }
    }
    return null;
  }

  public update() {
    this._update_mode();
    this._update_drawer();
    this._update_child_model();
  }

  private _update_mode() {}

  private _update_drawer() {
    this._drawer.update();
  }

  private _update_child_model() {
    this._ui_square_in_stand_list.map((ui_square_in_stand) => {
      ui_square_in_stand.update();
    });
  }

  private _create_ui_square_in_stand_list(
    player_type: PlayerType,
    container_x: number,
    container_y: number,
    square_size: number
  ) {
    // const containers: PieceContainers = {};
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
    if (player_type == Player.Gote) {
      piece_array.reverse();
    }
    const ui_square_in_stands: UISquareInStand[] = [];
    piece_array.map((piece_type, index) => {
      if (piece_type == "") {
        return;
      }
      const x = container_x + square_size * (index % 2);
      const y = container_y + square_size * Math.floor(index / 2);
      const width = square_size;
      const height = square_size;
      const ui_square_in_stand = new UISquareInStand(
        this,
        piece_type,
        x,
        y,
        width,
        height
      );
      ui_square_in_stands.push(ui_square_in_stand);
    });
    return ui_square_in_stands;
    // return containers;
  }

  private _create_drawer(
    x: number,
    y: number,
    width: number,
    height: number
  ): PieceStandDrawer {
    return new PieceStandDrawer(x, y, width, height);
  }
}
