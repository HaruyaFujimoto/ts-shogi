import { Diagram } from "../model/Diagram";
import { PieceStand } from "../model/PieceStand";
import { FileRankPair } from "../value/FileRankNumber";
import { Move } from "../value/Move";
import { Square } from "../value/Square";

export type MoveOptionAsPair = {
  from?: FileRankPair;
  to: FileRankPair;
  promotion: boolean;
};

export class MoveFactory {
  static create_move_from_pair(diagram: Diagram, option: MoveOptionAsPair) {
    const to = diagram.get_square(option.to);
    if (option.from) {
      const from: Square = diagram.get_square(option.from);
      return new Move(from, to, option.promotion);
    }
    const from: PieceStand = diagram.piece_stands.get(
      diagram.turn
    ) as PieceStand;
    // new PieceStand(diagram.turn, []);
    return new Move(from, to, option.promotion);
  }
}
