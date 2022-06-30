import { SquarePosition } from "../SquarePosition";
import { range } from "../../service/utils";

test("SquarePosition check method test", () => {
  for (const i of range(0, 11)) {
    for (const j of range(0, 11)) {
      const file_rank_numbers = range(1, 9);
      const expect_bool =
        file_rank_numbers.includes(i) && file_rank_numbers.includes(j);
      expect(new SquarePosition(i, j).is_in_shogi_board).toBe(expect_bool);
    }
  }
});
