import { PieceMove } from "../../model/PieceMove";
import { SquarePosition } from "../SquarePosition";

test("get PieceMove test,", () => {
  let piece_move = new PieceMove("King", new SquarePosition(1, 1));
  let move_area: SquarePosition[] = piece_move.getCanMoveArea();
  let move_area_as_list: number[][] = move_area.map((square_position) => [
    square_position.file,
    square_position.rank,
  ]);
  let expect_list = [
    [2, 1],
    [2, 2],
    [1, 2],
  ];
  move_area_as_list.map((file_rank_tuple, i) => {
    expect(file_rank_tuple).toEqual(expect_list[i]);
  });

  expect(move_area.length).toEqual(3);
  piece_move = new PieceMove("King", new SquarePosition(9, 9));
  move_area = piece_move.getCanMoveArea();
  move_area_as_list = move_area.map((square_position) => [
    square_position.file,
    square_position.rank,
  ]);
  expect_list = [
    [9, 8],
    [8, 8],
    [8, 9],
  ];
  move_area_as_list.map((file_rank_tuple, i) => {
    expect(file_rank_tuple).toEqual(expect_list[i]);
  });
});
