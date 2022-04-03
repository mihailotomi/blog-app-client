// dependencies
import React, { useEffect } from "react";
import { connect } from "react-redux";

// components, actions...
import PostThumbnail from "./PostThumbnail";
import { fetchPosts } from "../../actions";

// styles
import classes from "../../styles/Posts/PostList.module.scss";

const PostList = ({ fetchPosts, posts, sorter, sortOrder }) => {
  //#with react-router, each component must fetch its own records
  useEffect(() => {
    fetchPosts({ sortBy: sorter, sortOrder });
  }, [sortOrder, sorter]);

  //if the posts are successfully fetched, turn them into a list of jsx blocks
  const renderPostList = () => {
    if (posts) {
      return posts.map((post, index) => {
        return (
          <PostThumbnail
            title={post.title}
            content={post.content}
            creatorId={post.userId}
            key={post._id}
            id={post._id}
            createdAt={post.createdAt}
          />
        );
      });
    }
    return "";
  };

  return (
    <section className={`${classes["post-list"]} container`}>
      {renderPostList()}
    </section>
  );
};

const mapStateToProps = (state) => {
  ////transform the all posts object back into an array so we could map over it
  return { posts: Object.values(state.posts) };
};

export default connect(mapStateToProps, { fetchPosts })(PostList);
