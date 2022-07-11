import { MoveFactory, MoveOption } from "../../domain/service/MoveFactory";
// import { SquarePosition } from "../../domain/value/SquarePosition";
import { ISquareDrawer, SquareDrawer } from "../drawer/SquareDrawer";
import { DrawerController } from "./DrawerController";
import { GameController } from "./GameController";

export class ClickEventController {
  private static _instance: ClickEventController;

  private static _selected_square_drawer: ISquareDrawer | null;

  private constructor() {}

  static get instance() {
    if (this._instance) {
      return this._instance;
    }
    this._instance = new ClickEventController();
    return this._instance;
  }

  public click_square(target_drawer: ISquareDrawer) {
    const selected_drawer = ClickEventController._selected_square_drawer;
    if (selected_drawer) {
      selected_drawer.unfocus();
      ClickEventController._selected_square_drawer = null;
    }
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
      DrawerController.instance.update();
      ClickEventController._selected_square_drawer = null;
    } else {
      if (target_drawer.focus()) {
        ClickEventController._selected_square_drawer = target_drawer;
      }
    }
  }

  // private _
}
