import {
  FileRankNumber,
  FileRankPair,
  file_rank_numbers,
} from "../value/FileRankNumber";

export class FileRank {
  static get numbers(): FileRankNumber[] {
    return [...new Array(file_rank_numbers.length)].map(
      (_, i) => (1 + i) as FileRankNumber
    );
  }

  static is_in_file_rank_number(
    file_number: number,
    rank_number: number
  ): boolean {
    const numbers: number[] = file_rank_numbers.map((n) => n as number);
    if (!numbers.includes(file_number)) {
      return false;
    }
    if (!numbers.includes(rank_number)) {
      return false;
    }
    return true;
  }

  static cast_number_to_file_rank(number: number): FileRankNumber {
    const numbers: number[] = file_rank_numbers.map((n) => n as number);
    const index = numbers.indexOf(number);
    if (index < 0) {
      throw Error(
        `The number "${number}" is not in range of file rank numbers.`
      );
    }
    return file_rank_numbers[index];
  }

  static map<T>(func: (file: FileRankNumber, rank: FileRankNumber) => T): T[] {
    const result_array: T[] = [];
    FileRank.numbers.map((file) => {
      FileRank.numbers.map((rank) => {
        const result = func(file, rank);
        result_array.push(result);
      });
    });
    // for (let file of FileRank.numbers) {
    //   for (let rank of FileRank.numbers) {
    //     const result = func(file, rank);
    //     result_array.push(result);
    //   }
    // }
    return result_array;
  }

  static find(
    func: (file: FileRankNumber, rank: FileRankNumber) => boolean
  ): FileRankPair | null {
    for (let file of FileRank.numbers) {
      for (let rank of FileRank.numbers) {
        const result = func(file, rank);
        if (result) {
          return [file, rank];
        }
      }
    }
    return null;
  }
}
