import React from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/header/Header";
import PostsHome from "./components/posts/PostsHome";
import PostCreate from "./components/posts/PostCreate";
import PostUpdate from "./components/posts/PostUpdate";
import PostShow from "./components/posts/PostShow";

import "./styles/Utils.scss";

const App = () => {
  return (
    <main>
      <Header />
      <Routes>
        <Route path="/" element={<PostsHome />}></Route>
        <Route path="/posts/new" element={<PostCreate />}></Route>
        <Route path="/posts/update/:id" element={<PostUpdate />}></Route>
        <Route path="/posts/show/:id" element={<PostShow />}></Route>
      </Routes>
    </main>
  );
};

export default App;
