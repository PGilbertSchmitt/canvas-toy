import { Vec2, radToVec, addVecs, scale, loop } from '../common/Vector';
import { Drawable } from '../common/Canvas';

export class Bird implements Drawable {
  private pos: Vec2;
  private bound: Vec2;
  private rot: number; // Rotation in radians
  private speed = 100;

  constructor(ctx: CanvasRenderingContext2D, coord: Vec2) {
    this.pos = coord;
    const { width, height } = ctx.canvas.getBoundingClientRect();
    this.bound = { x: width, y: height };
    // Random rotation to start
    this.rot = Math.random() * Math.PI * 2;
  }

  public draw(ctx: CanvasRenderingContext2D, _frameCount: number, delta: number) {
    this.turn();
    this.move(delta);
    this.keep();

    // Just drawing a circle for now
    const { pos: { x, y } } = this;
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, 2*Math.PI);
    ctx.fill();
  }

  private move(delta: number) {
    this.pos = addVecs(this.pos, scale(radToVec(this.rot), this.speed * delta));
  }

  // Turn slightly
  private turn() {
    const slight = Math.random() * 0.3 - .15;
    this.rot += slight;
  }

  // Keeps the position bound within the torus
  private keep() {
    this.pos = loop(this.pos, this.bound);
  }
}

export default Bird;
