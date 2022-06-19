import { Player } from "../Player";
import { Turn } from "../Turn";

test("Turn class, advanceTurn", () => {
  // Sente
  let turn: Turn = new Turn(Player.Sente);
  expect(turn.current_turn).toBe(Player.Sente);
  turn.advance();
  expect(turn.current_turn).toBe(Player.Gote);
  turn.advance();
  expect(turn.current_turn).toBe(Player.Sente);
  // Gote
  turn = new Turn(Player.Gote);
  expect(turn.current_turn).toBe(Player.Gote);
  turn.advance();
  expect(turn.current_turn).toBe(Player.Sente);
  turn.advance();
  expect(turn.current_turn).toBe(Player.Gote);
});
