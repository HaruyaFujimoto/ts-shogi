import * as PIXI from "pixi.js";

const canvas_props = {
  width: 900,
  height: 900,
  backgroundColor: 0x999999,
  resolution: window.devicePixelRatio || 1,
  autoResize: true,
};

export const app = new PIXI.Application({ ...canvas_props });
document.body.appendChild(app.view);

export function create_pixi_container(
  x: number,
  y: number,
  width: number,
  height: number
) {
  const container = new PIXI.Container();
  container.x = x;
  container.y = y;
  container.width = width;
  container.height = height;
  app.stage.addChild(container);
  return container;
}
