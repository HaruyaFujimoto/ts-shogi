import { Diagram } from "../value/Diagram";
import { Player } from "../value/Player";
import { Turn } from "../value/Turn";
import { Kifu } from "./Kifu";
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
    return [
      this.kifu, this.turn, this.players
    ];
  }

}
