import React from 'react';
import { times } from 'ramda';
import Canvas from '../../Canvas';
import Bird from './Bird';

const Birds = () => {
  const birds: Bird[] = [];

  const width = window.innerWidth;
  const height = window.innerHeight;

  return (
    <Canvas
      height={`${height-10}px`}
      width={`${width}px`}
      init={ctx => {
        times(() => {
          birds.push(new Bird(ctx, { x: (width / 2) - 200, y: (height / 2) - 100 }));
        }, 2000);
      }}
      draw={(ctx, frame, timestamp) => {
        ctx.clearRect(0, 0, width, height);
        for (const bird of birds) {
          bird.draw(ctx, frame, timestamp);
        }
      }}
    />
  );
};

export default Birds;
