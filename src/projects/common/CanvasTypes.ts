export type InitFunc = (ctx: CanvasRenderingContext2D) => void;
// { ctx: CanvasRenderingContext2D, timestamp: number, mouseX: number, mouseY: number }
// Rendering context, timestamp, mouseX position, mouseY position, 
export type DrawFuncArgs = [ctx: CanvasRenderingContext2D, timestamp: number, mouseX: number, mouseY: number];
export type DrawFunc = (args: DrawFuncArgs) => void;
export interface Drawable {
  draw: DrawFunc;
}
