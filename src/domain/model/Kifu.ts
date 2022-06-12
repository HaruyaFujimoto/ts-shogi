import { Diagram } from "../value/Diagram";
import { Move } from "../value/Move";

export class Kifu {
  constructor(
    public readonly initial_diagram: Diagram,
    public move_history: Move[] = [],
  ) {}

  public add_move(move: Move) {
    this.move_history.push(move);
  }

}
