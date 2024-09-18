import { Slider, Tabs, Button, Select } from "antd";
import useSortingVisualizer from "./sorting-visualizer-controller";
import {
  SIZE_SLIDER_STEP,
  MAX_ARRAY_SIZE,
  MAX_SORTING_SPEED,
  MIN_ARRAY_SIZE,
  MIN_SORTING_SPEED,
  SORTING_ALGORITHMS,
  SPEED_SLIDER_STEP,
  DEFAULT_ARRAY_SIZE,
  DEFAULT_SORTING_SPEED,
  CHART_ORIENTATION,
  SORT_ORDER,
} from "../../utils/enums";
import TabPane from "antd/es/tabs/TabPane";
import { ColumnChart } from "../../components";
import ButtonGroup from "antd/es/button/button-group";
import {
  FastBackwardFilled,
  FastForwardFilled,
  StepBackwardFilled,
  StepForwardFilled,
} from "@ant-design/icons";

function SortingVisualizer() {
  const {
    currentStep,
    totalStepsCount,
    chartData,
    showAnimation,
    chartOrientation,
    sortOrder,
    arraySize,
    sortingSpeed,
    isVisualizationStarted,
    isVisualizationRunning,
    isVisualizationCompleted,
    onArraySizeChange,
    onSortingSpeedChange,
    onSortingAlgorithmChange,
    onGenerateArrayBtnClick,
    onVisualizationStartOrResume,
    onVisualizationStop,
    onChartOrientationChange,
    onSortOrderChange,
    onNavigateToStep,
  } = useSortingVisualizer();
  return (
    <>
      <h1 className="" style={{ backgroundColor: "black", color: "white" }}>
        Sorting Visualizer
      </h1>
      <div>
        <ColumnChart
          chartData={chartData}
          showAnimation={showAnimation}
          chartOrientation={chartOrientation}
        />
      </div>
      {isVisualizationStarted || isVisualizationCompleted ? (
        <div
          className="step-counter"
          style={{ margin: "20px 0", textAlign: "center" }}
        >
          <h3>
            Step {currentStep + 1} of {totalStepsCount}
          </h3>
        </div>
      ) : (
        <div
          className="step-counter"
          style={{ margin: "20px 0", textAlign: "center" }}
        >
          <h3></h3>
        </div>
      )}

      <div className="">
        <Tabs
          defaultActiveKey={SORTING_ALGORITHMS[0]}
          style={{ height: 220 }}
          type="card"
          //@ts-ignore
          onChange={onSortingAlgorithmChange}
          tabPosition="left"
        >
          {SORTING_ALGORITHMS.map((algo) => (
            <TabPane tab={algo} key={algo}>
              <div>
                <ButtonGroup>
                  <Button
                    onClick={() => onNavigateToStep(0)}
                    disabled={isVisualizationRunning || currentStep === 0}
                  >
                    <FastBackwardFilled />
                    Go to first
                  </Button>
                  <Button
                    onClick={() => onNavigateToStep(currentStep - 1)}
                    disabled={isVisualizationRunning || currentStep === 0}
                  >
                    <StepBackwardFilled />
                    Go back
                  </Button>
                  <Button
                    onClick={() => onNavigateToStep(currentStep + 1)}
                    disabled={
                      isVisualizationRunning ||
                      currentStep >= totalStepsCount - 1
                    }
                  >
                    Go forward
                    <StepForwardFilled />
                  </Button>
                  <Button
                    onClick={() => onNavigateToStep(totalStepsCount - 1)}
                    disabled={
                      isVisualizationRunning ||
                      currentStep >= totalStepsCount - 1
                    }
                  >
                    Go to Last
                    <FastForwardFilled />
                  </Button>
                </ButtonGroup>
              </div>
              <div className="slider">
                <p className="">Change Array Size</p>
                <Slider
                  max={MAX_ARRAY_SIZE}
                  min={MIN_ARRAY_SIZE}
                  step={SIZE_SLIDER_STEP}
                  defaultValue={DEFAULT_ARRAY_SIZE}
                  onChange={onArraySizeChange}
                  disabled={isVisualizationStarted}
                  value={arraySize}
                  // tipFormatter={}
                />
              </div>

              <div className="slider">
                <p className="">Change Sorting Speed</p>
                <Slider
                  max={MAX_SORTING_SPEED}
                  min={MIN_SORTING_SPEED}
                  step={SPEED_SLIDER_STEP}
                  defaultValue={DEFAULT_SORTING_SPEED}
                  onChange={onSortingSpeedChange}
                  disabled={isVisualizationRunning}
                  value={sortingSpeed}
                  // tipFormatter={}
                />
              </div>

              <div>
                <Button
                  onClick={onGenerateArrayBtnClick}
                  disabled={isVisualizationRunning}
                >
                  Generate Random Array
                </Button>
              </div>
              <div>
                <ButtonGroup>
                  <Button
                    onClick={onVisualizationStartOrResume}
                    disabled={isVisualizationRunning}
                  >
                    {isVisualizationStarted
                      ? "Resume Visualization"
                      : isVisualizationCompleted
                      ? "Re Start Visualization"
                      : "Start Visualization"}
                  </Button>
                  <Button
                    onClick={onVisualizationStop}
                    disabled={!isVisualizationRunning}
                  >
                    Stop Vizualization
                  </Button>
                </ButtonGroup>
              </div>

              <div>
                <Select
                  showSearch={true}
                  value={sortOrder}
                  onChange={(val) => {
                    onSortOrderChange(val);
                  }}
                  defaultValue={sortOrder}
                  placeholder={"Select Sort Order"}
                  getPopupContainer={(trigger) =>
                    trigger?.parentElement as HTMLElement
                  }
                  disabled={isVisualizationStarted}
                >
                  {SORT_ORDER?.map((sortOrder) => (
                    <Select.Option key={sortOrder} value={sortOrder}>
                      {sortOrder}
                    </Select.Option>
                  ))}
                </Select>
              </div>
            </TabPane>
          ))}
        </Tabs>
      </div>
      <div>
        <Select
          showSearch={true}
          value={chartOrientation}
          onChange={(val) => {
            onChartOrientationChange(val);
          }}
          defaultValue={CHART_ORIENTATION[0]}
          placeholder={"Select Orientation"}
          getPopupContainer={(trigger) => trigger?.parentElement as HTMLElement}
        >
          {CHART_ORIENTATION?.map((orientation) => (
            <Select.Option key={orientation} value={orientation}>
              {orientation}
            </Select.Option>
          ))}
        </Select>
      </div>
    </>
  );
}

export default SortingVisualizer;
