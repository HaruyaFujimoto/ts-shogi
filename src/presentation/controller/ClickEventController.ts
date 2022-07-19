import { MoveFactory, MoveOption } from "../../domain/service/MoveFactory";
import { DiagramDrawer } from "../drawer/DiagramDrawer";
// import { SquarePosition } from "../../domain/value/SquarePosition";
import { ISquareDrawer, SquareDrawer } from "../drawer/SquareDrawer";
import { DrawerController } from "./DrawerController";
import { GameController } from "./GameController";

export class ClickEventController {
  private static _instance: ClickEventController;
  // private static _selected_square_drawer: ISquareDrawer | null;

  private _diagram_drawer: DiagramDrawer = DrawerController.diagram_drawer;

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

  public click_square(target_drawer: ISquareDrawer) {
    console.time("selected_drawer")
    const selected_drawer = this._diagram_drawer.selected_square_drawer;
    console.timeEnd("selected_drawer")
    // 将棋盤の上の駒を移動する
    if (
      selected_drawer &&
      target_drawer instanceof SquareDrawer &&
      selected_drawer instanceof SquareDrawer
    ) {
      // ここに移動先として正しいかを判定するロジック
      const move_option: MoveOption = {
        from: selected_drawer.position.pair,
        to: target_drawer.position.pair,
        promotion: false,
      };
      const move = new MoveFactory().create_move(
        GameController.game.diagram,
        move_option
      );
      console.dir(move);
      GameController.game.add_move(move);
      console.time("update_diagram_drawer")
      DrawerController.instance.update();
      console.timeEnd("update_diagram_drawer")
      // ClickEventController._selected_square_drawer = null;
    } else {
      this._diagram_drawer.focus_any_square(target_drawer);
      // if (target_drawer.focus()) {
      //   ClickEventController._selected_square_drawer = target_drawer;
      // }
    }
    // 適切な駒の移動がなかった場合の処理
    if (selected_drawer) {
      selected_drawer.unfocus();
      this._diagram_drawer.focus_any_square(target_drawer);
    }
  }

  // private _
}
