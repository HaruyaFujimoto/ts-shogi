import { MoveFactory, MoveOptionAsPair } from "../../domain/service/MoveFactory";
// import { SquarePosition } from "../../domain/value/SquarePosition";
import { UIDiagram } from "../model/UIDiagram";
import { IUISquare, UISquare } from "../model/UISquare";
import { GameController } from "./GameController";
import { UIDiagramController } from "./UIDiagramController";

export class ClickEventController {
  private static _instance: ClickEventController;
  // private static _selected_square_drawer: ISquareDrawer | null;

  private _ui_diagram: UIDiagram = UIDiagramController.ui_diagram;

  private constructor() {}

  static get instance() {
    if (this._instance) {
      return this._instance;
    }
    this._instance = new ClickEventController();
    return this._instance;
  }

  // static get _selected_square_drawer(): ISquareDrawer {
  //   return DrawerController.diagram_drawer.selected_square_drawer;
  // }

  public click_square(target_square: IUISquare) {
    this._ui_diagram.st;
    const selected_ui_square = this._ui_diagram.selected_ui_square;
    // 将棋盤の上の駒を移動する
    if (
      selected_ui_square?.is_selected &&
      target_square instanceof UISquare &&
      selected_ui_square instanceof UISquare
    ) {
      // ここに移動先として正しいかを判定するロジック
      const move_option: MoveOptionAsPair = {
        from: selected_ui_square.value.position.pair,
        to: target_square.value.position.pair,
        promotion: false,
      };
      const move = MoveFactory.create_move_from_pair(
        GameController.game.diagram,
        move_option
      );
      console.dir(move);
      GameController.game.add_move(move);
      // DrawerController.instance.update();
      // this._ui_diagram.unfocus_any_square();
      selected_ui_square.unselect();
      selected_ui_square.update();
      target_square.update();
      // ClickEventController._selected_square_drawer = null;
    } else {
      this._ui_diagram.focus_any_square(target_square);
      // target_square.update();
      // if (target_square.focus()) {
      //   ClickEventController._selected_square_drawer = target_square;
      // }
    }
    // 適切な駒の移動がなかった場合の処理
    // if (selected_ui_square) {
    //   selected_ui_square.unselect();
    //   this._ui_diagram.focus_any_square(target_square);
    // }
  }

  // private _
}
