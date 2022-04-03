//depencies
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

//components, actions...
import { users } from "../../actions";
import { renderCreationTime } from "../../utils";

//styles
import classes from "../../styles/Posts/PostList.module.scss";

//it gets passed the post data
const PostThumbnail = ({ title, content, creatorId, auth, id, createdAt }) => {
  //state to render the user name of the user who created the comment
  const [creatorName, setCreatorName] = useState(" ");

  useEffect(() => {
    ////fetch the name of the user
    async function getCreator(id) {
      const creator = await users.get("/", { params: { id } });
      if (creator) {
        setCreatorName(creator.data.userName);
      }
    }

    getCreator(creatorId);
  }, [creatorId]);

  return (
    <article className={classes["post-thumbnail"]}>
      <div className={classes["creator-info"]}>
        <img
          ////we pull the avatars from dicebear generator
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
        {
          ////this is a thumbnail, so we do not want to display the entire content
          content.slice(0, 99)
        }
        {content.length > 100 ? "..." : ""}
      </p>
    </article>
  );
};

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

export default connect(mapStateToProps)(PostThumbnail);
