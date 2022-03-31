import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { users } from "../../actions";
import { renderCreationTime } from "../../utils";

import classes from "../../styles/Posts/PostList.module.scss";

const PostThumbnail = ({ title, content, creatorId, auth, id, createdAt }) => {
  const [creatorName, setCreatorName] = useState(" ");
  const navigate = useNavigate();

  renderCreationTime(createdAt);

  useEffect(() => {
    async function getCreator() {
      const creator = await users.get("/", { params: { id: creatorId } });
      if (creator) {
        setCreatorName(creator.data.userName);
      }
    }

    getCreator();
  }, [creatorName]);

  return (
    <article className={classes["post-thumbnail"]}>
      <div className={classes["creator-info"]}>
        <img
          src={`https://avatars.dicebear.com/api/bottts/${creatorName}.svg`}
          style={{ width: "2.5rem" }}
        />
        <h3 className={`${classes["creator-name"]}`}>{creatorName}</h3>
      </div>
      <span className="creation-time">{renderCreationTime(createdAt)}</span>
      <Link to={`/posts/show/${id}`}>
        <h2>{title}</h2>
      </Link>
      <p className={`${classes.content}`}>
        {content.slice(0, 99)}
        {content.length > 100 ? "..." : ""}
      </p>
    </article>
  );
};

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

export default connect(mapStateToProps)(PostThumbnail);
