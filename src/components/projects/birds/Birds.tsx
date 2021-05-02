import React from 'react';
import Canvas from '../../Canvas';

const Birds = () => {
  return (
    <Canvas
      controls={{}}
      draw={(ctx, _frame) => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      }}
    />
  );
};

export default Birds;
