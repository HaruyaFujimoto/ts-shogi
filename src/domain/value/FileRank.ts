const file_rank_numbers = [
  1,2,3,
  4,5,6,
  7,8,9
] as const;

export type FileRankNumber = typeof file_rank_numbers[number];

export type FileRankPair = [FileRankNumber, FileRankNumber];

export class FileRank {
  static get numbers(): FileRankNumber[] {
    return [...new Array(file_rank_numbers.length)].map((_, i) => (1 + i) as FileRankNumber);
  }

  static is_in_file_rank_number(file_number: number, rank_number: number): boolean {
    const numbers: number[] = file_rank_numbers.map( (n) => n as number);
    if (! numbers.includes(file_number)) {
      return false;
    }
    if (! numbers.includes(rank_number)) {
      return false;
    }
    return true;
  }

  static cast_number_to_file_rank(number: number): FileRankNumber {
    const numbers: number[] = file_rank_numbers.map( (n) => n as number);
    const index = numbers.indexOf(number);
    if (index < 0) {
      throw Error(`The number "${number}" is not in range of file rank numbers.`);
    }
    return file_rank_numbers[index];
  }

  static map(func:(file:FileRankNumber,rank: FileRankNumber)=>any) {
    const result_array = [];
    for (let file of FileRank.numbers) {
      for (let rank of FileRank.numbers) {
        const result = func(file, rank);
        result_array.push(result)
      }
    }
    return result_array;
  }
}

