import { Piece } from "../Piece";
import { Player } from "../Player";

test("Piece type, promotable test", () => {
  // expect success
  const test1 = () => {
    const p = new Piece("King", Player.Sente, false);
    return p;
  };
  expect(test1).not.toThrow();
  // expect exception
  const test2 = () => {
    const p = new Piece("King", Player.Sente, true);
    return p;
  };
  expect(test2).toThrow();
});

test("Piece be taken test, then change master", () => {
  const p = new Piece("Pawn", Player.Sente, false);
  expect(p.master).toBe(Player.Sente);
  p.be_taken();
  expect(p.master).toBe(Player.Gote);
  p.be_taken();
  expect(p.master).toBe(Player.Sente);
});

test("Piece equals test", () => {
  const p1 = new Piece("Pawn", Player.Sente, false);
  const p2 = new Piece("Pawn", Player.Sente, false);
  expect(p1.equals(p2)).toBe(true);
});
