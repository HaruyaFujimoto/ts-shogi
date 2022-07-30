import { FileRankNumber, FileRankPair } from "./FileRankNumber";

export class SquarePosition {
  constructor(
    public readonly file: FileRankNumber,
    public readonly rank: FileRankNumber
  ) {}

  get pair(): FileRankPair {
    return [this.file, this.rank];
  }

  public equals(square_position: SquarePosition) {
    const {file, rank} = square_position;
    return file == this.file && rank == this.rank;
  }
}
