import { Diagram } from "../../domain/model/Diagram";
import { DiagramDrawer } from "../drawer/DiagramDrawer";
import { GameController } from "./GameController";

export class DiagramController {
  private static _instance: DiagramController;

  private _diagram: Diagram = GameController.instance.game.diagram;
  private _diagram_drawer: DiagramDrawer;

  private constructor(
  ) {
    this._diagram_drawer = new DiagramDrawer(this._diagram);
  }

  static get instance() {
    if (this._instance) {
      return this._instance;
    }
    this._instance = new DiagramController();
    return this._instance;
  }

  public add_move() {

  }

  private update() {
    this._diagram_drawer.update();
  }
}
