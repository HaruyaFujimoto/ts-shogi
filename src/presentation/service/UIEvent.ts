import { MoveFactory } from "../../domain/service/MoveFactory";
import { GameController } from "../controller/GameController";
import { UIDiagramController } from "../controller/UIDiagramController";
import { UIDiagram } from "../model/UIDiagram";
import { IUISquare, UISquare } from "../model/UISquare";
import { UISquareInStand } from "../model/UISquareInStand";
import { Piece } from "../../domain/value/Piece";
import { PieceMoveAreaServer } from "../../domain/service/PieceMoveAreaServer";

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

    // フォーカスされたマスがある場合
    // フォーカスされたマスが駒台上、
    // かつ選択したマスが将棋盤上だった場合、
    // かつ選択したマスにどの指し手の駒も存在しない場合
    // 結果: 着手する(駒台から盤に駒を打つ)
    const condition_of_move_from_square_in_stand =
      selected_ui_square instanceof UISquareInStand &&
      target_square instanceof UISquare &&
      !target_square.value.piece;
    if (condition_of_move_from_square_in_stand) {
      this._move_from_ui_square_in_stand(
        selected_ui_square,
        target_square,
        ui_diagram
      );
    }
  }

  private static _move_from_ui_square(
    selected_ui_square: UISquare,
    target_square: UISquare,
    ui_diagram: UIDiagram
  ) {
    // 着手の前に手番の指し手を取得しておく
    const last_move_player = ui_diagram.value.turn;
    // 着手の正当性チェック
    // ここに移動先として正しいかを判定するロジック
    const is_good_for_move_to =  PieceMoveAreaServer.is_target_square_in_move_area(selected_ui_square.value, target_square.value, ui_diagram.value);
    if (! is_good_for_move_to) {
      ui_diagram.focus_any_square(target_square);
      return;
    }
    // const move_option: MoveOptionAsPair = {
    //   from: selected_ui_square.value.position.pair,
    //   to: target_square.value.position.pair,
    //   promotion: false,
    // };
    // const move = MoveFactory.create_move_from_pair(
    //   GameController.game.diagram,
    //   move_option
    // );
    // 着手を用意
    const move = MoveFactory.create_move_from_square(
      selected_ui_square.value,
      target_square.value
    );
    // 着手
    GameController.game.add_move(move);
    // DrawerController.instance.update();
    // this._ui_diagram.unfocus_any_square();
    // 描画の更新
    ui_diagram.update_by_add_move(target_square, last_move_player);
  }

  private static _move_from_ui_square_in_stand(
    selected_ui_square_in_stand: UISquareInStand,
    target_square: UISquare,
    ui_diagram: UIDiagram
  ) {
    // 着手の前に手番の指し手を取得しておく
    // const player = ui_diagram.value.turn;
    // ここに移動先として正しいかを判定するロジック
    // 着手を用意
    const move = MoveFactory.create_move_from_piece_stand(
      selected_ui_square_in_stand.ui_piece_stand.value,
      selected_ui_square_in_stand.piece as Piece,
      target_square.value
    );
    // console.dir(move);
    // 着手
    GameController.game.add_move(move);
    // DrawerController.instance.update();
    // this._ui_diagram.unfocus_any_square();
    // 描画の更新
    ui_diagram.update_by_add_move(target_square);
    // ui_diagram.ui_piece_stands.get(player)?.update();
  }
}
