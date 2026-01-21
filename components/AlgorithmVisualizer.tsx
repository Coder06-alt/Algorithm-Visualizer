'use client';

import React, { useCallback, useEffect, useState } from 'react';
import {
  bubbleSort,
  selectionSort,
  insertionSort,
  mergeSort,
  quickSort,
  linearSearch,
  binarySearch,
  ALGORITHMS,
  type AlgorithmStep,
} from '@/lib/algorithms';
import { VisualizationCanvas } from './VisualizationCanvas';
import { ControlPanel } from './ControlPanel';
import { ComplexityDisplay } from './ComplexityDisplay';
import { StatsDisplay } from './StatsDisplay';

const ALGORITHM_GENERATORS: Record<string, Function> = {
  bubbleSort,
  selectionSort,
  insertionSort,
  mergeSort,
  quickSort,
  linearSearch,
  binarySearch,
};

interface VisualizerState {
  currentStep: AlgorithmStep;
  steps: AlgorithmStep[];
  currentStepIndex: number;
  isRunning: boolean;
  isPaused: boolean;
  arraySize: number;
  speed: number;
  selectedAlgorithm: string;
  searchTarget: number;
  comparisons: number;
  swaps: number;
}

export function AlgorithmVisualizer() {
  const [state, setState] = useState<VisualizerState>({
    currentStep: { array: [] },
    steps: [],
    currentStepIndex: 0,
    isRunning: false,
    isPaused: false,
    arraySize: 50,
    speed: 100,
    selectedAlgorithm: 'bubbleSort',
    searchTarget: 50,
    comparisons: 0,
    swaps: 0,
  });

  const animationFrameRef = React.useRef<NodeJS.Timeout>();

  // Generate random array
  const generateArray = useCallback(
    (size: number = state.arraySize) => {
      return Array.from(
        { length: size },
        () => Math.floor(Math.random() * 100) + 1
      );
    },
    [state.arraySize]
  );

  // Initialize algorithm steps
  const initializeAlgorithm = useCallback(() => {
    const array = generateArray();
    const algo = state.selectedAlgorithm;
    const generator =
      algo === 'linearSearch' || algo === 'binarySearch'
        ? ALGORITHM_GENERATORS[algo](array, state.searchTarget)
        : ALGORITHM_GENERATORS[algo](array);

    const steps: AlgorithmStep[] = [];
    let result;
    while (!(result = generator.next()).done) {
      steps.push(result.value);
    }

    setState((prev) => ({
      ...prev,
      steps,
      currentStep: steps[0] || { array },
      currentStepIndex: 0,
      isRunning: false,
      isPaused: false,
      comparisons: 0,
      swaps: 0,
    }));
  }, [state.selectedAlgorithm, state.searchTarget, generateArray]);

  // Initialize on mount and when algorithm changes
  useEffect(() => {
    initializeAlgorithm();
  }, [state.selectedAlgorithm, state.arraySize, initializeAlgorithm]);

  // Animation loop
  useEffect(() => {
    if (!state.isRunning || state.isPaused) {
      return;
    }

    const delayMs = 201 - state.speed; // Speed: 10-200ms

    animationFrameRef.current = setTimeout(() => {
      setState((prev) => {
        const nextIndex = prev.currentStepIndex + 1;

        if (nextIndex >= prev.steps.length) {
          // Algorithm complete
          return {
            ...prev,
            isRunning: false,
            currentStepIndex: prev.steps.length - 1,
          };
        }

        const nextStep = prev.steps[nextIndex];
        const comparisons = prev.comparisons + (nextStep.compared?.length || 0);
        const swaps = prev.swaps + (nextStep.swapped?.length || 0);

        return {
          ...prev,
          currentStep: nextStep,
          currentStepIndex: nextIndex,
          comparisons,
          swaps,
        };
      });
    }, delayMs);

    return () => clearTimeout(animationFrameRef.current);
  }, [state.isRunning, state.isPaused, state.speed, state.currentStepIndex]);

  const handleStart = () => {
    setState((prev) => ({
      ...prev,
      isRunning: true,
      isPaused: false,
      currentStepIndex: 0,
      comparisons: 0,
      swaps: 0,
    }));
  };

  const handlePause = () => {
    setState((prev) => ({
      ...prev,
      isPaused: true,
    }));
  };

  const handleResume = () => {
    setState((prev) => ({
      ...prev,
      isPaused: false,
    }));
  };

  const handleNext = () => {
    setState((prev) => {
      const nextIndex = Math.min(prev.currentStepIndex + 1, prev.steps.length - 1);
      const nextStep = prev.steps[nextIndex];
      const comparisons = prev.comparisons + (nextStep.compared?.length || 0);
      const swaps = prev.swaps + (nextStep.swapped?.length || 0);

      return {
        ...prev,
        currentStep: nextStep,
        currentStepIndex: nextIndex,
        comparisons,
        swaps,
      };
    });
  };

  const handleReset = () => {
    setState((prev) => ({
      ...prev,
      isRunning: false,
      isPaused: false,
      currentStepIndex: 0,
      currentStep: prev.steps[0] || { array: [] },
      comparisons: 0,
      swaps: 0,
    }));
  };

  const handleAlgorithmChange = (algo: string) => {
    setState((prev) => ({
      ...prev,
      selectedAlgorithm: algo,
      isRunning: false,
      isPaused: false,
    }));
  };

  const algorithmKeys = Object.keys(ALGORITHMS);
  const isSorting = state.selectedAlgorithm.includes('Sort');
  const isSearching = !isSorting;

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-gradient">
            Algorithm Visualizer
          </h1>
          <p className="text-muted-foreground">
            Interactive visualization of sorting and searching algorithms
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Visualization Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Canvas */}
            <VisualizationCanvas
              step={state.currentStep}
              arraySize={state.arraySize}
              canvasWidth={800}
              canvasHeight={400}
            />

            {/* Complexity Display */}
            <ComplexityDisplay algorithm={state.selectedAlgorithm} />

            {/* Stats */}
            <StatsDisplay
              comparisons={state.comparisons}
              swaps={state.swaps}
              arraySize={state.arraySize}
              currentStep={state.currentStepIndex}
              totalSteps={state.steps.length}
            />
          </div>

          {/* Control Panel */}
          <div>
            <ControlPanel
              isRunning={state.isRunning}
              isPaused={state.isPaused}
              onStart={handleStart}
              onPause={handlePause}
              onResume={handleResume}
              onReset={handleReset}
              onNext={handleNext}
              arraySize={state.arraySize}
              onArraySizeChange={(size) =>
                setState((prev) => ({ ...prev, arraySize: size }))
              }
              speed={state.speed}
              onSpeedChange={(speed) =>
                setState((prev) => ({ ...prev, speed }))
              }
              selectedAlgorithm={state.selectedAlgorithm}
              onAlgorithmChange={handleAlgorithmChange}
              algorithms={algorithmKeys}
              isSorting={isSorting}
              isSearching={isSearching}
              searchTarget={state.searchTarget}
              onSearchTargetChange={(target) =>
                setState((prev) => ({ ...prev, searchTarget: target }))
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
