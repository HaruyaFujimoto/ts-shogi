import * as PIXI from "pixi.js";
import { Piece } from "../../domain/value/Piece";
import { Player, PlayerType } from "../../domain/value/Player";

export class PieceDrawer {
  static readonly piece_asset_map: { [key: string]: string } = {
    King: "assets/syougi_koma01_a_15.png",
    Gold: "assets/syougi_koma01_a_06.png",
    Rook: "assets/syougi_koma01_a_04.png",
    Bishop: "assets/syougi_koma01_a_02.png",
    Silver: "assets/syougi_koma01_a_07.png",
    kNight: "assets/syougi_koma01_a_09.png",
    Lance: "assets/syougi_koma01_a_11.png",
    Pawn: "assets/syougi_koma01_a_13.png",
  };

  private sprite: PIXI.Sprite | null = null;
  constructor(private container: PIXI.Container, private piece: Piece | null) {
    if (piece) {
      this.put_piece(piece);
    }
  }

  public update(piece: Piece | null) {
    // guard
    if (!this.piece && !piece) {
      return;
    }
    if (piece && this.piece?.equals(piece)) {
      return;
    }
    // update
    if (piece) {
      this.put_piece(piece);
    } else {
      this.remove_piece();
    }
  }

  public put_piece(piece: Piece) {
    this.remove_piece();
    const file_name = PieceDrawer.piece_asset_map[piece.type];

    const sprite = PIXI.Sprite.from(file_name);
    const ratio = 5 / 6; //  width / height
    sprite.height = this.container.height - 10;
    sprite.width = sprite.height * ratio;
    // const ratio = 36 / 240;
    // sprite.scale.x = ratio;
    // sprite.scale.y = ratio;
    this.rotate_piece(piece.master, sprite);
    this.container.addChild(sprite);
    this.sprite = sprite;
  }

  public remove_piece() {
    if (this.sprite) {
      this.container.removeChild(this.sprite);
    }
  }

  private rotate_piece(player_type: PlayerType, sprite: PIXI.Sprite) {
    sprite.anchor.set(0.5);
    console.log(this.container.height, sprite.height);
    // sprite.x = (this.container.width - sprite.width) / 2;
    sprite.x = this.container.width / 2;
    sprite.y = this.container.height / 2;
    if (player_type == Player.Sente) {
      sprite.angle = 0;
      // sprite.y += (this.container.height - sprite.height) / 2;
      // sprite.y += 1;
      return;
    }
    if (player_type == Player.Gote) {
      sprite.angle = 180;
      sprite.y -= 2;
      return;
    }
  }
}
