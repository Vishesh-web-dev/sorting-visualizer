export interface IRandomArray {
  value: number;
  isPositionChanged: boolean;
  isAtCorrectPosition: boolean;
}
export interface ISelectOptions {
  title: string;
  value: string;
}
export interface IVisualizationStatus {
  started: boolean;
  running: boolean;
  stopped: boolean;
  completed: boolean;
}
export type SortingAlgorithmKeys =
  | "Bubble Sort"
  | "Selection Sort"
  | "Insertion Sort"
  | "Merge Sort"
  | "Quick Sort";
