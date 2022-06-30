import { Diagram } from "../value/Diagram"
import { Move } from "../value/Move"
import { PieceInHand } from "../value/PieceInHand"
import { FileRank, Square } from "../value/Square"

type MoveOption = {
  from?: FileRank,
  to: FileRank,
  promotion: boolean,
}

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
