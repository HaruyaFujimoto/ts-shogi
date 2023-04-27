import { ShogiBoard } from "../value/ShogiBoard";
import { PieceStand, PieceStands } from "./PieceStand";
import { Move } from "../value/Move";
import { Piece, PiecePosition } from "../value/Piece";
import { Player, PlayerType } from "../value/Player";
import { Turn } from "../value/Turn";
import { Square } from "../value/Square";
import { FileRankPair } from "../value/FileRankNumber";
import { range } from "../service/utils";
import { PieceSet } from "./PieceSet";

type MoveFromSquare = {
  from: Square,
  to: Square,
  piece: Piece
};

type MoveFromPieceInHand = {
  from: PieceStand,
  to: Square,
  piece: Piece
}

export class Diagram {
  private _piece_stands: PieceStands = new Map([
    [Player.Sente, new PieceStand(Player.Sente, [])],
    [Player.Gote, new PieceStand(Player.Gote, [])],
  ]);

  constructor(
    private _turn: Turn,
    private _piece_set: PieceSet,
  ) {
  }

  get piece_set(): PieceSet {
    return this._piece_set;
  }

  get turn(): PlayerType {
    return this._turn.current_turn;
  }

  public moved(move: Move) {
    if (move.piece.master != this.turn) {
      throw Error(
        `Turn unmatched, current Turn is ${this.turn}, passed move's player is ${move.piece.master}`
      );
    }
    if (move.from instanceof Square) {
      this._moved_from_square(move as MoveFromSquare);
    }
    if (move.from instanceof PieceStand) {
      this._moved_from_piece_in_hand(move as MoveFromPieceInHand);
    }
    this._turn.advance();
  }

  private _moved_from_square(move: MoveFromSquare) {
    const from: Square = move.from;
    const to: Square = move.to;
    const target_position_piece = this._put_piece_into_square_position(
      from,
      to,
      move.piece
    );
    // 移動先に駒が居たら場合
    if (target_position_piece) {
      const player: PlayerType = move.piece.master;
      // 駒が取られる (駒の所有者の変更)
      target_position_piece.be_taken_by(player);
      // 駒台に駒を増やす
      const piece_stand = this._piece_stands.get(player) as PieceStand;
      piece_stand.take_piece(target_position_piece);
    }
  }

  private _moved_from_piece_in_hand(move: MoveFromPieceInHand) {
    const from: PieceStand = move.from;
    const to: Square = move.to;
    this._put_piece_into_square_position(from, to, move.piece);
  }

  private _put_piece_into_square_position(
    from: PiecePosition,
    to: Square,
    piece: Piece
  ): Piece | null {
    // remove piece in position come from
    

    if (from instanceof Square) {
      from.remove_piece();
    }
    if (from instanceof PieceStand) {
      const piece_stand = this.piece_stands.get(from.master) as PieceStand;
      piece_stand.release_piece(piece);
    }
    const target_position_piece = to.put_piece(piece);
    return target_position_piece;
  }

  public diagram_to_string() {
    let diagram_string = "";
    // shogi_board
    for (const i of range(0, 10)) {
      const r = i;
      for (const j of range(0, 10)) {
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
