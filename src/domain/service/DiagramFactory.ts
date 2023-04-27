import { Diagram } from "../model/Diagram";
import { Player } from "../value/Player";
import { Turn } from "../value/Turn";
import { PieceSet } from "../model/PieceSet";
import { PieceSetFactory } from "./PieceSetFactory";

export class DiagramFactory {
  static factory() {
    const turn = new Turn(Player.Sente);
    const piece_set: PieceSet = PieceSetFactory.factory();
    const diagram = new Diagram(turn, piece_set);
    return diagram;
  }
}
