import { Link } from "react-router-dom";
function Dashboard() {
  return (
    <>
      <Link to="/sorting-visualizer">Go To Sorting Visualizer</Link>
      <br />
      <Link to="/pathfinding-visualizer">Go To Pathfinding Visualizer</Link>
    </>
  );
}

export default Dashboard;
