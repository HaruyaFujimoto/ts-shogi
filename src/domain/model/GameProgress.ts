import { Diagram } from "../value/Diagram";
import { PieceStand } from "../value/PieceStand";
import { Player, PlayerType, PlayerTypes } from "../value/Player";
import { ShogiBoard } from "../value/ShogiBoard";
import { Turn } from "../value/Turn";
import { Kifu } from "./Kifu";

export class GameProgress {
  private shogi_board: ShogiBoard;
  private turn: Turn;
  private kifu: Kifu;
  private piece_stands: Map<PlayerType,PieceStand>;
  private players: Player[];

  constructor() {
    // diagram data
    this.shogi_board = ShogiBoard.generate_shogi_board(9, 9);
    this.piece_stands = new Map();
    for(let player_type of PlayerTypes) {
      this.piece_stands.set(player_type,new PieceStand(player_type, []));
    }
    // player data
    this.players = [
      new Player(Player.Sente, new Map()),
      new Player(Player.Gote, new Map()),
    ];
    this.turn = new Turn(Player.Sente);
    // game data
    this.turn = new Turn(Player.Sente);
    const initial_diagram = new Diagram(this.shogi_board, this.piece_stands)
    this.kifu = new Kifu(initial_diagram);
    // put pieces
  }

  get() {
    return [
      this.kifu, this.turn, this.players
    ];
  }
}
