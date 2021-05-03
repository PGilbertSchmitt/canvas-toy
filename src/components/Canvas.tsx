import React, { FC, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { isNil } from 'ramda';
import { DrawFunc, InitFunc } from './projects/common/CanvasTypes';

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
    const canvasEl = ref.current;
    const ctx = canvasEl?.getContext('2d');
    if (isNil(ctx) || isNil(canvasEl)) {
      return;
    }

    const offsetX = canvasEl.offsetLeft;
    const offsetY = canvasEl.offsetTop;
    
    // let frameCount = 0;
    let animationFrame: number;
    let lastTime = performance.now();
    let mouseX = 0;
    let mouseY = 0;
    
    const onMouseMove = (evt: MouseEvent) => {
      mouseX = evt.clientX - offsetX;
      mouseY = evt.clientY - offsetY;
    };
    canvasEl.addEventListener('mousemove', onMouseMove);

    init(ctx);
    const render: FrameRequestCallback = (timestamp: number) => {
      // frameCount++;
      draw(ctx, (timestamp - lastTime) / 1000, mouseX, mouseY);
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
