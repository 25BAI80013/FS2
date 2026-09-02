import React, { memo } from "react";

function Stats({ totalPosts, platforms }) {
  return (
    <div className="stats">
      <div>
        <h3>{totalPosts}</h3>
        <p>Total Posts</p>
      </div>

      <div>
        <h3>{platforms}</h3>
        <p>Platforms</p>
      </div>
    </div>
  );
}

export default memo(Stats);