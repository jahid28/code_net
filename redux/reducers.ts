import { reduxInterface } from "../lib/interfaces";
const initialState:reduxInterface = {
  email:"",
  currentUserDetails: {
    name: "",
    userName: "",
    email: "",
    profilePic: "",
    followers:[],
    following: [],
    noti:false
  },
  redisPostList: []
};

export const reducer1 = (state = initialState, action: {type:string,payload?:string}) => {
  switch (action.type) {
    case 'getEmailReducer':
      return { ...state, email: action.payload };
    case 'clearEmailReducer':
      return { ...state, email: "" };
    case 'getCurrentUserDetailsReducer':
      return { ...state, currentUserDetails: action.payload };
    case 'pushFollowingToArrReducer':
      return { ...state, currentUserDetails: { ...state.currentUserDetails, following: [...state.currentUserDetails.following, action.payload] } };
    case 'popFollowingToArrReducer':
      return { ...state, currentUserDetails: { ...state.currentUserDetails, following: state.currentUserDetails.following.filter((i) => i != action.payload) } };
    case 'storeAllPostsReducer':
      return { ...state, redisPostList: action.payload};
    default:
      return state;
  }
  // return "abcccc"
};
