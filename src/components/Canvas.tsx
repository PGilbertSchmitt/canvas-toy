import { isNil } from 'ramda';
import React, { PropsWithChildren, useEffect, useRef } from 'react';

export interface CanvasProps<T extends Record<string, unknown>> {
  draw: (ctx: CanvasRenderingContext2D, frame: number, controls: T) => void;
  controls: T;
}

const Canvas = <T extends Record<string, unknown>>({ draw, controls }: PropsWithChildren<CanvasProps<T>>) => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const ctx = ref.current?.getContext('2d');
    if (isNil(ctx)) {
      return;
    }

    let frameCount = 0;
    let animationFrame: number;

    const render = () => {
      frameCount++;
      draw(ctx, frameCount, controls);
      animationFrame = window.requestAnimationFrame(render);
    };
    render();

    return () => window.cancelAnimationFrame(animationFrame);
  }, [ draw, controls ]);

  return (
    <canvas ref={ref} />
  );
};

export default Canvas;
