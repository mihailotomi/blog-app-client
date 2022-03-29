import React from "react";

import classes from "../../styles/Posts/PostList.module.scss";

const Intro = () => {
  return (
    <article className={`${classes.welcome}`}>
      <h2 className={classes["welcome-title"]}>Dobrodošli na sajt Moj Blog</h2>
      <p className={classes["welcome-description"]}>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Enim ea
        tenetur magni aliquid quia quo fugiat dolorum vitae? Explicabo inventore
        labore amet repellendus tenetur, ea quia laudantium et maxime? Voluptas.
      </p>
    </article>
  );
};

export default Intro;
