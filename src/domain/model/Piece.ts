import { SquarePosition } from "./SquarePosition";
import { PieceMoveArea } from "./PieceMoveArea";

export class Piece {
  constructor(
    public master: any,
    public can_move_area: PieceMoveArea,
    public is_promotable: boolean,
    public is_promoted: boolean,
    public current_position: SquarePosition
  ) {}
}
