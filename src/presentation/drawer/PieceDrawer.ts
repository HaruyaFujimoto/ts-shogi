import * as PIXI from "pixi.js";
import { Piece } from "../../domain/value/Piece";
import { Player, PlayerType } from "../../domain/value/Player";

// import assets

// import KingImage from "assets/syougi_koma01_a_15.png";
// import GoldImage from "assets/syougi_koma01_a_06.png";
// import RookImage from "assets/syougi_koma01_a_04.png";
// import BishopImage from "assets/syougi_koma01_a_02.png";
// import SilverImage from "assets/syougi_koma01_a_07.png";
// import kNightImage from "assets/syougi_koma01_a_09.png";
// import LanceImage from "assets/syougi_koma01_a_11.png";
// import PawnImage from "assets/syougi_koma01_a_13.png";

// const fr = (container: PIXI.Container) => {
//   const x = container.x;
//   const y = container.y;
//   const file = 10 - (x - 90) / 40;
//   const rank = y / 40;
//   console.log(file, rank);
// };

export class PieceDrawer {
  static readonly piece_asset_map: { [key: string]: string } = {
    // King: KingImage,
    // Gold: GoldImage,
    // Rook: RookImage,
    // Bishop: BishopImage,
    // Silver: SilverImage,
    // kNight: kNightImage,
    // Lance: LanceImage,
    // Pawn: PawnImage,
    King: "assets/syougi_koma01_a_15.png",
    Gold: "assets/syougi_koma01_a_06.png",
    Rook: "assets/syougi_koma01_a_04.png",
    Bishop: "assets/syougi_koma01_a_02.png",
    Silver: "assets/syougi_koma01_a_07.png",
    kNight: "assets/syougi_koma01_a_09.png",
    Lance: "assets/syougi_koma01_a_11.png",
    Pawn: "assets/syougi_koma01_a_13.png",
  };

  private _last_update_piece: Piece | null = null;
  private _sprite: PIXI.Sprite | null = null;
  constructor(
    private _container: PIXI.Container,
    private _piece: Piece | null
  ) {
    if (_piece) {
      this.put_piece(_piece);
    }
  }

  public update(piece: Piece | null) {
    this._piece = piece;
    if (!this._piece && !this._last_update_piece) {
      return;
    }
    if (
      this._last_update_piece &&
      this._piece?.equals(this._last_update_piece)
    ) {
      return;
    }
    // update
    if (this._piece) {
      this.put_piece(this._piece);
    } else {
      this.remove_piece();
    }
  }

  public hide() {
    if (this._sprite) {
      this._sprite.visible = false;
    }
  }

  public show() {
    if (this._sprite) {
      this._sprite.visible = true;
    }
  }

  public put_piece(piece: Piece) {
    this.remove_piece();
    const file_name = PieceDrawer.piece_asset_map[piece.type];

    const sprite = PIXI.Sprite.from(file_name);
    const ratio = 5 / 6; //  width / height
    sprite.height = this._container.height - 10;
    sprite.width = sprite.height * ratio;
    // const ratio = 36 / 240;
    // sprite.scale.x = ratio;
    // sprite.scale.y = ratio;
    // 先後の駒の向きに対応
    this._rotate_piece_sprite(piece.master, sprite, this._container);
    this._container.addChild(sprite);
    this._sprite = sprite;
    this._last_update_piece = piece;
  }

  public remove_piece() {
    if (this._sprite) {
      this._container.removeChild(this._sprite);
    }
    this._last_update_piece = null;
  }

  private _rotate_piece_sprite(
    player_type: PlayerType,
    sprite: PIXI.Sprite,
    container: PIXI.Container
  ) {
    sprite.anchor.set(0.5);
    // console.log(container.height, sprite.height);
    // sprite.x = (container.width - sprite.width) / 2;
    sprite.x = container.width / 2;
    sprite.y = container.height / 2;
    if (player_type == Player.Sente) {
      sprite.angle = 0;
      // sprite.y += (container.height - sprite.height) / 2;
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
