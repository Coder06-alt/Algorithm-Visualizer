'use client';

import React from 'react';
import { ALGORITHMS } from '@/lib/algorithms';
import { Card } from '@/components/ui/card';

interface ComplexityDisplayProps {
  algorithm: string;
}

export function ComplexityDisplay({ algorithm }: ComplexityDisplayProps) {
  const algo = ALGORITHMS[algorithm];

  if (!algo) {
    return null;
  }

  return (
    <Card className="p-4 bg-card border border-border">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        {algo.name}
      </h3>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-muted/50 rounded p-3 border border-border">
          <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">
            Best Case
          </p>
          <p className="text-lg font-mono font-semibold text-accent">
            {algo.complexity.best}
          </p>
        </div>

        <div className="bg-muted/50 rounded p-3 border border-border">
          <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">
            Average Case
          </p>
          <p className="text-lg font-mono font-semibold text-accent">
            {algo.complexity.average}
          </p>
        </div>

        <div className="bg-muted/50 rounded p-3 border border-border">
          <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">
            Worst Case
          </p>
          <p className="text-lg font-mono font-semibold text-accent">
            {algo.complexity.worst}
          </p>
        </div>
      </div>

      <div className="mt-4 p-3 bg-muted/30 rounded border border-border">
        <p className="text-xs text-muted-foreground">
          <span className="font-semibold">Category:</span>{' '}
          {algo.category === 'sorting' ? 'Sorting Algorithm' : 'Searching Algorithm'}
        </p>
      </div>
    </Card>
  );
}
