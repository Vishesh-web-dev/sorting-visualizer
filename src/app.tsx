import { Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";

import { Spinner } from "./components";
import "./app.css";

//lazy load
const Dashboard = lazy(() => import("./pages/dashboard"));
const SortingVisualizer = lazy(() => import("./pages/sorting-visualizer"));
const PathFindingVisualizer = lazy(
  () => import("./pages/path-finding-visualizer")
);
const PageNotFound = lazy(() => import("./pages/page-not-found"));

function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route path="/" element={<Dashboard />}></Route>
        <Route
          path="/sorting-visualizer"
          element={<SortingVisualizer />}
        ></Route>
        <Route
          path="/pathfinding-visualizer"
          element={<PathFindingVisualizer />}
        ></Route>
        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>
    </Suspense>
  );
}

export default App;
