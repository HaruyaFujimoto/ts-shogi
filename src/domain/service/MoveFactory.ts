import { Diagram } from "../model/Diagram";
import { FileRankPair } from "../value/FileRank";
import { Move } from "../value/Move";
import { PieceInHand } from "../value/PieceInHand";
import { Square } from "../value/Square";

type MoveOption = {
  from?: FileRankPair;
  to: FileRankPair;
  promotion: boolean;
};

export class MoveFactory {
  public create_move(diagram: Diagram, option: MoveOption) {
    const to = diagram.get_square(option.to);
    if (option.from) {
      const from: Square = diagram.get_square(option.from);
      return new Move(from, to, option.promotion);
    }
    const from: PieceInHand = new PieceInHand(diagram.turn);
    return new Move(from, to, option.promotion);
  }
}
