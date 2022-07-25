import { Player } from "../../../value/Player";
import { SquarePosition } from "../../../value/SquarePosition";
import { move_area_test } from "./_helper";

/**
 * テストケース: (fike,rank)
 *  7,7 先手
 *  5,1 先手
 *  3,3 後手
 *  5,9 後手
 */
test('get PieceMove test as "Pawn"', () => {
  const piece_type = "Pawn";
  // 7,7 先手
  let current_position = new SquarePosition(7, 7);
  let player_type = Player.Sente;
  let expect_pair_list = [[7, 6]];
  move_area_test(piece_type, player_type, current_position, expect_pair_list);

  // 5,1 先手
  current_position = new SquarePosition(5, 1);
  player_type = Player.Sente;
  expect_pair_list = [];
  move_area_test(piece_type, player_type, current_position, expect_pair_list);

  // 3,3 後手
  current_position = new SquarePosition(3, 3);
  player_type = Player.Gote;
  expect_pair_list = [[3, 4]];
  move_area_test(piece_type, player_type, current_position, expect_pair_list);

  // 5,9 後手
  current_position = new SquarePosition(5, 9);
  player_type = Player.Gote;
  expect_pair_list = [];
  move_area_test(piece_type, player_type, current_position, expect_pair_list);
});
