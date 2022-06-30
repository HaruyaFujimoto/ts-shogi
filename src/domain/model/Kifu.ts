import { Diagram } from "./Diagram";
import { Move } from "../value/Move";

export class Kifu {
  constructor(
    public readonly initial_diagram: Diagram,
    public move_history: Move[] = []
  ) {}

  get diagram(): Diagram {
    const diagram = this.initial_diagram;

    return diagram;
  }

  public add_move(move: Move) {
    this.move_history.push(move);
  }
}
