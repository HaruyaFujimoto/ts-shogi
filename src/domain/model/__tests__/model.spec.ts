import { Turn } from "../Turn";
import { Player } from "../Player";
import { PieceMoveArea, PieceDestination } from "../PieceMoveArea";

test("Turn class, advanceTurn", () => {
  // Sente
  let turn: Turn = new Turn(Player.Sente);
  expect(turn.value).toBe(Player.Sente);
  turn.advanceTurn();
  expect(turn.value).toBe(Player.Gote);
  turn.advanceTurn();
  expect(turn.value).toBe(Player.Sente);
  // Gote
  turn = new Turn(Player.Gote);
  expect(turn.value).toBe(Player.Gote);
  turn.advanceTurn();
  expect(turn.value).toBe(Player.Sente);
  turn.advanceTurn();
  expect(turn.value).toBe(Player.Gote);
})

test("PieceMoveArea, constructer test", () => {
  const test = () => {
    const area: Set<PieceDestination> = new Set([1,2,3,4,5,6,7,8]);
    const p = new PieceMoveArea(area);
    p.value;
  };
  expect(test).not.toThrow();
})
