import { Diagram } from "../../model/Diagram";
import { DiagramFactory } from "../../service/DiagramFactory";

test("Diagram create test", () => {
  const diagram: Diagram = new DiagramFactory().default_diagram();
  const expect_string =
    "987654321 \n" +
    "LNSGKGSNL1\n" +
    "-R-----B-2\n" +
    "PPPPPPPPP3\n" +
    "---------4\n" +
    "---------5\n" +
    "---------6\n" +
    "PPPPPPPPP7\n" +
    "-B-----R-8\n" +
    "LNSGKGSNL9\n";
  expect(diagram.diagram_to_string()).toEqual(expect_string);
});
