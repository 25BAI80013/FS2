import { useSelector } from "react-redux";
import PostCard from "./PostCard";

function PostList() {

  const posts = useSelector(
    (state) => state.posts.posts
  );

  return (
    <div>

      <h2>All Posts</h2>

      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
        />
      ))}

    </div>
  );
}

export default PostList;