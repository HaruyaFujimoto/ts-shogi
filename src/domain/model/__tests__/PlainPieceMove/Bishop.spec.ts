import { Player } from "../../../value/Player";
import { SquarePosition } from "../../../value/SquarePosition";
import { move_area_test } from "./_helper";

/**
 * テストケース: (fike,rank)
 *  1,1
 *  5,5
 *  3,8
 *
 *  王・飛車・角は移動範囲判定に先後関係なし
 */
test('get PieceMove test as "Bishop"', () => {
  const piece_type = "Bishop";
  // 1,1
  let current_position = new SquarePosition(1, 1);
  let player_type = Player.Sente;
  let expect_pair_list = [
    // [ 1, 1 ],
    [2, 2],
    [3, 3],
    [4, 4],
    [5, 5],
    [6, 6],
    [7, 7],
    [8, 8],
    [9, 9],
  ];
  move_area_test(piece_type, player_type, current_position, expect_pair_list);

  // 5,5
  current_position = new SquarePosition(5, 5);
  player_type = Player.Sente;
  expect_pair_list = [
    [1, 1],
    [2, 2],
    [3, 3],
    [4, 4],
    // [ 5, 5 ],
    [6, 6],
    [7, 7],
    [8, 8],
    [9, 9],
    [1, 9],
    [2, 8],
    [3, 7],
    [4, 6],
    // [ 5, 5 ],
    [6, 4],
    [7, 3],
    [8, 2],
    [9, 1],
  ];
  move_area_test(piece_type, player_type, current_position, expect_pair_list);

  // 3,8
  current_position = new SquarePosition(3, 8);
  player_type = Player.Sente;
  expect_pair_list = [
    [1, 6],
    [2, 7],
    // [ 3, 8 ],
    [4, 9],
    [2, 9],
    // [ 3, 8 ],
    [4, 7],
    [5, 6],
    [6, 5],
    [7, 4],
    [8, 3],
    [9, 2],
  ];
  move_area_test(piece_type, player_type, current_position, expect_pair_list);
});
