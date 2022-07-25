import { Player } from "../../../value/Player";
import { SquarePosition } from "../../../value/SquarePosition";
import { move_area_test } from "./_helper";

/**
 * テストケース: (fike,rank)
 *  1,1
 *  5,5
 *  9,5
 *
 *  王・飛車・角は移動範囲判定に先後関係なし
 *  結果の配列のマスの位置は、将棋盤の左上から始まり、右へ、折り返して下へ、の順番
 */
test("get PieceMove test as \"King\"", () => {
  const piece_type = "King";
  // 1,1
  let current_position = new SquarePosition(1, 1);
  let player_type = Player.Sente;
  let expect_pair_list = [
    [2, 1],
    [2, 2],
    [1, 2],
  ];
  move_area_test(piece_type, player_type, current_position, expect_pair_list);

  // 5,5
  current_position = new SquarePosition(5, 5);
  player_type = Player.Sente;
  expect_pair_list = [
    [ 6, 4 ],
    [ 5, 4 ],
    [ 4, 4 ],
    [ 6, 5 ],
    [ 4, 5 ],
    [ 6, 6 ],
    [ 5, 6 ],
    [ 4, 6 ],
  ];
  move_area_test(piece_type, player_type, current_position, expect_pair_list);

  // 9,5
  current_position = new SquarePosition(9, 9);
  player_type = Player.Sente;
  expect_pair_list = [
    [9, 8],
    [8, 8],
    [8, 9],
  ];
  move_area_test(piece_type, player_type, current_position, expect_pair_list);
});
