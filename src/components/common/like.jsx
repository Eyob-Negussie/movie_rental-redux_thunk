import React from "react";

function Like(props) {
  let classes = "clickable fa fa-heart";
  classes += !props.liked ? "-o" : "";
  return (
    <i
      onClick={() => props.onLike(props.movie)}
      className={classes}
      aria-hidden="true"
    />
  );
}

export default Like;
