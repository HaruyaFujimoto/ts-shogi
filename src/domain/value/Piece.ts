import { SquarePosition } from "./SquarePosition";
import { PieceInHand } from "./PieceInHand";
import { PlayerType } from "./Player";

// for player data
export type PiecePosition = SquarePosition | PieceInHand;

// define types
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

export type PieceType = typeof PieceTypes[number];

const _OneSquarePieceTypes = ["King", "Gold", "Silver", "Pawn"] as const;

export type OneSquarePiecetype = typeof _OneSquarePieceTypes[number];

const _LongRangePieceTypes = ["Rook", "Bishop", "Lance"] as const;

export type LongRangePieceType = typeof _LongRangePieceTypes[number];

export type kNightPieceType = "kNight";

export class Piece {
  static readonly NotPromotablePieceTypes: PieceType[] = ["King", "Gold"];
  // static readonly PromotablePieceTypes:PieceType[] = [
  //   "Rook",
  //   "Bishop",
  //   "Silver",
  //   "kNight",
  //   "Lance",
  //   "Pawn",
  // ];

  static readonly PromotableMap: { [key: string]: boolean } =
    Object.fromEntries(
      PieceTypes.map((type) =>
        Piece.NotPromotablePieceTypes.includes(type)
          ? [type, false]
          : [type, true]
      )
    );

  static readonly PieceInitialMap: { [key: string]: string } = {
    King: "K",
    Gold: "G",
    Rook: "R",
    Bishop: "B",
    Silver: "S",
    kNight: "N",
    Lance: "L",
    Pawn: "P",
  };

  public readonly is_promotable: boolean;
  public readonly type_initial: string;
  constructor(
    public readonly type: PieceType,
    public master: PlayerType,
    public is_promoted: boolean = false
  ) {
    this.type_initial = Piece.PieceInitialMap[this.type];
    this.is_promotable = Piece.PromotableMap[this.type];
    // exception
    if (!this.is_promotable && this.is_promoted) {
      throw new Error(
        `This piece type can not promotion. Piece type: "${this.type}"`
      );
    }
  }
}
