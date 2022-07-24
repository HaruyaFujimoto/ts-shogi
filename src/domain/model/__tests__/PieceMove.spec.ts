import { PieceMove } from "../PieceMove";
import { SquarePosition } from "../../value/SquarePosition";
import { PieceType } from "../../value/Piece";

function move_area_test(piece_type: PieceType, current_position: SquarePosition, expect_pair_list: number[][]) {
  // PieceMove 生成
  let piece_move = new PieceMove(piece_type, current_position);
  let move_area: SquarePosition[] = piece_move.getCanMoveArea();
  // テストの容易性のため、SquarePosition を FileRankPair 型にする
  let move_area_as_pair: number[][] = move_area.map((square_position) => square_position.pair);
  console.dir(move_area_as_pair);
  // 期待する SquarePosition[] の長さを比較
  expect(move_area.length).toEqual(expect_pair_list.length);
  // 期待する FileRankPair との比較、配列として比較
  move_area_as_pair.map((file_rank_pair, i) => {
    expect(file_rank_pair).toEqual(expect_pair_list[i]);
  });
}

test("get PieceMove test as \"King\"", () => {
  const piece_type = "King";
  let current_position = new SquarePosition(1, 1);
  let expect_pair_list = [
    [2, 1],
    [2, 2],
    [1, 2],
  ];
  move_area_test(piece_type, current_position, expect_pair_list);

  current_position = new SquarePosition(9, 9);
  expect_pair_list = [
    [9, 8],
    [8, 8],
    [8, 9],
  ];
  move_area_test(piece_type, current_position, expect_pair_list);
});

test('get PieceMove test as "Rook"', () => {
  const piece_type = "Rook";
  let current_position = new SquarePosition(1, 1);
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
  move_area_test(piece_type, current_position, expect_pair_list);

  current_position = new SquarePosition(5, 5);
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
  move_area_test(piece_type, current_position, expect_pair_list);

});


test('get PieceMove test as "Bishop"', () => {
  const piece_type = "Bishop";
  let current_position = new SquarePosition(1, 1);
  let expect_pair_list = [
    // [ 1, 1 ],
    [ 2, 2 ],
    [ 3, 3 ],
    [ 4, 4 ],
    [ 5, 5 ],
    [ 6, 6 ],
    [ 7, 7 ],
    [ 8, 8 ],
    [ 9, 9 ],
  ];
  move_area_test(piece_type, current_position, expect_pair_list);

  current_position = new SquarePosition(5, 5);
  expect_pair_list = [
    [ 1, 1 ],
    [ 2, 2 ],
    [ 3, 3 ],
    [ 4, 4 ],
    // [ 5, 5 ],
    [ 6, 6 ],
    [ 7, 7 ],
    [ 8, 8 ],
    [ 9, 9 ],
    [ 1, 9 ],
    [ 2, 8 ],
    [ 3, 7 ],
    [ 4, 6 ],
    // [ 5, 5 ],
    [ 6, 4 ],
    [ 7, 3 ],
    [ 8, 2 ],
    [ 9, 1 ],
  ];
  move_area_test(piece_type, current_position, expect_pair_list);

  current_position = new SquarePosition(3, 8);
  expect_pair_list = [
    [ 1, 6 ],
    [ 2, 7 ],
    // [ 3, 8 ],
    [ 4, 9 ],
    [ 2, 9 ],
    // [ 3, 8 ],
    [ 4, 7 ],
    [ 5, 6 ],
    [ 6, 5 ],
    [ 7, 4 ],
    [ 8, 3 ],
    [ 9, 2 ],
  ];
  move_area_test(piece_type, current_position, expect_pair_list);

});
