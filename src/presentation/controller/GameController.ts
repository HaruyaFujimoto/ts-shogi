import { GameProgress } from "../../use_case/service/GameProgress";

export class GameController {
  private static _instance: GameController;

  private _game: GameProgress;

  private constructor() {
    this._game = new GameProgress();
  }

  static get instance() {
    if (this._instance) {
      return this._instance;
    }
    this._instance = new GameController();
    return this._instance;
  }

  static get game() {
    return GameController.instance.game;
  }

  get game() {
    return this._game;
  }
}
