import { FileRank } from "../FileRank";

test("FileRank is_in_file_rank_number method test", () => {
  expect(FileRank.is_in_file_rank_number(1, 1)).toBe(true);
  expect(FileRank.is_in_file_rank_number(1, 9)).toBe(true);
  expect(FileRank.is_in_file_rank_number(9, 9)).toBe(true);
  expect(FileRank.is_in_file_rank_number(1, 0)).toBe(false);
  expect(FileRank.is_in_file_rank_number(0, 1)).toBe(false);
  expect(FileRank.is_in_file_rank_number(10, 9)).toBe(false);
  expect(FileRank.is_in_file_rank_number(9, 10)).toBe(false);
});
