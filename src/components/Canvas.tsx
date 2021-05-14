import React, { FC, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { isNil } from 'ramda';
import { DrawFunc, InitFunc } from '../projects/common/CanvasTypes';

const CanvasComponent = styled.canvas`
  width: ${props => props.width};
  height: ${props => props.height};
`;

const Framerate = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  padding: 10px;
  width: fit-content;
  heigth: fit-content;
  color: red;
  font-size: 20px;
  background-color: #d0d0d0;
`;
export interface CanvasProps {
  draw: DrawFunc;
  init: InitFunc;
  height: string;
  width: string;
}

const Canvas: FC<CanvasProps> = ({ draw, init, height, width }) => {
  const ref = useRef<HTMLCanvasElement>(null);
  const [ initialized, setInitialized ] = useState(false);
  const [ frames, setFrames ] = useState(0);
  const [ lastFrameTime, setLastFrameTime ] = useState(0);
  const [ lastFrameCount, setLastFrameCount ] = useState(0);

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

    // let mouseEvt: MouseEvent | null = null;
    // let keyEvt: KeyboardEvent | null = null;
    // canvasEl.addEventListener('keydown', evt => {
    //   keyEvt = evt;
    // });
    
    const onMouseMove = (evt: MouseEvent) => {
      mouseX = evt.clientX - offsetX;
      mouseY = evt.clientY - offsetY;
    };
    canvasEl.addEventListener('mousemove', onMouseMove);

    if (!initialized) {
      init(ctx);
      setInitialized(true);
    }

    const render: FrameRequestCallback = (timestamp: number) => {
      // frameCount++;
      const delta = (timestamp - lastTime) / 1000;
      lastTime = timestamp;

      draw([ ctx, delta, mouseX, mouseY ]);
      animationFrame = window.requestAnimationFrame(render);

      // keyEvt = null;
      // setFps(Math.floor(Math.random() * 20) + 40);

      // Managing FPS
      if (timestamp - lastFrameTime > 1000) {
        console.log(timestamp, '-', lastFrameTime);
        setLastFrameTime(timestamp);
        setLastFrameCount(frames);
        console.log(`New FPS: ${frames}`);
        setFrames(0);
      } else {
        setFrames(frames + 1);
      }
    };
    render(0);


    return () => window.cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <>
      <Framerate>{lastFrameCount}</Framerate>
      <CanvasComponent height={height} width={width} ref={ref} />
    </>
  );
};

export default Canvas;
