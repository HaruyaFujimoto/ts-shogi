export type File = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type Rank = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export class SquarePosition {
  constructor(
    public readonly file: File,
    public readonly rank: Rank,
    ) {}
}
