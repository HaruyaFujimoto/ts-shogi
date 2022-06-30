import { Square } from "./Square";

export interface ShogiBoard {
  [key: string]: { [key: string]: Square };
}
