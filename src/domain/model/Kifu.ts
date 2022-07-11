import { Diagram } from "./Diagram";
import { Move } from "../value/Move";

export class Kifu {
  constructor(
    public readonly initial_diagram: Diagram,
    private _move_history: Move[] = []
  ) {}

  get diagram(): Diagram {
    const diagram = this.initial_diagram;
    this._move_history.map((move) => {
      diagram.moved(move);
    });
    return diagram;
  }

  get steps(): number {
    return this._move_history.length;
  }

  get last_move(): Move | null {
    if (this.steps < 1) {
      return null;
    }
    return this._move_history.at(-1) as Move;
  }

  public add_move(move: Move) {
    this._move_history.push(move);
  }
}
