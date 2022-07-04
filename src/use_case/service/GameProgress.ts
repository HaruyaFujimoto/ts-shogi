import { Diagram } from "../../domain/model/Diagram";
import { Kifu } from "../../domain/model/Kifu";
import { DiagramFactory } from "../../domain/service/DiagramFactory";
import { Move } from "../../domain/value/Move";
import { MoveFactory } from "../../domain/service/MoveFactory";
import { FileRank } from "../../domain/value/Square";
import { Player } from "../../domain/value/Player";
// import { Rule } from "./Rule";

export class GameProgress {
  private _kifu: Kifu;
  private _diagram: Diagram;

  constructor() {
    // create ShogiBoard and PieceStands
    this._diagram = new DiagramFactory().default_diagram();
    // create Players and Turn
    this._kifu = new Kifu(this._diagram);
    this.add_move([7, 7], [7, 6]);
    this.add_move([3, 3], [3, 4]);
    this.add_move([8, 8], [2, 2]);
    this.add_move([3, 1], [2, 2]);
    // const from: Square = this._diagram.shogi_board[7][7];
    // const to: Square = this._diagram.shogi_board[7][6];
    // const move = new Move(from, to, false);
    console.dir(this._diagram.piece_stands.get(Player.Sente)?.pieces);
    console.dir(this._diagram.piece_stands.get(Player.Gote)?.pieces);
  }

  get diagram(): Diagram {
    return this._diagram;
  }

  get kifu(): Kifu {
    return this._kifu;
  }

  private add_move(from: FileRank, to: FileRank, promotion = false) {
    const move: Move = new MoveFactory().create_move(this._diagram, {
      from: from,
      to: to,
      promotion: promotion,
    });
    this._diagram.moved(move);
    this._kifu.add_move(move);
  }
}
