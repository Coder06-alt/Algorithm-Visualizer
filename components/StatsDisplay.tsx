'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface StatsDisplayProps {
  comparisons: number;
  swaps: number;
  arraySize: number;
  currentStep: number;
  totalSteps: number;
}

export function StatsDisplay({
  comparisons,
  swaps,
  arraySize,
  currentStep,
  totalSteps,
}: StatsDisplayProps) {
  const progress = totalSteps > 0 ? (currentStep / totalSteps) * 100 : 0;

  return (
    <Card className="p-4 bg-card border border-border">
      <h3 className="text-lg font-semibold text-foreground mb-4">Statistics</h3>

      <div className="space-y-4">
        {/* Progress Bar */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm font-medium text-foreground">Progress</p>
            <p className="text-sm font-mono text-muted-foreground">
              {currentStep} / {totalSteps}
            </p>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-muted/50 rounded p-3 border border-border">
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
              Comparisons
            </p>
            <p className="text-2xl font-mono font-bold text-accent">
              {comparisons}
            </p>
          </div>

          <div className="bg-muted/50 rounded p-3 border border-border">
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
              Swaps/Moves
            </p>
            <p className="text-2xl font-mono font-bold text-accent">
              {swaps}
            </p>
          </div>

          <div className="bg-muted/50 rounded p-3 border border-border">
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
              Array Size
            </p>
            <p className="text-2xl font-mono font-bold text-accent">
              {arraySize}
            </p>
          </div>

          <div className="bg-muted/50 rounded p-3 border border-border">
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
              Total Steps
            </p>
            <p className="text-2xl font-mono font-bold text-accent">
              {totalSteps}
            </p>
          </div>
        </div>

        {/* Legend */}
        <div className="bg-muted/30 rounded p-3 border border-border">
          <p className="text-xs font-semibold text-foreground mb-2">Color Legend:</p>
          <div className="space-y-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-blue-500"></div>
              <span>Elements being compared</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-red-500"></div>
              <span>Elements being swapped</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-green-500"></div>
              <span>Sorted elements</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-orange-500"></div>
              <span>Current/highlighted element</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
