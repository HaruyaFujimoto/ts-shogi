import { SquareDrawer } from "../drawer/SquareDrawer";

export interface UIShogiBoard {
  [key: string]: { [key: string]: SquareDrawer };
}
