import { range } from "../service/utils";

export class SquarePosition {
  constructor(public readonly file: number, public readonly rank: number) {}

  get is_in_shogi_board(): boolean {
    const numbers: number[] = range(1, 9);
    if (!numbers.includes(this.file) || !numbers.includes(this.rank)) {
      return false;
    }
    return true;
  }
}
