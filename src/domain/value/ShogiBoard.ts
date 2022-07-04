import { Square } from "./Square";

export interface ShogiBoard {
  [key: number]: { [key: number]: Square };
}
