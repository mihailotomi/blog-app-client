const INITIAL_STATE = {};

//& Object based state aproach is much easier for adding and updating records
//& we use the object key interpolation syntax
const PostsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "CREATE_POST":
      return { ...state, [action.payload._id]: action.payload };

    case "FETCH_POSTS":
      ////fetched streams are an array, we turn it into an object with ids for keys
      let fetchedPosts = {};
      action.payload.forEach((post) => {
        fetchedPosts[post._id] = post;
      });
      ////we merge fetched streams with the current state
      return { ...fetchedPosts };

    case "FETCH_POST":
      ////object key interpolation, we don't hardcode the key
      ////we made the key dynamic using [smtn]:...
      return { ...state, [action.payload._id]: action.payload };

    case "UPDATE_POST":
      return { ...state, [action.payload._id]: action.payload };

    case "DELETE_POST":
      ////must copy the object, so we don't mutate it
      const newState = { ...state };
      ////dynamically delete the atribute(post) associated with the id
      ////the payload doesn't contain the id, it is the id
      delete newState[action.payload];
      return newState;

    default:
      return state;
  }
};

export default PostsReducer;
