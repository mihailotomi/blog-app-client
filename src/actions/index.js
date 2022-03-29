import axios from "axios";

export const posts = axios.create({
  baseURL: "https://tomic-blog-app.herokuapp.com/posts",
});

export const users = axios.create({
  baseURL: "https://tomic-blog-app.herokuapp.com/users",
});

export const signIn = (userId, userName) => async (dispatch) => {
  await users.post("/", { id: userId, userName });
  const response = await users.get("/", { params: { id: userId } });

  dispatch({
    type: "SIGN_IN",
    payload: { userId: response.data._id, userName: response.data.userName },
  });
};

export const signOut = () => {
  return {
    type: "SIGN_OUT",
  };
};

export const createPost =
  ({ title, content }) =>
  async (dispatch, getState) => {
    const { userId } = getState().auth;
    const response = await posts.post("/", {
      title,
      content,
      userId,
    });
    dispatch({
      type: "CREATE_POST",
      payload: response.data,
    });
  };

//optionally provide filter and page
export const fetchPosts =
  ({ filter, page } = {}) =>
  async (dispatch, getState) => {
    const response = await posts.get("/", {
      params: {
        filter,
        page,
      },
    });
    dispatch({
      type: "FETCH_POSTS",
      payload: response.data.posts,
    });
  };

export const fetchPost = (id) => async (dispatch, getState) => {
  const response = await posts.get(`/post`, { params: { id } });
  dispatch({
    type: "FETCH_POST",
    payload: response.data,
  });
};

export const updatePost =
  ({ id, title = undefined, content = undefined }) =>
  async (dispatch, getState) => {
    ////it returns the updated object
    const response = await posts.patch("/", { id, title, content });
    dispatch({
      type: "UPDATE_POST",
      payload: response.data,
    });
  };

export const deletePost = (id, userId) => async (dispatch) => {
  await posts.delete(`/`, { id, userId });
  dispatch({
    type: "DELETE_STREAM",
    payload: id,
  });
};
