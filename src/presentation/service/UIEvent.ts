import {
  MoveOptionAsPair,
  MoveFactory,
} from "../../domain/service/MoveFactory";
import { GameController } from "../controller/GameController";
import { UIDiagramController } from "../controller/UIDiagramController";
import { UIDiagram } from "../model/UIDiagram";
import { IUISquare, UISquare } from "../model/UISquare";
import { UISquareInStand } from "../model/UISquareInStand";

export class UIEvent {
  static click_square(target_square: IUISquare) {
    const ui_diagram = UIDiagramController.ui_diagram;
    // selected = フォーカスされた
    // target = 選択した
    // マスに駒があるかないかは、IUISquare 側で処理する

    // フォーカスされたマスがない場合
    // 結果: マスをフォーカスする
    const selected_ui_square: IUISquare | null = ui_diagram.selected_ui_square;
    if (!selected_ui_square) {
      ui_diagram.focus_any_square(target_square);
      return;
    }

    // 選択したマスが駒台にある場合
    // 結果: マスをフォーカスする
    const is_target_square_piece_in_stand =
      target_square instanceof UISquareInStand;
    if (is_target_square_piece_in_stand) {
      ui_diagram.focus_any_square(target_square);
      return;
    }

    // 選択したマスが、将棋盤上で、手番の駒があるマスであるかどうか
    // つまり、手番の指し手が将棋盤の自分の駒を選択したかどうか
    // 結果: マスをフォーカスする
    const is_target_square_in_shogi_board_and_has_turn_players_piece =
      target_square instanceof UISquare &&
      target_square.value.piece?.master == ui_diagram.value.turn;
    if (is_target_square_in_shogi_board_and_has_turn_players_piece) {
      ui_diagram.focus_any_square(target_square);
      return;
    }

    // フォーカスされたマスがある場合
    // フォーカスされたマスが将棋盤上、かつ選択したマスが将棋盤上だった場合
    // !! 選択したマスに自分の駒がある場合は、上記の if 文に吸われる
    // 結果: 着手する(駒を移動させる)
    const condition_of_move_from_square =
      selected_ui_square instanceof UISquare &&
      target_square instanceof UISquare;
    if (condition_of_move_from_square) {
      this._move_from_ui_square(selected_ui_square, target_square, ui_diagram);
    }
  }

  private static _move_from_ui_square(
    selected_ui_square: UISquare,
    target_square: UISquare,
    ui_diagram: UIDiagram
  ) {
    // 着手の前に手番の指し手を取得しておく
    const player = ui_diagram.value.turn;
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
    // console.dir(move);
    // 着手
    GameController.game.add_move(move);
    // DrawerController.instance.update();
    // this._ui_diagram.unfocus_any_square();
    selected_ui_square.unselect();
    selected_ui_square.update();
    target_square.update();
    ui_diagram.ui_piece_stands.get(player)?.update();
  }
}
