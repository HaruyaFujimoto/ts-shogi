import { Player } from "../../../value/Player";
import { SquarePosition } from "../../../value/SquarePosition";
import { move_area_test } from "./_helper";

/**
 * テストケース: (fike,rank)
 *  1,1
 *  5,5
 *
 *  王・飛車・角は移動範囲判定に先後関係なし
 */
test('get PieceMove test as "Rook"', () => {
  const piece_type = "Rook";
  // 1,1
  let current_position = new SquarePosition(1, 1);
  let player_type = Player.Sente;
  let expect_pair_list = [
    // [ 1, 1 ],
    [ 1, 2 ],
    [ 1, 3 ],
    [ 1, 4 ],
    [ 1, 5 ],
    [ 1, 6 ],
    [ 1, 7 ],
    [ 1, 8 ],
    [ 1, 9 ],
    // [ 1, 1 ],
    [ 2, 1 ],
    [ 3, 1 ],
    [ 4, 1 ],
    [ 5, 1 ],
    [ 6, 1 ],
    [ 7, 1 ],
    [ 8, 1 ],
    [ 9, 1 ]
  ];
  move_area_test(piece_type, player_type, current_position, expect_pair_list);

  // 5,5
  current_position = new SquarePosition(5, 5);
  player_type = Player.Sente;
  expect_pair_list = [
    [ 5, 1 ],
    [ 5, 2 ],
    [ 5, 3 ],
    [ 5, 4 ],
    // [ 5, 5 ],
    [ 5, 6 ],
    [ 5, 7 ],
    [ 5, 8 ],
    [ 5, 9 ],
    [ 1, 5 ],
    [ 2, 5 ],
    [ 3, 5 ],
    [ 4, 5 ],
    // [ 5, 5 ],
    [ 6, 5 ],
    [ 7, 5 ],
    [ 8, 5 ],
    [ 9, 5 ]
  ];
  move_area_test(piece_type, player_type, current_position, expect_pair_list);

});
