'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight, Pause, Play, RotateCcw, Zap } from 'lucide-react';

interface ControlPanelProps {
  isRunning: boolean;
  isPaused: boolean;
  onStart: () => void;
  onPause: () => void;
  onResume: () => void;
  onReset: () => void;
  onNext: () => void;
  arraySize: number;
  onArraySizeChange: (size: number) => void;
  speed: number;
  onSpeedChange: (speed: number) => void;
  selectedAlgorithm: string;
  onAlgorithmChange: (algorithm: string) => void;
  algorithms: string[];
  isSorting: boolean;
  isSearching: boolean;
  searchTarget?: number;
  onSearchTargetChange?: (target: number) => void;
}

export function ControlPanel({
  isRunning,
  isPaused,
  onStart,
  onPause,
  onResume,
  onReset,
  onNext,
  arraySize,
  onArraySizeChange,
  speed,
  onSpeedChange,
  selectedAlgorithm,
  onAlgorithmChange,
  algorithms,
  isSorting,
  isSearching,
  searchTarget,
  onSearchTargetChange,
}: ControlPanelProps) {
  return (
    <div className="space-y-6 bg-card p-6 rounded-lg border border-border">
      {/* Algorithm Selection */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-3">
          Algorithm
        </label>
        <select
          value={selectedAlgorithm}
          onChange={(e) => onAlgorithmChange(e.target.value)}
          disabled={isRunning}
          className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground disabled:opacity-50"
        >
          {algorithms.map((algo) => (
            <option key={algo} value={algo}>
              {algo}
            </option>
          ))}
        </select>
      </div>

      {/* Array Size */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-medium text-foreground">
            Array Size
          </label>
          <span className="text-xs text-muted-foreground">{arraySize}</span>
        </div>
        <input
          type="range"
          min="10"
          max="150"
          value={arraySize}
          onChange={(e) => onArraySizeChange(parseInt(e.target.value))}
          disabled={isRunning}
          className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer disabled:opacity-50"
        />
        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          <span>10</span>
          <span>150</span>
        </div>
      </div>

      {/* Speed Control */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-medium text-foreground">
            Speed
          </label>
          <span className="text-xs text-muted-foreground">
            {speed === 50 ? 'Slow' : speed === 100 ? 'Medium' : 'Fast'}
          </span>
        </div>
        <input
          type="range"
          min="10"
          max="200"
          step="10"
          value={speed}
          onChange={(e) => onSpeedChange(parseInt(e.target.value))}
          className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          <span>Slow</span>
          <span>Fast</span>
        </div>
      </div>

      {/* Search Target (for search algorithms) */}
      {isSearching && searchTarget !== undefined && onSearchTargetChange && (
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Search Target
          </label>
          <input
            type="number"
            value={searchTarget}
            onChange={(e) => onSearchTargetChange(parseInt(e.target.value) || 0)}
            disabled={isRunning}
            className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground disabled:opacity-50"
          />
        </div>
      )}

      {/* Control Buttons */}
      <div className="flex gap-2">
        {!isRunning && !isPaused && (
          <Button
            onClick={onStart}
            className="flex-1 gap-2 bg-primary hover:bg-primary/90"
          >
            <Play size={16} />
            Start
          </Button>
        )}

        {isRunning && !isPaused && (
          <Button
            onClick={onPause}
            className="flex-1 gap-2 bg-primary hover:bg-primary/90"
          >
            <Pause size={16} />
            Pause
          </Button>
        )}

        {isPaused && (
          <>
            <Button
              onClick={onResume}
              className="flex-1 gap-2 bg-primary hover:bg-primary/90"
            >
              <Play size={16} />
              Resume
            </Button>
            <Button
              onClick={onNext}
              variant="outline"
              className="gap-2 bg-transparent"
              disabled={!isPaused}
            >
              <ChevronRight size={16} />
              Step
            </Button>
          </>
        )}

        <Button
          onClick={onReset}
          variant="outline"
          className="gap-2 bg-transparent"
          disabled={!isRunning && !isPaused}
        >
          <RotateCcw size={16} />
          Reset
        </Button>
      </div>

      {/* Info */}
      <div className="bg-muted/50 rounded p-3 border border-border">
        <p className="text-xs text-muted-foreground">
          💡 Select an algorithm and adjust array size and speed, then click Start
          to visualize!
        </p>
      </div>
    </div>
  );
}
