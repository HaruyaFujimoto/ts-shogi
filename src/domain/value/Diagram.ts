import { ShogiBoard } from "./ShogiBoard";
import { PieceStand, PieceStands } from "./PieceStand";
import { range } from "../service/utils";
import { Move } from "./Move";
import { Piece, PiecePosition } from "./Piece";
import { Player, PlayerType } from "./Player";
import { PieceInHand } from "./PieceInHand";
import { Turn } from "./Turn";
import { Square, FileRank } from "./Square";

export class Diagram {
  private _piece_in_hands: PieceStands = new Map([
    [
      Player.Sente,
      new PieceStand(Player.Sente, [])
    ],
    [
      Player.Gote,
      new PieceStand(Player.Gote, [])
    ],
  ]);

  constructor(
    private _turn: Turn,
    private _shogi_board: ShogiBoard,
    piece_in_hands?: PieceStands
  ) {
    if (piece_in_hands) {
      this._piece_in_hands = piece_in_hands;
    }
  }

  get shogi_board(): ShogiBoard {
    return this._shogi_board;
  }

  get piece_in_hands(): PieceStands {
    return this._piece_in_hands;
  }

  get turn(): PlayerType {
    return this._turn.current_turn;
  }

  public get_square(file_rank: FileRank): Square {
    return this.shogi_board[file_rank[0]][file_rank[1]];
  }

  public moved(move: Move) {
    if (move.piece.master != this.turn) {
      throw Error(`Turn unmatched, current Turn is ${this.turn}, passed move's player is ${move.piece.master}`);
    }
    if (move.from instanceof Square) {
      this._moved_from_square_position(move);

    }
    if (move.from instanceof PieceInHand) {
      this._moved_from_piece_in_hand(move);
    }
    this._turn.advance();
  }

  private _moved_from_square_position(move: Move) {
    const from: Square = <Square>move.from;
    const to: Square = move.to;
    const target_position_piece = this._move_piece_into_square_position(from, to, move.piece);
    // 移動先に駒が居たら場合
    if (target_position_piece) {
      // 駒が取られる (駒の所有者の変更)
      target_position_piece.be_taken();
      // 駒台に駒を増やす
      const player: PlayerType = move.piece.master;
      this._piece_in_hands.get(player)?.get_piece(target_position_piece);
    }
  }

  private _moved_from_piece_in_hand(move: Move) {
    const from: PieceInHand = <PieceInHand>move.from;
    const to: Square = move.to;
    this._move_piece_into_square_position(from, to, move.piece);
  }

  private _move_piece_into_square_position(from: PiecePosition, to: Square, piece: Piece): Piece | null {
    if (from instanceof Square) {
      from.piece = null;
    }
    if (from instanceof PieceInHand) {
      this.piece_in_hands.get(from.master)?.release_piece(piece);
    }
    const target_position_piece = to.piece;
    to.piece = piece;
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
