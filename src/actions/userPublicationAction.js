import {
  POST_PUBLICATION,
  POSTED_PUBLICATION,
  GET_USER_PUBLICATIONS,
  CLEAR_USER_PUBLICATIONS,
  GET_OTHER_USER_PUBLICATIONS,
  CLEAR_OTHER_USER_PUBLICATIONS,
  FETCH_LIKED_USERS,
  FETCH_PROMOTED_USERS,
  CLEAR_LIKED_USERS,
  CLEAR_PROMOTED_USERS
} from "./types";
import axios from "axios";

// TODO: this is not a redux/flux action, this is just an api call which is not reflected to redux store/history
export function likePost(postId) {
  return axios.get("/api/userpublications/likes/" + postId + "/");
}
// TODO: this is not a redux/flux action, this is just an api call which is not reflected to redux store/history
export function promotePost(postId) {
  return axios.get("/api/userpublications/promotes/" + postId + "/");
}
export const postPublication = data => ({ type: POST_PUBLICATION, data });
export const postedPublication = () => ({ type: POSTED_PUBLICATION });
export const getUserPublications = query => ({
  type: GET_USER_PUBLICATIONS,
  query
});
export const clearUserPublication = () => ({ type: CLEAR_USER_PUBLICATIONS });

export const fetchLikedUsers = (id, query) => ({
  type: FETCH_LIKED_USERS,
  query,
  id
});
export const fetchPromotedUsers = (id, query) => ({
  type: FETCH_PROMOTED_USERS,
  query,
  id
});
export const clearLikedUsers = () => ({ type: CLEAR_LIKED_USERS });
export const clearPromotedUsers = () => ({ type: CLEAR_PROMOTED_USERS });

export const getOtherUserPublications = id => ({
  type: GET_OTHER_USER_PUBLICATIONS,
  id
});
export const clearOtherUserPublication = () => ({
  type: CLEAR_OTHER_USER_PUBLICATIONS
});

export function createCollection(data) {
  return axios.post("/api/createCollection/", data);
}
