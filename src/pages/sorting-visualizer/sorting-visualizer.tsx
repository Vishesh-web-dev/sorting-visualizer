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
      <div className="">
        <Tabs
          defaultActiveKey={SORTING_ALGORITHMS[0]}
          style={{ height: 220 }}
          type="card"
          onChange={onSortingAlgorithmChange}
          tabPosition="left"
        >
          {SORTING_ALGORITHMS.map((algo) => (
            <TabPane tab={algo} key={algo} disabled={isVisualizationRunning}>
              <div>
                <ButtonGroup>
                  <Button disabled={isVisualizationRunning}>
                    <FastBackwardFilled />
                    Go back
                  </Button>
                  <Button disabled={isVisualizationRunning}>
                    <StepBackwardFilled />
                    Go back
                  </Button>
                  <Button disabled={isVisualizationRunning}>
                    Go forward
                    <StepForwardFilled />
                  </Button>
                  <Button disabled={isVisualizationRunning}>
                    Go forward
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
                  disabled={isVisualizationRunning}
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
                    onClick={onStartVisualization}
                    disabled={isVisualizationRunning}
                  >
                    Start Vizualization
                  </Button>
                  <Button
                    onClick={onStopVisualization}
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
