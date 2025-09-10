/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { APPEARANCE } from '@/lib/presets/agents';

type BasicFaceProps = {
  ctx: CanvasRenderingContext2D;
  mouthScale: number;
  eyeLeftScale: number;
  eyeRightScale: number;
  color?: string;
  appearance: APPEARANCE;
};

const eye = (
  ctx: CanvasRenderingContext2D,
  pos: [number, number],
  radius: number,
  scaleY: number
) => {
  ctx.save();
  ctx.translate(pos[0], pos[1]);
  ctx.scale(1, scaleY);
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, Math.PI * 2);
  ctx.restore();
  ctx.fill();
};

function drawGlasses(
  ctx: CanvasRenderingContext2D,
  eyesCenter: [number, number],
  eyesOffset: number,
  width: number
) {
  ctx.strokeStyle = 'black';
  ctx.lineWidth = width / 50;
  ctx.beginPath();

  // Rims
  const lensRadius = width / 18;
  ctx.arc(eyesCenter[0] - eyesOffset, eyesCenter[1], lensRadius, 0, Math.PI * 2);
  ctx.moveTo(eyesCenter[0] + eyesOffset + lensRadius, eyesCenter[1]); // move to start of second circle
  ctx.arc(eyesCenter[0] + eyesOffset, eyesCenter[1], lensRadius, 0, Math.PI * 2);

  // Bridge
  ctx.moveTo(eyesCenter[0] - eyesOffset + lensRadius, eyesCenter[1]);
  ctx.quadraticCurveTo(
    eyesCenter[0],
    eyesCenter[1] - lensRadius / 2,
    eyesCenter[0] + eyesOffset - lensRadius,
    eyesCenter[1]
  );

  ctx.stroke();
}

export function renderBasicFace(props: BasicFaceProps) {
  const {
    ctx,
    eyeLeftScale,
    eyeRightScale,
    mouthScale: mouthOpenness,
    color,
    appearance,
  } = props;
  const { width, height } = ctx.canvas;

  // Clear the canvas
  ctx.clearRect(0, 0, width, height);

  // Draw the background circle
  ctx.fillStyle = color || 'white';
  ctx.beginPath();
  ctx.arc(width / 2, height / 2, width / 2 - 20, 0, Math.PI * 2);
  ctx.fill();

  const eyesCenter: [number, number] = [width / 2, height / 2.425];
  const eyesOffset = width / 15;
  const eyeRadius = width / 30;

  // Draw the eyes
  ctx.fillStyle = 'black';
  if (appearance === 'cyclops') {
    eye(ctx, eyesCenter, eyeRadius * 1.5, eyeLeftScale + 0.1);
  } else {
    const eyesPosition: Array<[number, number]> = [
      [eyesCenter[0] - eyesOffset, eyesCenter[1]],
      [eyesCenter[0] + eyesOffset, eyesCenter[1]],
    ];
    eye(ctx, eyesPosition[0], eyeRadius, eyeLeftScale + 0.1);
    eye(ctx, eyesPosition[1], eyeRadius, eyeRightScale + 0.1);
  }

  if (appearance === 'glasses') {
    drawGlasses(ctx, eyesCenter, eyesOffset, width);
  }

  const mouthCenter = [width / 2, (height / 2.875) * 1.55];
  const mouthExtent = [width / 10, (height / 5) * mouthOpenness + 10];

  // Draw the mouth
  ctx.save();
  ctx.translate(mouthCenter[0], mouthCenter[1]);
  ctx.scale(1, mouthOpenness + height * 0.002);
  ctx.fillStyle = 'black';
  ctx.beginPath();
  ctx.ellipse(0, 0, mouthExtent[0], mouthExtent[1], 0, 0, Math.PI, false);
  ctx.ellipse(0, 0, mouthExtent[0], mouthExtent[1] * 0.45, 0, 0, Math.PI, true);
  ctx.fill();
  ctx.restore();
}