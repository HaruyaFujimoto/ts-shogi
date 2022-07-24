import { DiagramFactory } from "../../service/DiagramFactory";
import { MoveFactory } from "../../service/MoveFactory";
import { Move } from "../Move";

test("Move test", () => {
  const diagram = DiagramFactory.factory();
  const move: Move = MoveFactory.create_move_from_pair(diagram, {
    from: [7, 7],
    to: [7, 6],
    promotion: false,
  });
  diagram.moved(move);
  const expect_string =
    "987654321 \n" +
    "LNSGKGSNL1\n" +
    "-R-----B-2\n" +
    "PPPPPPPPP3\n" +
    "---------4\n" +
    "---------5\n" +
    "--P------6\n" +
    "PP-PPPPPP7\n" +
    "-B-----R-8\n" +
    "LNSGKGSNL9\n";
  expect(diagram.diagram_to_string()).toEqual(expect_string);
});
