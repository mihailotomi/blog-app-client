import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { fetchPost, deletePost } from "../../actions";

//components,actions,...
import Button from "../Button";

//it can use all the same styling as PostShow
import classes from "../../styles/Posts/PostShow.module.scss";

const PostDelete = ({ auth, posts, fetchPost, deletePost }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      //with react-router, each component must fetch its own records
      fetchPost(id);
    }
    ////only on first render
  }, []);

  const renderContent = () => {
    if (posts[id]) {
      if (auth.userId === posts[id].userId) {
        return (
          <article className={classes.post}>
            <h1 className={classes.title}>{`Delete this post`}</h1>
            <div className={classes.content}>{"title: " + posts[id].title}</div>
            <span className={classes["button-wrapper"]}>
              <Button
                label={"NE"}
                onClick={() => {
                  navigate(`/`);
                }}
                color={"#1212ffbd"}
              />
              <Button
                label={"DA"}
                onClick={() => {
                  deletePost(id, auth.userId);
                  navigate(`/`);
                }}
                color={"#ff0000b3"}
              />
            </span>
          </article>
        );
      }
    }
  };

  return (
    <div className="container" style={{ paddingTop: "15vh" }}>
      {renderContent()}
    </div>
  );
};

const mapStateToProps = (state) => {
  return { auth: state.auth, posts: state.posts };
};

export default connect(mapStateToProps, { fetchPost, deletePost })(PostDelete);
