import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  CHART_ORIENTATION,
  DEFAULT_ARRAY_SIZE,
  DEFAULT_SORTING_SPEED,
  SORTING_ALGORITHMS,
  SORT_ORDER,
} from "../../utils/enums";
import { IRandomArray } from "../../types";
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
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<string>(
    SORTING_ALGORITHMS[0]
  );
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

  const [isVisualizationRunning, setIsVisualizationRunning] =
    useState<boolean>(false);

  const sortingAlgorithms: { [key: string]: () => IRandomArray[][] } = useMemo(
    () => ({
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

  const onSortingAlgorithmChange = (selectedAlgorithm: string) => {
    setSelectedAlgorithm(selectedAlgorithm);
    setChartData(randomArrayGenerator(arraySize));
  };

  const onArraySizeChange = (value: number) => {
    setArraySize(value);
    setChartData(randomArrayGenerator(value));
    setShowAnimation(false);
  };

  const onSortingSpeedChange = (value: number) => {
    setSortingSpeed(value);
  };

  const onGenerateArrayBtnClick = () => {
    setChartData(randomArrayGenerator(arraySize));
    setShowAnimation(true);
  };

  const onChartOrientationChange = (orientation: string) => {
    setChartOrientation(orientation);
    setShowAnimation(false);
  };

  const onSortOrderChange = (sortOrder: string) => {
    setSortOrder(sortOrder);
    setShowAnimation(false);
  };
  const onStartVisualization = () => {
    // if (checkSorted(chartData, sortOrder)) {
    // } else {
    // }
    setChartData(
      chartData.map((data) => {
        data.isAtCorrectPosition = false;
        return data;
      })
    );
    setSortingStepData(sortingAlgorithms[selectedAlgorithm]?.() || []);
    setIsVisualizationRunning(true);
    setShowAnimation(false);
  };

  const onStopVisualization = () => {
    clearTimers();
    setIsVisualizationRunning(false);
    setShowAnimation(true);
  };

  const onVisualizationComplete = () => {
    setShowAnimation(true);
    setIsVisualizationRunning(false);
    notify("success", "", "Array Sorted!!");
  };

  useEffect(() => {
    if (isVisualizationRunning) {
      //logic update for curr step which is done yet if continue
      for (let i = step; i < sortingStepsData.length; i++) {}
      sortingStepsData.forEach((data, step) => {
        const timerId = setTimeout(() => {
          if (step === sortingStepsData.length - 1) {
            onVisualizationComplete();
          }
          setChartData([...data]);
          setStep(step);
        }, sortingSpeed * step);
        timerIds.current.push(timerId);
      });
    }
    return () => {
      clearTimers();
    };
  }, [isVisualizationRunning]);
  return {
    chartData,
    showAnimation,
    chartOrientation,
    isVisualizationRunning,
    sortOrder,
    arraySize,
    sortingSpeed,
    onArraySizeChange,
    onSortingSpeedChange,
    onSortingAlgorithmChange,
    onGenerateArrayBtnClick,
    onStartVisualization,
    onStopVisualization,
    onChartOrientationChange,
    onSortOrderChange,
  };
}
export default useSortingVisualizer;
