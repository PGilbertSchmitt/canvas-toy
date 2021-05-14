import faker from 'faker';
import {
  Vec2,
  radToVec,
  addVecs,
  scale,
  loop,
  subtractVecs,
  magnitude,
  vecToRad
} from '../common/Vector';

const TAU = Math.PI * 2;
export class Bird {
  private static MOUSE_EFFECT_DIST = 200;
  private pos: Vec2;
  private bound: Vec2;
  private rot: number; // Rotation in radians
  private maxTurnRadius: number; // Radians per second
  private speed: number;
  private name: string;
  private color: string;

  constructor(ctx: CanvasRenderingContext2D, coord: Vec2) {
    this.pos = coord;
    const { width, height } = ctx.canvas.getBoundingClientRect();
    this.bound = { x: width, y: height };
    // Random rotation to start
    this.rot = Math.random() * TAU;
    this.name = faker.name.firstName();
    this.color = `#${faker.datatype.hexaDecimal(6).substr(2)}`;
    this.speed = 90 + Math.random() * 20;
    this.maxTurnRadius = 2.5 + Math.random() * 1;
  }

  public draw(
    ctx,
    delta,
    mouseX,
    mouseY
  ) {
    this.turn(delta, mouseX, mouseY);
    this.move(delta);
    this.keep();

    // Draw the body
    const { pos: { x, y } } = this;
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, 2*Math.PI);
    ctx.fill();

    // Draw the tail
    ctx.beginPath();
    ctx.moveTo(x, y);
    const headVec = addVecs(scale(radToVec(this.rot + Math.PI), 10), this.pos);
    ctx.lineTo(headVec.x, headVec.y);
    ctx.stroke();

    // Draw the inner body
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, 2*Math.PI);
    ctx.fill();
  }

  private move(delta: number) {
    this.pos = addVecs(this.pos, scale(radToVec(this.rot), this.speed * delta));
  }

  // Turn slightly
  private turn(delta: number, mouseX: number, mouseY: number) {
    const mousePos: Vec2 = { x: mouseX, y: mouseY };
    const rel = subtractVecs(mousePos, this.pos);
    const nearMouse = magnitude(rel) < Bird.MOUSE_EFFECT_DIST;
    if (nearMouse) {
      const pull = vecToRad(rel);
      let correction = pull - this.rot;
      if (Math.abs(correction) > Math.PI) {
        correction = -(correction - Math.PI);
      }
      const mult = correction > 0 ? 1 : -1;
      this.rot = this.rot + (this.maxTurnRadius * delta * mult);
    } else {
      const slight = Math.random() * 0.03 - .015;
      this.rot += slight;
    }
    this.rot %= TAU;
    if (this.rot < 0) { this.rot += TAU; }
  }

  // Keeps the position bound within the torus
  private keep() {
    this.pos = loop(this.pos, this.bound);
  }
}

export default Bird;
