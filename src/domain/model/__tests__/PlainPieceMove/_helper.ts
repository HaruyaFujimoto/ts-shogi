import { PieceType } from "../../../value/Piece";
import { PlayerType } from "../../../value/Player";
import { SquarePosition } from "../../../value/SquarePosition";
import { PlainPieceMove } from "../../PlainPieceMove";

export function move_area_test(
  piece_type: PieceType,
  piece_master: PlayerType,
  current_position: SquarePosition,
  expect_pair_list: number[][]
) {
  // PieceMove 生成
  let piece_move = new PlainPieceMove(
    piece_type,
    current_position,
    piece_master
  );
  let move_area: SquarePosition[] = piece_move.getCanMoveArea();
  // テストの容易性のため、SquarePosition を FileRankPair 型にする
  let move_area_as_pair: number[][] = move_area.map(
    (square_position) => square_position.pair
  );
  console.dir(move_area_as_pair);
  // 期待する SquarePosition[] の長さを比較
  expect(move_area.length).toEqual(expect_pair_list.length);
  // 期待する FileRankPair との比較、配列として比較
  if (expect_pair_list.length > 0) {
    move_area_as_pair.map((file_rank_pair, i) => {
      expect(file_rank_pair).toEqual(expect_pair_list[i]);
    });
  }
}
