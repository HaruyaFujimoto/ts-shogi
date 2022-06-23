import { Diagram } from "../../domain/value/Diagram";
import { Player } from "../../domain/value/Player";
import { Turn } from "../../domain/value/Turn";
import { Kifu } from "../../domain/model/Kifu";
// import { Rule } from "./Rule";

export class GameProgress {
  private turn: Turn;
  private kifu: Kifu;
  private diagram: Diagram;
  private players: Player[];

  constructor() {
    // create ShogiBoard and PieceStands
    this.diagram = Diagram.default_diagram();
    // create Players and Turn
    this.players = Player.create_players();
    this.turn = new Turn(Player.Sente);
    this.kifu = new Kifu(this.diagram);
  }

  get value() {
    return [this.kifu, this.turn, this.players];
  }
}
