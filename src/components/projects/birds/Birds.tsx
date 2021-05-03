import React from 'react';
import { times } from 'ramda';
import Canvas from '../../Canvas';
import Bird from './Bird';

const Birds = () => {
  const birds: Bird[] = [];

  const width = window.innerWidth;
  const height = window.innerHeight;

  const drawMouse = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    ctx.fillStyle = '#13131330';
    ctx.beginPath();
    ctx.arc(x, y, 200, 0, 2*Math.PI);
    ctx.fill();
  };

  return (
    <Canvas
      height={`${height-10}px`}
      width={`${width}px`}
      init={ctx => {
        times(() => {
          birds.push(new Bird(ctx, { x: (width / 2) - 200, y: (height / 2) - 100 }));
        }, 2000);
      }}
      draw={(ctx, timestamp, mouseX, mouseY) => {
        ctx.clearRect(0, 0, width, height);
        for (const bird of birds) {
          bird.draw(ctx, timestamp, mouseX, mouseY);
        }
        drawMouse(ctx, mouseX, mouseY);
      }}
    />
  );
};

export default Birds;
