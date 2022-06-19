import { Piece } from "../Piece";

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
});
