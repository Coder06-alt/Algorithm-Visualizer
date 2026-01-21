'use client';

import React, { useEffect, useRef } from 'react';
import type { AlgorithmStep } from '@/lib/algorithms';

interface VisualizationCanvasProps {
  step: AlgorithmStep;
  arraySize: number;
  canvasHeight?: number;
  canvasWidth?: number;
}

export function VisualizationCanvas({
  step,
  arraySize,
  canvasHeight = 400,
  canvasWidth = 800,
}: VisualizationCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = 'rgb(19, 19, 24)'; // background color
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    const array = step.array;
    const maxValue = Math.max(...array);
    const barWidth = (canvasWidth * 0.9) / array.length;
    const padding = (canvasWidth * 0.05) / 2;
    const barSpacing = barWidth * 0.9;

    // Draw bars
    array.forEach((value, index) => {
      const barHeight = (value / maxValue) * (canvasHeight * 0.85);
      const x = padding + index * barWidth;
      const y = canvasHeight - barHeight - 20;

      // Determine bar color based on state
      let color = 'rgb(140, 140, 150)'; // default

      if (step.sorted?.includes(index)) {
        color = 'rgb(168, 230, 145)'; // sorted - green
      } else if (step.swapped?.includes(index)) {
        color = 'rgb(255, 100, 100)'; // swapped - red
      } else if (step.compared?.includes(index)) {
        color = 'rgb(100, 180, 255)'; // compared - blue
      } else if (step.highlight?.includes(index)) {
        color = 'rgb(255, 180, 100)'; // highlight - orange
      }

      // Draw bar
      ctx.fillStyle = color;
      ctx.fillRect(x, y, barSpacing, barHeight);

      // Draw bar outline
      ctx.strokeStyle = 'rgb(50, 50, 60)';
      ctx.lineWidth = 1;
      ctx.strokeRect(x, y, barSpacing, barHeight);

      // Draw value text on larger bars
      if (barHeight > 30) {
        ctx.fillStyle = 'rgb(230, 230, 235)';
        ctx.font = '10px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(value.toString(), x + barSpacing / 2, y + barHeight / 2 + 4);
      }
    });

    // Draw legend
    const legendY = canvasHeight - 10;
    const legends = [
      { label: 'Comparing', color: 'rgb(100, 180, 255)' },
      { label: 'Swapping', color: 'rgb(255, 100, 100)' },
      { label: 'Sorted', color: 'rgb(168, 230, 145)' },
      { label: 'Current', color: 'rgb(255, 180, 100)' },
    ];

    let legendX = 20;
    ctx.font = '11px sans-serif';
    ctx.fillStyle = 'rgb(180, 180, 190)';

    legends.forEach((legend) => {
      ctx.fillStyle = legend.color;
      ctx.fillRect(legendX, legendY - 12, 10, 10);

      ctx.fillStyle = 'rgb(180, 180, 190)';
      ctx.textAlign = 'left';
      ctx.fillText(legend.label, legendX + 15, legendY - 3);

      legendX += 130;
    });
  }, [step, arraySize, canvasHeight, canvasWidth]);

  return (
    <div className="w-full bg-card rounded-lg p-4 border border-border">
      <canvas
        ref={canvasRef}
        width={canvasWidth}
        height={canvasHeight}
        className="w-full border border-border rounded bg-background"
      />
    </div>
  );
}
