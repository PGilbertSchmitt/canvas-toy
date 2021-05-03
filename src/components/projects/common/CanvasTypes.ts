export type InitFunc = (ctx: CanvasRenderingContext2D) => void;
export type DrawFunc = (ctx: CanvasRenderingContext2D, timestamp: number, mouseX: number, mouseY: number) => void;
export interface Drawable {
  draw: DrawFunc;
}
