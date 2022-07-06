export const file_rank_numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const;

export type FileRankNumber = typeof file_rank_numbers[number];

export type FileRankPair = [FileRankNumber, FileRankNumber];
