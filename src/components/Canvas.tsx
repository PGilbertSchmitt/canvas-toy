import React, { FC, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { isNil } from 'ramda';
import { DrawFunc, InitFunc } from './projects/common/Canvas';

const CanvasComponent = styled.canvas`
  width: ${props => props.width};
  height: ${props => props.height};
`;
export interface CanvasProps {
  draw: DrawFunc;
  init: InitFunc;
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
    let lastTime = 0;

    init(ctx);
    const render: FrameRequestCallback = (timestamp: number) => {
      frameCount++;
      draw(ctx, frameCount, (timestamp - lastTime) / 1000);
      lastTime = timestamp;
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
