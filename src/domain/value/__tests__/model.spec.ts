import { Turn } from "../Turn";
import { Player } from "../Player";
// import { PieceMoveArea, PieceDestination } from "../PieceMoveArea";
import { Piece } from "../Piece";
import { PieceMove } from "../../model/PieceMove";
import { SquarePosition } from "../SquarePosition";

test("Turn class, advanceTurn", () => {
  // Sente
  let turn: Turn = new Turn(Player.Sente);
  expect(turn.value).toBe(Player.Sente);
  turn.advance();
  expect(turn.value).toBe(Player.Gote);
  turn.advance();
  expect(turn.value).toBe(Player.Sente);
  // Gote
  turn = new Turn(Player.Gote);
  expect(turn.value).toBe(Player.Gote);
  turn.advance();
  expect(turn.value).toBe(Player.Sente);
  turn.advance();
  expect(turn.value).toBe(Player.Gote);
})

// test("PieceMoveArea, constructer test", () => {
//   const test = () => {
//     const area: Set<PieceDestination> = new Set([1,2,3,4,6,7,8,9]);
//     const p = new PieceMoveArea(area);
//     return p;
//   };
//   expect(test).not.toThrow();
// })

test("Piece type, promotable test", () => {
  // expect success
  const test1 = () => {
    const p = new Piece("King", "Sente", false);
    return p;
  }
  expect(test1).not.toThrow();
  // expect exception
  const test2 = () => {
    const p = new Piece("King", "Sente", true);
    return p;
  }
  expect(test2).toThrow();
})

test("get PieceMove test,", () => {
  let pieceMove = new PieceMove("King", (new SquarePosition(1,1)));
  console.log(pieceMove.getCanMoveArea());
  pieceMove = new PieceMove("King", (new SquarePosition(9,9)));
  console.log(pieceMove.getCanMoveArea());
})
