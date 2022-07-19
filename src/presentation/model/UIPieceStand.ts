import { PieceStand } from "../../domain/model/PieceStand";
import { PieceType } from "../../domain/value/Piece";
import { Player, PlayerType } from "../../domain/value/Player";
import { DiagramDrawer } from "../drawer/DiagramDrawer";
import { PieceStandDrawer } from "../drawer/PieceStandDrawer";
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
    square_size: number = DiagramDrawer.square_size
    ) {
    this._ui_square_in_stand_list = this._create_ui_square_in_stand_list(this._value.master)
  }

  get value() {
    return this._value;
  }

  get ui_square_in_stand_list() {
    return this. _ui_square_in_stand_list;
  }

  get selected_ui_square_in_stand(): UISquareInStand | null {
    for (let ui_square_in_stand of this._ui_square_in_stand_list) {
      if (ui_square_in_stand.is_selected) {
        return ui_square_in_stand;
      }
    }
    return null;
  }

  private _create_ui_square_in_stand_list(
    player_type: PlayerType,
  ) {
    // const containers: PieceContainers = {};
    const piece_array: PieceType[] = [
      "Pawn",
      // null,
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
    piece_array.map((piece_type) => {
      const ui_square_in_stand = new UISquareInStand(this, piece_type);
      ui_square_in_stands.push(ui_square_in_stand);
    });
    return ui_square_in_stands;
    // return containers;
  }
}
