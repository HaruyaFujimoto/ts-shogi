import { PieceMove } from "./domain/model/PieceMove";
import { PieceType } from "./domain/value/Piece";
import { SquarePosition } from "./domain/value/SquarePosition";
import { UIDiagramController } from "./presentation/controller/UIDiagramController";

UIDiagramController.instance;


function move_area_test(piece_type: PieceType, current_position: SquarePosition) {
  // PieceMove 生成
  let piece_move = new PieceMove(piece_type, current_position);
  let move_area: SquarePosition[] = piece_move.getCanMoveArea();
  // テストの容易性のため、SquarePosition を FileRankPair 型にする
  let move_area_as_pair: number[][] = move_area.map((square_position) => square_position.pair);
  console.dir(move_area_as_pair);
}


const piece_type = "Bishop";
let current_position = new SquarePosition(1, 1);
move_area_test(piece_type, current_position);

current_position = new SquarePosition(5, 5);
move_area_test(piece_type, current_position);
