import * as PIXI from "pixi.js";

export interface UIShogiBoard {
  [key:string]:{[key:string]:PIXI.Container}
}
