import { Diagram } from "../../domain/model/Diagram";
import { Kifu } from "../../domain/model/Kifu";
import { UIDiagram } from "../model/UIDiagram";
import { GameController } from "./GameController";

export class UIDiagramController {
  private static _instance: UIDiagramController;

  private _diagram: Diagram = GameController.instance.game.diagram;
  private _kifu: Kifu = GameController.instance.game.kifu;
  private _ui_diagram: UIDiagram;

  private constructor() {
    this._ui_diagram = new UIDiagram(this._diagram, this._kifu);
  }

  static get instance(): UIDiagramController {
    if (this._instance) {
      return this._instance;
    }
    this._instance = new UIDiagramController();
    return this._instance;
  }

  static get ui_diagram(): UIDiagram {
    return UIDiagramController.instance._ui_diagram;
  }

  public update(): void {
    console.log(this._diagram.diagram_to_string());
    this._ui_diagram.update();
  }
}
