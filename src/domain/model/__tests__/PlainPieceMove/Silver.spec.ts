import { Player } from "../../../value/Player";
import { SquarePosition } from "../../../value/SquarePosition";
import { move_area_test } from "./_helper";

/**
 * テストケース: (fike,rank)
 *  5,5 先手
 *  5,5 後手
 *
 *  結果の配列のマスの位置は、将棋盤の左上から始まり、右へ、折り返して下へ、の順番
 */
test("get PieceMove test as \"Silver\"", () => {
  const piece_type = "Silver";
  // 5,5 先手
  let current_position = new SquarePosition(5, 5);
  let player_type = Player.Sente;
  let expect_pair_list = [
    [ 6, 4 ],
    [ 5, 4 ],
    [ 4, 4 ],
    // [ 6, 5 ],
    // [ 4, 5 ],
    [ 6, 6 ],
    // [ 5, 6 ],
    [ 4, 6 ],
  ];
  move_area_test(piece_type, player_type, current_position, expect_pair_list);

  // 5,5 後手
  current_position = new SquarePosition(5, 5);
  player_type = Player.Gote;
  expect_pair_list = [
    [ 4, 6 ],
    [ 5, 6 ],
    [ 6, 6 ],
    // [ 4, 5 ],
    // [ 6, 5 ],
    [ 4, 4 ],
    // [ 5, 4 ],
    [ 6, 4 ],
  ];
  move_area_test(piece_type, player_type, current_position, expect_pair_list);


});
