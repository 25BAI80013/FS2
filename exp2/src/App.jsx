import Dashboard from "./components/Dashboard";
import AddPost from "./components/AddPost";
import PostList from "./components/PostList";

function App() {
  return (
    <div className="container">

      <h1>Social Media Post Manager</h1>

      <Dashboard />

      <AddPost />

      <PostList />

    </div>
  );
}

export default App;