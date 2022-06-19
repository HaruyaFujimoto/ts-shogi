import * as PIXI from "pixi.js";

// init pixi
const canvas_props = {
  width: 600,
  height: 600,
};
let app = new PIXI.Application({ ...canvas_props });
document.body.appendChild(app.view);

// shogi board
let shogi_board = PIXI.Sprite.from("assets/syougiban_b.png");
shogi_board.width = 600;
shogi_board.height = 600;
app.stage.addChild(shogi_board);
shogi_board.interactive = true;
shogi_board.on("click", (e) => console.log(e.data.originalEvent));
shogi_board.on("click", (e) =>
  console.log([e.data.originalEvent.offsetX, e.data.originalEvent.offsetY])
);

// king
let king = PIXI.Sprite.from("assets/syougi_koma01_a_15.png");
let ratio = 60 / 64;
// king.anchor.x = 0.5;
// king.anchor.y = 1.0;
king.width = 42 * ratio;
king.height = 49 * ratio;
console.dir(king._texture.orig);
king.x = 299 * ratio;
king.y = 64 * ratio;
app.stage.addChild(king);
king.interactive = true;
king.on("click", (e) => console.dir(e));
