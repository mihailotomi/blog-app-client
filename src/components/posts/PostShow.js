//dependencies
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

//components,actions,...
import { fetchPost } from "../../actions";
import { renderCreationTime } from "../../utils";
import { users } from "../../actions";
import Button from "../Button";

//styles
import classes from "../../styles/Posts/PostShow.module.scss";

const PostShow = ({ fetchPost, posts, auth }) => {
  ////destructure the id of of URL parameters
  const { id } = useParams();
  const navigate = useNavigate();
  const [creatorName, setCreatorName] = useState(" ");

  useEffect(() => {
    if (id) {
      //with react-router, each component must fetch its own records
      fetchPost(id);
    }
    ////only on first render
  }, []);

  useEffect(() => {
    ////fetch the name of thee user
    async function getCreator(id) {
      const creator = await users.get("/", {
        params: { id },
      });
      if (creator) {
        setCreatorName(creator.data.userName);
      }
    }
    if (posts[id]) {
      getCreator(posts[id].userId);
    }
  }, [creatorName]);

  const renderUserInfo = () => {
    return (
      <div className={classes["creator-info"]}>
        <img
          src={`https://avatars.dicebear.com/api/bottts/${creatorName}.svg`}
          style={{ width: "3rem" }}
        />
        <h3 className={`${classes["creator-name"]}`}>{creatorName}</h3>
      </div>
    );
  };

  const renderUpdateButton = () => {
    if (auth.userId === posts[id].userId) {
      return (
        <span className={classes["button-wrapper"]}>
          <Button
            label={"Izmeni"}
            onClick={() => {
              navigate(`/posts/update/${posts[id]._id}`);
            }}
          />
          <Button
            label={"Ukloni"}
            onClick={() => {
              navigate(`/posts/delete/${posts[id]._id}`);
            }}
          />
        </span>
      );
    }
    return "";
  };

  const renderPost = () => {
    if (posts[id]) {
      return (
        <article className={`${classes.post}`}>
          {renderUserInfo()}
          <h1 className={classes.title}>{posts[id].title}</h1>
          <span className="creation-time" style={{ fontSize: "1rem" }}>
            {renderCreationTime(posts[id].createdAt)}
          </span>
          <div className={classes.content}>{posts[id].content}</div>
          {renderUpdateButton()}
        </article>
      );
    }
    return "";
  };

  return (
    <div className={`container`} style={{ paddingTop: "15vh" }}>
      {renderPost()}
    </div>
  );
};

const mapStateToProps = (state) => {
  return { posts: state.posts, auth: state.auth };
};

export default connect(mapStateToProps, { fetchPost })(PostShow);
