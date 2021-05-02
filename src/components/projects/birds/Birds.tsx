import React from 'react';
import Canvas from '../../Canvas';

interface Coord {
  x: number;
  y: number;
}
export class Bird {
  private ctx: CanvasRenderingContext2D;
  private pos: Coord;

  constructor(ctx: CanvasRenderingContext2D, coord: Coord) {
    this.ctx = ctx;
    this.pos = coord;
  }

  draw(frameCount: number) {
    console.log(`draw: ${frameCount}`);
    const { ctx, pos: { x, y } } = this;
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.arc(x, y, 5*Math.sin(frameCount*0.05)**2, 0, 2*Math.PI);
    ctx.fill();
  }
}

const Birds = () => {
  const birds: Bird[] = [];

  const width = window.innerWidth;
  const height = window.innerHeight;

  return (
    <Canvas
      height={`${height-10}px`}
      width={`${width}px`}
      init={ctx => {
        birds.push(new Bird(ctx, { x: 2, y: 2 }));
      }}
      draw={(ctx, frame) => {
        ctx.clearRect(0, 0, width, height);
        if (frame === 2) {
          console.log(ctx.canvas.getBoundingClientRect());
        }
        for (const bird of birds) {
          bird.draw(frame);
        }
      }}
    />
  );
};

export default Birds;
