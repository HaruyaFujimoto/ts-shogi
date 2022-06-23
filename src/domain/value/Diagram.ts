import { ShogiBoard, ShogiBoardGenerator } from "./ShogiBoard";
import { PieceStand } from "./PieceStand";
import { PlayerType, PlayerTypes } from "./Player";
import { range } from "../service/utils";

export class Diagram {
  private _shogi_board: ShogiBoard;
  private _piece_in_hands: Map<PlayerType, PieceStand>;

  constructor(
    shogi_board?: ShogiBoard,
    piece_in_hands?: Map<PlayerType, PieceStand>
  ) {
    const default_shogi_board: ShogiBoard =
      ShogiBoardGenerator.create_shogi_board();
    this._shogi_board = shogi_board ?? default_shogi_board;
    const default_piece_stands = new Map(
      PlayerTypes.map((player_type) => [
        player_type,
        new PieceStand(player_type, []),
      ])
    );
    PlayerTypes.map((player_type) => {
      default_piece_stands.set(player_type, new PieceStand(player_type, []));
    });
    this._piece_in_hands = piece_in_hands ?? default_piece_stands;
  }

  get shogi_board(): ShogiBoard {
    return this._shogi_board;
  }

  get piece_in_hands(): Map<PlayerType, PieceStand> {
    return this._piece_in_hands;
  }

  public diagram_to_string() {
    let diagram_string = "";
    // shogi_board
    for (let i of range(0, 10)) {
      const r = i;
      for (let j of range(0, 10)) {
        const f = 9 - j;
        if (r == 0) {
          if (f == 0) {
            diagram_string += " ";
            continue;
          }
          diagram_string += f;
          continue;
        }
        if (f == 0) {
          diagram_string += r;
          continue;
        }
        diagram_string += this.shogi_board[f][r].piece?.type_initial || "-";
      }
      diagram_string += "\n";
    }
    return diagram_string;
  }

}
