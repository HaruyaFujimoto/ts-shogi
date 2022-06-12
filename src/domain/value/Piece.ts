import { SquarePosition } from "./SquarePosition";
import { PieceInHand } from "./PieceInHand";

// for player data
export type PiecePosition = SquarePosition | PieceInHand;


export const PieceTypes = [
  "King",
  "Gold",
  // promotable
  "Rook",
  "Bishop",
  "Silver",
  "kNight",
  "Lance",
  "Pawn",
] as const;

type PieceType = typeof PieceTypes[number]

const NotPromotablePieceTypes:PieceType[] = [
  "King",
  "Gold",
];
// const PromotablePieceTypes:PieceType[] = [
//   "Rook",
//   "Bishop",
//   "Silver",
//   "kNight",
//   "Lance",
//   "Pawn",
// ];

const PromotableMap = Object.fromEntries(
  PieceTypes.map( type =>
    NotPromotablePieceTypes.includes(type) ? [type, false] : [type, true])
);

export class Piece {
  public readonly is_promotable: boolean;
  constructor(
    public readonly type: PieceType,
    public is_promoted: boolean = false,
  ) {
    this.is_promotable = PromotableMap[this.type];
    // exception
    if (!this.is_promotable && this.is_promoted) {
      throw new Error(`This piece type can not promotion. Piece type: "${this.type}"`);
    }
  }
}
