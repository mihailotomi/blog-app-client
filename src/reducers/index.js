import { combineReducers } from "redux";
import authReducer from "./authReducer";
import PostsReducer from "./PostsReducer";

export default combineReducers({
  auth: authReducer,
  posts: PostsReducer,
});
