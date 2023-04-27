import { PieceSet } from "../model/PieceSet";
import { Rule } from "../model/Rule";

export class PieceSetFactory {
  static factory(): PieceSet {
    return Rule.InitialPieceSet;
  }
}
