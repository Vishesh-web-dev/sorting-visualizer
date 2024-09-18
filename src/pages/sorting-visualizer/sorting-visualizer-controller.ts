import { useCallback, useEffect, useRef, useState } from "react";
import {
  CHART_ORIENTATION,
  DEFAULT_ARRAY_SIZE,
  DEFAULT_SORTING_SPEED,
  SORTING_ALGORITHMS,
  SORT_ORDER,
} from "../../utils/enums";
import {
  IRandomArray,
  IVisualizationStatus,
  SortingAlgorithmKeys,
} from "../../types";
import {
  bubbleSort,
  insertionSort,
  mergeSort,
  quickSort,
  randomArrayGenerator,
  selectionSort,
} from "../../utils";
import { useNotification } from "../../hooks";
function useSortingVisualizer() {
  const notify = useNotification();
  const timerIds = useRef<number[]>([]);
  const [selectedAlgorithm, setSelectedAlgorithm] =
    useState<SortingAlgorithmKeys>(SORTING_ALGORITHMS[0]);
  const [arraySize, setArraySize] = useState<number>(DEFAULT_ARRAY_SIZE);

  const [sortingSpeed, setSortingSpeed] = useState<number>(
    DEFAULT_SORTING_SPEED
  );

  const [chartData, setChartData] = useState<IRandomArray[]>(() =>
    randomArrayGenerator(arraySize)
  );

  const [sortingStepsData, setSortingStepData] = useState<IRandomArray[][]>([]);

  const [step, setStep] = useState<number>(0);

  const [chartOrientation, setChartOrientation] = useState<string>(
    CHART_ORIENTATION[0]
  );

  const [sortOrder, setSortOrder] = useState<string>(SORT_ORDER[0]);

  const [showAnimation, setShowAnimation] = useState<boolean>(true);

  const [visualizationStatus, setVisualizationStatus] =
    useState<IVisualizationStatus>({
      started: false,
      running: false,
      stopped: false,
      completed: false,
    });

  const sortingAlgorithms = useCallback(
    (chartData: IRandomArray[], sortOrder: string) => ({
      [SORTING_ALGORITHMS[0]]: () => bubbleSort(chartData, sortOrder),
      [SORTING_ALGORITHMS[1]]: () => selectionSort(chartData, sortOrder),
      [SORTING_ALGORITHMS[2]]: () => insertionSort(chartData, sortOrder),
      [SORTING_ALGORITHMS[3]]: () => mergeSort(chartData, sortOrder),
      [SORTING_ALGORITHMS[4]]: () => quickSort(chartData, sortOrder),
    }),
    [chartData, sortOrder]
  );

  const clearTimers = useCallback(() => {
    timerIds.current.forEach((id) => clearTimeout(id));
    timerIds.current = [];
  }, [timerIds]);

  const resetToInitialState = (size: number = arraySize) => {
    setChartData(randomArrayGenerator(size));
    setSortingStepData([]);
    setShowAnimation(true);
    setVisualizationStatus({
      started: false,
      running: false,
      stopped: false,
      completed: false,
    });
    setStep(0);
    clearTimers();
  };

  const onSortingAlgorithmChange = (
    selectedAlgorithm: SortingAlgorithmKeys
  ) => {
    setSelectedAlgorithm(selectedAlgorithm);
    resetToInitialState();
  };

  const onArraySizeChange = (value: number) => {
    setArraySize(value);
    resetToInitialState(value);
  };

  const onSortingSpeedChange = (value: number) => {
    setSortingSpeed(value);
  };

  const onGenerateArrayBtnClick = () => {
    resetToInitialState();
  };

  const onChartOrientationChange = (orientation: string) => {
    setChartOrientation(orientation);
    setShowAnimation(false);
  };

  const onSortOrderChange = (sortOrder: string) => {
    if (visualizationStatus.completed) {
      setChartData(
        chartData.map((data) => ({
          ...data,
          isAtCorrectPosition: false,
        }))
      );
    }
    setSortOrder(sortOrder);
    setSortingStepData([]);
    setShowAnimation(true);
    setVisualizationStatus({
      started: false,
      running: false,
      stopped: false,
      completed: false,
    });
    setStep(0);
    clearTimers();
  };
  const onVisualizationStartOrResume = () => {
    if (!visualizationStatus.started || visualizationStatus.completed) {
      const newChartData = chartData.map((data) => ({
        ...data,
        isAtCorrectPosition: false,
      }));
      setChartData(newChartData);
      setStep(0);
      setSortingStepData(
        sortingAlgorithms(newChartData, sortOrder)[selectedAlgorithm]
      );
    }
    setVisualizationStatus({
      started: true,
      running: true,
      stopped: false,
      completed: false,
    });
    setShowAnimation(false);
  };

  const onVisualizationStop = () => {
    clearTimers();
    setVisualizationStatus({
      started: true,
      running: false,
      stopped: true,
      completed: false,
    });
    setShowAnimation(true);
  };

  const onVisualizationComplete = () => {
    notify("success", "Array Sorted Successfully", "yay");
    setVisualizationStatus({
      started: false,
      running: false,
      stopped: false,
      completed: true,
    });
    setShowAnimation(true);
  };

  const onNavigateToStep = (step: number) => {
    setStep(step);
    setChartData(sortingStepsData[step]);
    if (step === sortingStepsData.length - 1) {
      onVisualizationComplete();
    } else if (step !== 0) {
      onVisualizationStop();
    }
  };

  useEffect(() => {
    if (visualizationStatus.running) {
      let delay = 0;
      for (
        let currStep = step;
        currStep < sortingStepsData.length;
        currStep++
      ) {
        const timerId = setTimeout(() => {
          if (currStep === sortingStepsData.length - 1) {
            onVisualizationComplete();
          }
          setStep(currStep);
          setChartData(sortingStepsData[currStep]);
        }, sortingSpeed * delay);
        delay++;
        timerIds.current.push(timerId);
      }
    }
    return () => {
      clearTimers();
    };
  }, [visualizationStatus]);

  return {
    currentStep: step,
    totalStepsCount: sortingStepsData.length,
    chartData,
    showAnimation,
    chartOrientation,
    sortOrder,
    arraySize,
    sortingSpeed,
    isVisualizationStarted: visualizationStatus.started,
    isVisualizationRunning: visualizationStatus.running,
    isVisualizationStopped: visualizationStatus.stopped,
    isVisualizationCompleted: visualizationStatus.completed,
    onArraySizeChange,
    onSortingSpeedChange,
    onSortingAlgorithmChange,
    onGenerateArrayBtnClick,
    onVisualizationStartOrResume,
    onVisualizationStop,
    onChartOrientationChange,
    onSortOrderChange,
    onNavigateToStep,
  };
}
export default useSortingVisualizer;
