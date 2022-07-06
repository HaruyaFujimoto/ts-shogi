import { UISquare } from "./UISquare";

export interface UIShogiBoard {
  [key: string]: { [key: string]: UISquare };
}
