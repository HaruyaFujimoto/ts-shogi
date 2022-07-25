import { Player } from "../../../value/Player";
import { SquarePosition } from "../../../value/SquarePosition";
import { move_area_test } from "./_helper";

/**
 * テストケース: (fike,rank)
 *  5,5 先手
 *  5,5 後手
 *  1,3 先手
 *  9,3 先手
 *  5,2 先手
 */
test('get PieceMove test as "kNight"', () => {
  const piece_type = "kNight";
  // 5,5 先手
  let current_position = new SquarePosition(5, 5);
  let player_type = Player.Sente;
  let expect_pair_list = [
    [4, 3],
    [6, 3],
  ];
  move_area_test(piece_type, player_type, current_position, expect_pair_list);

  // 5,5 後手
  current_position = new SquarePosition(5, 5);
  player_type = Player.Gote;
  expect_pair_list = [
    [4, 7],
    [6, 7],
  ];
  move_area_test(piece_type, player_type, current_position, expect_pair_list);

  // 1,3 先手
  current_position = new SquarePosition(1, 3);
  player_type = Player.Sente;
  expect_pair_list = [[2, 1]];
  move_area_test(piece_type, player_type, current_position, expect_pair_list);

  // 9,3 先手
  current_position = new SquarePosition(9, 3);
  player_type = Player.Sente;
  expect_pair_list = [[8, 1]];
  move_area_test(piece_type, player_type, current_position, expect_pair_list);

  // 5,2 先手
  current_position = new SquarePosition(5, 2);
  player_type = Player.Sente;
  expect_pair_list = [];
  move_area_test(piece_type, player_type, current_position, expect_pair_list);
});
