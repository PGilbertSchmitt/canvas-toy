export type InitFunc = (ctx: CanvasRenderingContext2D) => void;
export type DrawFunc = (ctx: CanvasRenderingContext2D, frame: number, timestamp: number) => void;
export interface Drawable {
  draw: DrawFunc;
}
