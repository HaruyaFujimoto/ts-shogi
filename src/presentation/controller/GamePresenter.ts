import * as PIXI from  "pixi.js"
import { DiagramDrawer } from "../drawer/DiagramDrawer";

export class GamePresenter {
  constructor(private app: PIXI.Application) {
    new DiagramDrawer(this.app);
  }

}
