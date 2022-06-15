import Phaser from "phaser";
import { MyScene } from "./scenes/MyScene";

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 500,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 200 },
    },
  },
  scene: MyScene,
};
new Phaser.Game(config);

import { GameProgress } from "./domain/model/GameProgress";

const game = new GameProgress();
const st = game.diagram_to_string();
console.log(st);
