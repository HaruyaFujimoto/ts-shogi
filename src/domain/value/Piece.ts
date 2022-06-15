import { SquarePosition } from "./SquarePosition";
import { PieceInHand } from "./PieceInHand";
import { PlayerType } from "./Player";

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

export type PieceType = typeof PieceTypes[number]

const PieceInitialMap = {
  "King": "K",
  "Gold": "G",
  "Rook": "R",
  "Bishop": "B",
  "Silver": "S",
  "kNight": "N",
  "Lance": "L",
  "Pawn": "P",
}

const OneSquarePieceTypes = [
  "King",
  "Gold",
  "Silver",
  "Pawn",
] as const;
export type OneSquarePiecetype = typeof OneSquarePieceTypes[number];

const LongRangePieceTypes = [
  "Rook",
  "Bishop",
  "Lance",
] as const ;

export type LongRangePieceType = typeof LongRangePieceTypes[number];

export type kNightPieceType = "kNight";

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
  public readonly type_initial: string;
  constructor(
    public readonly type: PieceType,
    public master: PlayerType,
    public is_promoted: boolean = false,
  ) {
    this.type_initial = PieceInitialMap[this.type];
    this.is_promotable = PromotableMap[this.type];
    // exception
    if (!this.is_promotable && this.is_promoted) {
      throw new Error(`This piece type can not promotion. Piece type: "${this.type}"`);
    }
  }
}
