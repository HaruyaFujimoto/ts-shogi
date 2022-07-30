import { Diagram } from "../model/Diagram";
import { Square } from "../value/Square";
import { SquarePosition } from "../value/SquarePosition";
import { PieceMoveAreaFactory } from "./PlainPieceMoveAreaFactory";

export class PieceMoveAreaServer {
  static get_move_area(square: Square, diagram: Diagram) {
    console.time("get_move_area");
    const piece = square.piece;
    if (!piece) {
      console.error(diagram.diagram_to_string);
      const { file, rank } = square.position;
      throw Error(`There is no piece, in file: ${file}, rank: ${rank}`);
    }
    const move_area: SquarePosition[] = PieceMoveAreaFactory.factory(
      piece.type
    ).get_square_positions_as_on_diagram(square.position, diagram);
    console.timeEnd("get_move_area");
    return move_area;
  }

  static is_target_square_in_move_area(
    selected_square: Square,
    target_square: Square,
    diagram: Diagram
  ) {
    const piece = selected_square.piece;
    if (!piece) {
      const { file, rank } = selected_square.position;
      throw Error(`There is no piece, in file: ${file}, rank: ${rank}`);
    }
    const move_area: SquarePosition[] = PieceMoveAreaFactory.factory(
      piece.type
    ).get_square_positions_as_on_diagram(selected_square.position, diagram);
    for (let square_position of move_area) {
      if (square_position.equals(target_square.position)) {
        return true;
      }
    }
    return false;
  }
}
