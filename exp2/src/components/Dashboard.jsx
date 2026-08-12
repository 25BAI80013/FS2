import { useSelector } from "react-redux";
import {
  selectTotalPosts,
  selectInstagramPosts,
  selectLinkedInPosts,
  selectTwitterPosts,
  selectFacebookPosts,
} from "../redux/selectors";

function Dashboard() {
  const totalPosts = useSelector(selectTotalPosts);
  const instagramPosts = useSelector(selectInstagramPosts);
  const linkedInPosts = useSelector(selectLinkedInPosts);
  const twitterPosts = useSelector(selectTwitterPosts);
  const facebookPosts = useSelector(selectFacebookPosts);

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>

      <div className="stats">
        <div className="card">
          <h3>Total Posts</h3>
          <p>{totalPosts}</p>
        </div>

        <div className="card">
          <h3>Instagram</h3>
          <p>{instagramPosts.length}</p>
        </div>

        <div className="card">
          <h3>LinkedIn</h3>
          <p>{linkedInPosts.length}</p>
        </div>

        <div className="card">
          <h3>Twitter</h3>
          <p>{twitterPosts.length}</p>
        </div>

        <div className="card">
          <h3>Facebook</h3>
          <p>{facebookPosts.length}</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;