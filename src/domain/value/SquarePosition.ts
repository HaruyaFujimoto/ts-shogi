// export type File = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

// export type Rank = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export class SquarePosition {
  constructor(
    public readonly file: number,
    public readonly rank: number,
    ) {
      const numbers = [1,2,3,4,5,6,7,8,9];
      if (!numbers.includes(file)) {
        throw new Error(`Invalid File number: ${file}`);
      }
      if (!numbers.includes(rank)) {
        throw new Error(`Invalid Rank number: ${rank}`);
      }
    }
  static checkNumbers(file: number, rank: number): boolean {
    const numbers = [1,2,3,4,5,6,7,8,9];
    if (!numbers.includes(file) || !numbers.includes(rank)) {
      return false;
    }
    return true;
  }
}
