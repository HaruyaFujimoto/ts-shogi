import { Player } from "../../../value/Player";
import { SquarePosition } from "../../../value/SquarePosition";
import { move_area_test } from "./_helper";

/**
 * テストケース: (fike,rank)
 *  1,9 先手
 *  1,9 後手
 *  9,1 後手
 */
test('get PieceMove test as "Lance"', () => {
  const piece_type = "Lance";
  // 1,9 先手
  let current_position = new SquarePosition(1, 9);
  let player_type = Player.Sente;
  let expect_pair_list = [
    [ 1, 1 ],
    [ 1, 2 ],
    [ 1, 3 ],
    [ 1, 4 ],
    [ 1, 5 ],
    [ 1, 6 ],
    [ 1, 7 ],
    [ 1, 8 ],
    // [ 1, 9 ],
  ];
  move_area_test(piece_type, player_type, current_position, expect_pair_list);

  // 1,9, 後手
  current_position = new SquarePosition(1, 9);
  player_type = Player.Gote;
  expect_pair_list = [
    // [ 1, 1 ],
    // [ 1, 2 ],
    // [ 1, 3 ],
    // [ 1, 4 ],
    // [ 1, 5 ],
    // [ 1, 6 ],
    // [ 1, 7 ],
    // [ 1, 8 ],
    // [ 1, 9 ],
  ];
  move_area_test(piece_type, player_type, current_position, expect_pair_list);

  // 9,1 後手
  current_position = new SquarePosition(9, 1);
  player_type = Player.Gote;
  expect_pair_list = [
    // [ 9, 1 ],
    [ 9, 2 ],
    [ 9, 3 ],
    [ 9, 4 ],
    [ 9, 5 ],
    [ 9, 6 ],
    [ 9, 7 ],
    [ 9, 8 ],
    [ 9, 9 ],
  ];
  move_area_test(piece_type, player_type, current_position, expect_pair_list);
});
