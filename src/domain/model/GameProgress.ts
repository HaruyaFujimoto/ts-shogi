import { range } from "../service/utils";
import { Diagram } from "../value/Diagram";
import { Piece } from "../value/Piece";
import { PieceStand } from "../value/PieceStand";
import { Player, PlayerTypes } from "../value/Player";
import { ShogiBoard } from "../value/ShogiBoard";
import { Turn } from "../value/Turn";
import { Kifu } from "./Kifu";
import { Rule } from "./Rule";

export class GameProgress {
  private turn: Turn;
  private kifu: Kifu;
  private diagram: Diagram;
  private players: Player[];

  constructor() {
    // create ShogiBoard and PieceStands
    this.diagram = this.create_init_diagram();
    // create Players and Turn
    this.players = this.create_players();
    this.turn = new Turn(Player.Sente);
    // put pieces
    this.deploy_pieces_into_shogi_board(this.diagram.shogi_board, Rule.InitialPiecePosition);
    this.kifu = new Kifu(this.diagram);
  }

  get value() {
    return [
      this.kifu, this.turn, this.players
    ];
  }

  private create_init_diagram() {
    const shogi_board = ShogiBoard.generate_shogi_board(9, 9);
    const piece_stands = new Map();
    PlayerTypes.map( (player_type) => {
      piece_stands.set(player_type,new PieceStand(player_type, []));
    });
    return new Diagram(shogi_board, piece_stands);
  }

  private create_players() {
    return [
      new Player(Player.Sente, new Map()),
      new Player(Player.Gote, new Map()),
    ];
  }

  private deploy_pieces_into_shogi_board(shogi_board: ShogiBoard,piecess: (Piece|null)[][]) {
    piecess.map( (pieces, i) => {
      pieces.map( (piece, j) => {
        if (piece) {
          const f = i + 1;
          const r = j + 1;
          shogi_board.value[f][r].piece = piece;
        }
      })
    })
  }

  public diagram_to_string() {
    let diagram_string = "";
    // shogi_board
    for (let i of range(0, 10)) {
      const r = i;
      for (let j of range(0,10)){
        const f = 9 - j
        if (r == 0) {
          if (f == 0) {
            diagram_string += ' ';
            continue;
          }
          diagram_string += f;
          continue;
        }
        if (f == 0) {
          diagram_string += r;
          continue;
        }
        diagram_string += this.diagram.shogi_board.value[f][r].piece?.type_initial || '-';
      };
      diagram_string += "\n";
    };
    return diagram_string;
  }
}
