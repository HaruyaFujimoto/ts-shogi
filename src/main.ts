import * as PIXI from "pixi.js";
// import { DiagramDrawer } from "./presentation/drawer/DiagramDrawer";
import { GamePresenter } from "./presentation/controller/GamePresenter";
// init pixi
const canvas_props = {
  width: 900,
  height: 900,
  backgroundColor: 0x999999,
};
const app = new PIXI.Application({ ...canvas_props });
document.body.appendChild(app.view);

new GamePresenter(app);
