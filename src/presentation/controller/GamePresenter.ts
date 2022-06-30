import * as PIXI from "pixi.js";
import { GameProgress } from "../../use_case/service/GameProgress";
import { DiagramDrawer } from "../drawer/DiagramDrawer";

export class GamePresenter {
  constructor(private app: PIXI.Application) {
    const game = new GameProgress();
    new DiagramDrawer(this.app, game.diagram);
  }
}
