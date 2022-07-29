import { Diagram } from "../../domain/model/Diagram";
import { Kifu } from "../../domain/model/Kifu";
import { DiagramFactory } from "../../domain/service/DiagramFactory";
import { Move } from "../../domain/value/Move";
import { MoveFactory } from "../../domain/service/MoveFactory";
import { PlayerType } from "../../domain/value/Player";
import { FileRankPair } from "../../domain/value/FileRankNumber";
// import { Piece } from "../../domain/value/Piece";
// import { Rule } from "./Rule";

export class GameProgress {
  private _kifu: Kifu;
  private _diagram: Diagram;

  constructor() {
    // create ShogiBoard and PieceStands
    this._diagram = DiagramFactory.factory();
    // create Players and Turn
    this._kifu = new Kifu(this._diagram);

    // for test
    this._add_move_as_pair([7, 7], [7, 6]);
    this._add_move_as_pair([3, 3], [3, 4]);
    this._add_move_as_pair([8, 8], [2, 2]);
    // for test
    // const ui_piece_stands = this._diagram.piece_stands;
    // ui_piece_stands.forEach( (ui_piece_stand) => {
    //   ui_piece_stand.take_piece(new Piece("Pawn", ui_piece_stand.master));
    //   ui_piece_stand.take_piece(new Piece("Lance", ui_piece_stand.master));
    //   ui_piece_stand.take_piece(new Piece("kNight", ui_piece_stand.master));
    //   ui_piece_stand.take_piece(new Piece("Silver", ui_piece_stand.master));
    //   ui_piece_stand.take_piece(new Piece("Gold", ui_piece_stand.master));
    //   ui_piece_stand.take_piece(new Piece("Bishop", ui_piece_stand.master));
    //   ui_piece_stand.take_piece(new Piece("Rook", ui_piece_stand.master));
    // });
    // this.add_move([3, 1], [2, 2]);
    // const from: Square = this._diagram.shogi_board[7][7];
    // const to: Square = this._diagram.shogi_board[7][6];
    // const move = new Move(from, to, false);
    // console.dir(this._diagram.piece_stands.get(Player.Sente)?.pieces);
    // console.dir(this._diagram.piece_stands.get(Player.Gote)?.pieces);
  }

  get diagram(): Diagram {
    return this._diagram;
  }

  get kifu(): Kifu {
    return this._kifu;
  }

  get turn(): PlayerType {
    return this._diagram.turn;
  }

  private _add_move_as_pair(
    from: FileRankPair,
    to: FileRankPair,
    promotion = false
  ) {
    const move: Move = MoveFactory.create_move_from_pair(this._diagram, {
      from: from,
      to: to,
      promotion: promotion,
    });
    this._kifu.add_move(move);
    this._diagram.moved(move);
  }

  public add_move(move: Move) {
    this._kifu.add_move(move);
    this._diagram.moved(move);
    console.log(this._diagram.turn);
  }
}
