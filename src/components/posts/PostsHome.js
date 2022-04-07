import React, { useState } from "react";

import Intro from "./Intro";
import PostList from "./PostList";
import Dropdown from "../Dropdown";

const sorters = {
  Datumu: "createdAt",
  Azbucno: "title",
};

const sortOrders = {
  opadajuce: "-1",
  rastuce: "1",
};

const PostsHome = () => {
  const [selectedSorter, setSelectedSorter] = useState(Object.keys(sorters)[0]);
  const [selectedSortOrder, setSelectedSortOrder] = useState(
    Object.keys(sortOrders)[0]
  );

  return (
    <section>
      <Intro />
      <div style={{ display: "flex", marginTop: "1rem" }} className="container">
        <span style={{ fontSize: "1.125rem" }}>Sortiraj po: &nbsp;</span>
        <Dropdown
          options={sorters}
          selectedOption={selectedSorter}
          setSelectedOption={setSelectedSorter}
        />
        <Dropdown
          options={sortOrders}
          selectedOption={selectedSortOrder}
          setSelectedOption={setSelectedSortOrder}
        />
      </div>
      <PostList
        sorter={sorters[selectedSorter]}
        sortOrder={sortOrders[selectedSortOrder]}
      />
    </section>
  );
};

export default PostsHome;
