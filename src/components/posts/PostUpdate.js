import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { updatePost, fetchPost } from "../../actions";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import classes from "../../styles/Posts/PostCreate.module.scss";

const PostUpdate = ({ updatePost, auth, fetchPost, posts }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (!auth.isSignedIn) {
      navigate("/");
    }
    if (posts[id] && posts[id].userId !== auth.userId) {
      navigate("/");
    }
  }, [auth]);

  ////temporary state to control the inputs
  const [title, changeTitle] = useState("");
  const [content, changeContent] = useState("");

  useEffect(() => {
    if (id) {
      fetchPost(id);
    }
  }, []);

  useEffect(() => {
    if (posts[id]) {
      changeTitle(posts[id].title);
      changeContent(posts[id].content);
    }
  }, [posts]);

  return (
    <div className={`${classes["post-create"]} container`}>
      <form
        className={classes.form}
        id="post-create"
        onSubmit={() => {
          updatePost({ title, content, id });
          navigate("/");
        }}
      >
        <label>Naslov</label>
        <input
          type="text"
          className={classes["input"]}
          value={title}
          onChange={(event) => {
            changeTitle(event.target.value);
          }}
        />
        <label>Sadržaj</label>
        <textarea
          className={classes["input"]}
          style={{ resize: "none", height: "calc(8vh + 8vw)" }}
          value={content}
          onChange={(event) => {
            changeContent(event.target.value);
          }}
        ></textarea>
        <button className="button">
          <p>Objava</p>
        </button>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { auth: state.auth, posts: state.posts };
};

export default connect(mapStateToProps, { updatePost, fetchPost })(PostUpdate);
