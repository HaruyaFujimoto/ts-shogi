import { Diagram } from "../../domain/model/Diagram";
import { Kifu } from "../../domain/model/Kifu";
import { DiagramDrawer } from "../drawer/DiagramDrawer";
import { UIDiagram } from "../model/UIDiagram";
import { GameController } from "./GameController";

export class DiagramController {
  private static _instance: DiagramController;

  private _diagram: Diagram = GameController.instance.game.diagram;
  private _kifu: Kifu = GameController.instance.game.kifu;
  private _ui_diagram: UIDiagram;
  private _diagram_drawer: DiagramDrawer;

  private constructor() {
    this._ui_diagram = new UIDiagram(this._diagram, this._kifu);
    this._diagram_drawer = new DiagramDrawer(this._ui_diagram);
  }

  static get instance() {
    if (this._instance) {
      return this._instance;
    }
    this._instance = new DiagramController();
    return this._instance;
  }

  public add_move() {}

  public update() {
    console.log(this._diagram.diagram_to_string());
    this._diagram_drawer.update();
  }
}
