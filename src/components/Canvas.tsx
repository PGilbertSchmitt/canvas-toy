import React, { FC, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { isNil } from 'ramda';

const CanvasComponent = styled.canvas`
  width: ${props => props.width};
  height: ${props => props.height};
`;
export interface CanvasProps {
  draw: (ctx: CanvasRenderingContext2D, frame: number, timestamp: number) => void;
  init: (ctx: CanvasRenderingContext2D) => void;
  height: string;
  width: string;
}

const Canvas: FC<CanvasProps> = ({ draw, init, height, width }) => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const ctx = ref.current?.getContext('2d');
    if (isNil(ctx)) {
      return;
    }

    let frameCount = 0;
    let animationFrame: number;

    init(ctx);
    const render: FrameRequestCallback = (timestamp: number) => {
      frameCount++;
      draw(ctx, frameCount, timestamp);
      animationFrame = window.requestAnimationFrame(render);
    };
    render(0);

    return () => window.cancelAnimationFrame(animationFrame);
  }, [ draw ]);

  return (
    <CanvasComponent height={height} width={width} ref={ref} />
  );
};

export default Canvas;
