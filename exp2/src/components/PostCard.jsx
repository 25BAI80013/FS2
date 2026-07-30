import { useDispatch } from "react-redux";
import { deletePost } from "../redux/features";

function PostCard({ post }) {

  const dispatch = useDispatch();

  return (
    <div className="post-card">

      <h3>{post.title}</h3>

      <p>{post.content}</p>

      <strong>{post.platform}</strong>

      <br /><br />

      <button
        onClick={() => dispatch(deletePost(post.id))}
      >
        Delete
      </button>

    </div>
  );
}

export default PostCard;