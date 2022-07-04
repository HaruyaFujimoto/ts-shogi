import { FileRankNumber } from "./FileRank";

export class SquarePosition {
  constructor(
    public readonly file: FileRankNumber,
    public readonly rank: FileRankNumber
  ) {}
}
