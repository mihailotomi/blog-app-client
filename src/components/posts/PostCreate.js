import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { createPost } from "../../actions";
import { useNavigate } from "react-router-dom";

import classes from "../../styles/Posts/PostCreate.module.scss";

const PostCreate = ({ createPost, auth }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.isSignedIn) {
      navigate("/");
    }
  }, [auth]);

  ////temporary state to control the inputs
  const [title, changeTitle] = useState("");
  const [content, changeContent] = useState("");

  return (
    <div className={`${classes["post-create"]} container`}>
      <form
        className={classes.form}
        id="post-create"
        onSubmit={() => {
          createPost({ title, content });
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
  return { auth: state.auth };
};

export default connect(mapStateToProps, { createPost })(PostCreate);
