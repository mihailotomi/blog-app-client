import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

import Button from "../Button";
import { users } from "../../actions";

import classes from "../../styles/Posts/PostList.module.scss";

const PostThumbnail = ({ title, content, creatorId, auth, id }) => {
  const [creatorName, setCreatorName] = useState(" ");
  const navigate = useNavigate();

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
      <h2>{title}</h2>
      <p className={`${classes.content}`}>
        {content.slice(0, 99)}
        {content.length > 100 ? "..." : ""}
      </p>

      <Button
        label={auth.userId === creatorId ? "Promeni" : "Procitaj"}
        onClick={() => {
          if (auth.userId === creatorId) {
            navigate(`/posts/update/${id}`);
          }
        }}
      />
    </article>
  );
};

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

export default connect(mapStateToProps)(PostThumbnail);
