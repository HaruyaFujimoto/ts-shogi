import { Diagram } from "../../domain/model/Diagram";
import { Kifu } from "../../domain/model/Kifu";
import { DiagramDrawer } from "../drawer/DiagramDrawer";
import { UIDiagram } from "../model/UIDiagram";
import { GameController } from "./GameController";

export class DrawerController {
  private static _instance: DrawerController;

  private _diagram: Diagram = GameController.instance.game.diagram;
  private _kifu: Kifu = GameController.instance.game.kifu;
  private _diagram_drawer: DiagramDrawer;
  private _ui_diagram: UIDiagram;

  private constructor() {
    this._ui_diagram = new UIDiagram(this._diagram, this._kifu);
    this._diagram_drawer = new DiagramDrawer(this._ui_diagram);
  }

  static get instance(): DrawerController {
    if (this._instance) {
      return this._instance;
    }
    this._instance = new DrawerController();
    return this._instance;
  }

  static get ui_diagram(): UIDiagram {
    return DrawerController.instance._ui_diagram;
  }

  static get diagram_drawer(): DiagramDrawer {
    return DrawerController.instance._diagram_drawer;
  }

  public update(): void {
    console.log(this._diagram.diagram_to_string());
    this._diagram_drawer.update();
  }
}
