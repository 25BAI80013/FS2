import { useSelector } from "react-redux";

function Dashboard() {
  const posts = useSelector((state) => state.posts.posts);

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>

      <div className="card">
        <h3>Total Posts</h3>
        <p>{posts.length}</p>
      </div>
    </div>
  );
}

export default Dashboard;