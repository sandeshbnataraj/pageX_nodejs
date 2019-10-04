import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";
import isEmpty from "lodash/isEmpty";

import Attachment from "../components/generic/Attachment";
import {
  getUserPublications,
  clearUserPublication,
  postedPublication
} from "../actions/userPublicationAction";

import {
  ERROR_OCCUR,
  POST_PUBLICATION,
  GET_USER_PUBLICATIONS,
  FETCHING_USER_PUBLICATIONS,
  FETCHED_USER_PUBLICATIONS,
  NO_MORE_USER_PUBLICATIONS,
  FETCHING_LIKED_USERS,
  FETCHING_PROMOTED_USERS,
  FETCHED_LIKED_USERS,
  FETCHED_PROMOTED_USERS,
  NO_MORE_PROMOTED_USERS,
  NO_MORE_LIKED_USERS,
  FETCH_PROMOTED_USERS,
  FETCH_LIKED_USERS,
  FETCHING_OTHER_USER_PUBLICATIONS,
  GET_OTHER_USER_PUBLICATIONS,
  NO_MORE_OTHER_USER_PUBLICATIONS,
  FETCHED_OTHER_USER_PUBLICATIONS,
  FETCHED_USER_PUBLICATIONS_ON_SCROLLING,
  FETCHED_OTHER_USER_PUBLICATIONS_ON_SCROLLING
} from "../actions/types";

// posting user publication saga
function* postPublication(action) {
  try {
    const {
      attachment,
      text,
      workType,
      accessType,
      publicationType,
      subject,
      update,
      works
    } = action.data;
    const isImage = attachment && Attachment.isImage(attachment);
    const isVideo = attachment && !isImage && Attachment.isVideo(attachment);
    const isDocument = attachment && !isImage && !isVideo;

    const params = {
      post: attachment,
      publication_img: isImage ? "1" : "0",
      publication_vid: isVideo ? "1" : "0",
      publication_doc: isDocument ? "1" : "0",
      publication_text: text,
      publication_suject: subject,
      publication_works: works,
      publication_update: update,
      work_type: workType ? workType.id : null,
      access: accessType ? accessType.id : 1,
      publication_type: publicationType === "work" ? 2 : 1
    };

    let post = params;
    if (params.post) {
      // if there's an attachment - send form-data request
      post = new FormData();
      Object.keys(params).forEach(param => post.append(param, params[param]));
    }

    yield axios.post("/api/publish", post);
    yield put(postedPublication());
    yield put(clearUserPublication());
    yield put(getUserPublications());
  } catch (error) {
    yield put({
      type: ERROR_OCCUR,
      payload: { message: "Something went wrong. Please try again later" }
    });
  }
}

function* getUserPublicationsWorker(action) {
  try {
    yield put({ type: FETCHING_USER_PUBLICATIONS });
    const pubResponse = yield axios.get("/api/userspublications", {
      params: action.query
    });

    //for testing

    //const pubResponse = { data: [{ "id": 18, "publication_text": "", "publication_img": "1", "publication_vid": "0", "post": "/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBMdz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--c50463110b22a316591b090d428ed663f303802b/FakeDP.jpeg", "user_id": 1, "created_at": "2019-09-20T18:43:01.764Z", "updated_at": "2019-09-20T18:43:39.817Z", "first_name": "Evin", "last_name": "Luiz", "avatar": "/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBOQT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--75cb1a617ba6d59b9c9bf5499246eb6f84cc6b01/FakeDP.jpeg", "likes": 1, "promote": 0, "access": "1", "publication_type": "1", "work_type": "null", "liked": 1, "promoted": 0, "currentuser": 1 }, { "id": 18, "publication_text": "", "publication_img": "1", "publication_vid": "0", "post": "/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBMdz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--c50463110b22a316591b090d428ed663f303802b/FakeDP.jpeg", "user_id": 1, "created_at": "2019-09-20T18:43:01.764Z", "updated_at": "2019-09-20T18:43:39.817Z", "first_name": "Evin", "last_name": "Luiz", "avatar": "/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBOQT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--75cb1a617ba6d59b9c9bf5499246eb6f84cc6b01/FakeDP.jpeg", "likes": 1, "promote": 0, "access": "1", "publication_type": "1", "work_type": "null", "liked": 1, "promoted": 0, "currentuser": 1 }, { "id": 18, "publication_text": "", "publication_img": "1", "publication_vid": "0", "post": "/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBMdz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--c50463110b22a316591b090d428ed663f303802b/FakeDP.jpeg", "user_id": 1, "created_at": "2019-09-20T18:43:01.764Z", "updated_at": "2019-09-20T18:43:39.817Z", "first_name": "Evin", "last_name": "Luiz", "avatar": "/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBOQT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--75cb1a617ba6d59b9c9bf5499246eb6f84cc6b01/FakeDP.jpeg", "likes": 1, "promote": 0, "access": "1", "publication_type": "1", "work_type": "null", "liked": 1, "promoted": 0, "currentuser": 1 }, { "id": 18, "publication_text": "", "publication_img": "1", "publication_vid": "0", "post": "/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBMdz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--c50463110b22a316591b090d428ed663f303802b/FakeDP.jpeg", "user_id": 1, "created_at": "2019-09-20T18:43:01.764Z", "updated_at": "2019-09-20T18:43:39.817Z", "first_name": "Evin", "last_name": "Luiz", "avatar": "/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBOQT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--75cb1a617ba6d59b9c9bf5499246eb6f84cc6b01/FakeDP.jpeg", "likes": 1, "promote": 0, "access": "1", "publication_type": "1", "work_type": "null", "liked": 1, "promoted": 0, "currentuser": 1 }, { "id": 18, "publication_text": "", "publication_img": "1", "publication_vid": "0", "post": "/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBMdz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--c50463110b22a316591b090d428ed663f303802b/FakeDP.jpeg", "user_id": 1, "created_at": "2019-09-20T18:43:01.764Z", "updated_at": "2019-09-20T18:43:39.817Z", "first_name": "Evin", "last_name": "Luiz", "avatar": "/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBOQT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--75cb1a617ba6d59b9c9bf5499246eb6f84cc6b01/FakeDP.jpeg", "likes": 1, "promote": 0, "access": "1", "publication_type": "1", "work_type": "null", "liked": 1, "promoted": 0, "currentuser": 1 }, { "id": 18, "publication_text": "", "publication_img": "1", "publication_vid": "0", "post": "/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBMdz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--c50463110b22a316591b090d428ed663f303802b/FakeDP.jpeg", "user_id": 1, "created_at": "2019-09-20T18:43:01.764Z", "updated_at": "2019-09-20T18:43:39.817Z", "first_name": "Evin", "last_name": "Luiz", "avatar": "/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBOQT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--75cb1a617ba6d59b9c9bf5499246eb6f84cc6b01/FakeDP.jpeg", "likes": 1, "promote": 0, "access": "1", "publication_type": "1", "work_type": "null", "liked": 1, "promoted": 0, "currentuser": 1 }, { "id": 18, "publication_text": "", "publication_img": "1", "publication_vid": "0", "post": "/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBMdz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--c50463110b22a316591b090d428ed663f303802b/FakeDP.jpeg", "user_id": 1, "created_at": "2019-09-20T18:43:01.764Z", "updated_at": "2019-09-20T18:43:39.817Z", "first_name": "Evin", "last_name": "Luiz", "avatar": "/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBOQT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--75cb1a617ba6d59b9c9bf5499246eb6f84cc6b01/FakeDP.jpeg", "likes": 1, "promote": 0, "access": "1", "publication_type": "1", "work_type": "null", "liked": 1, "promoted": 0, "currentuser": 1 }, { "id": 18, "publication_text": "", "publication_img": "1", "publication_vid": "0", "post": "/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBMdz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--c50463110b22a316591b090d428ed663f303802b/FakeDP.jpeg", "user_id": 1, "created_at": "2019-09-20T18:43:01.764Z", "updated_at": "2019-09-20T18:43:39.817Z", "first_name": "Evin", "last_name": "Luiz", "avatar": "/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBOQT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--75cb1a617ba6d59b9c9bf5499246eb6f84cc6b01/FakeDP.jpeg", "likes": 1, "promote": 0, "access": "1", "publication_type": "1", "work_type": "null", "liked": 1, "promoted": 0, "currentuser": 1 }, { "id": 18, "publication_text": "", "publication_img": "1", "publication_vid": "0", "post": "/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBMdz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--c50463110b22a316591b090d428ed663f303802b/FakeDP.jpeg", "user_id": 1, "created_at": "2019-09-20T18:43:01.764Z", "updated_at": "2019-09-20T18:43:39.817Z", "first_name": "Evin", "last_name": "Luiz", "avatar": "/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBOQT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--75cb1a617ba6d59b9c9bf5499246eb6f84cc6b01/FakeDP.jpeg", "likes": 1, "promote": 0, "access": "1", "publication_type": "1", "work_type": "null", "liked": 1, "promoted": 0, "currentuser": 1 }, { "id": 18, "publication_text": "", "publication_img": "1", "publication_vid": "0", "post": "/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBMdz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--c50463110b22a316591b090d428ed663f303802b/FakeDP.jpeg", "user_id": 1, "created_at": "2019-09-20T18:43:01.764Z", "updated_at": "2019-09-20T18:43:39.817Z", "first_name": "Evin", "last_name": "Luiz", "avatar": "/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBOQT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--75cb1a617ba6d59b9c9bf5499246eb6f84cc6b01/FakeDP.jpeg", "likes": 1, "promote": 0, "access": "1", "publication_type": "1", "work_type": "null", "liked": 1, "promoted": 0, "currentuser": 1 }] };

    if (!isEmpty(pubResponse.data)) {
      if (action.query && action.query.page > 1) {
        yield put({
          type: FETCHED_USER_PUBLICATIONS_ON_SCROLLING,
          payload: pubResponse
        });
      } else {
        yield put({ type: FETCHED_USER_PUBLICATIONS, payload: pubResponse });
      }
    } else {
      yield put({ type: NO_MORE_USER_PUBLICATIONS });
    }
  } catch (error) {
    yield put({
      type: ERROR_OCCUR,
      payload: { message: "Something went wrong. Please try again later" }
    });
  }
}

function* getLikedUsers(action) {
  try {
    yield put({ type: FETCHING_LIKED_USERS });
    const pubResponse = yield axios.get("/api/likedby/" + action.id, {
      params: action.query
    });

    if (pubResponse && pubResponse.data) {
      yield put({ type: FETCHED_LIKED_USERS, payload: pubResponse });
    } else {
      yield put({ type: NO_MORE_LIKED_USERS });
    }
  } catch (error) {
    yield put({
      type: ERROR_OCCUR,
      payload: { message: "Something went wrong. Please try again later" }
    });
  }
}
function* getPromotedUsers(action) {
  try {
    yield put({ type: FETCHING_PROMOTED_USERS });
    const pubResponse = yield axios.get("/api/promotedby/" + action.id, {
      params: action.query
    });

    if (pubResponse && pubResponse.data) {
      yield put({ type: FETCHED_PROMOTED_USERS, payload: pubResponse });
    } else {
      yield put({ type: NO_MORE_PROMOTED_USERS });
    }
  } catch (error) {
    yield put({
      type: ERROR_OCCUR,
      payload: { message: "Something went wrong. Please try again later" }
    });
  }
}

function* getOtherUserPublicationsWorker(action) {
  try {
    yield put({ type: FETCHING_OTHER_USER_PUBLICATIONS });
    const pubResponse = yield axios.get(
      "/api/otheruserpublications/" + action.id + "/",
      {
        params: action.query
      }
    );

    if (!isEmpty(pubResponse.data)) {
      if (action.query && action.query.page > 1) {
        yield put({
          type: FETCHED_OTHER_USER_PUBLICATIONS_ON_SCROLLING,
          payload: pubResponse
        });
      } else {
        yield put({
          type: FETCHED_OTHER_USER_PUBLICATIONS,
          payload: pubResponse
        });
      }
    } else {
      yield put({ type: NO_MORE_OTHER_USER_PUBLICATIONS });
    }
  } catch (error) {
    yield put({
      type: ERROR_OCCUR,
      payload: { message: "Something went wrong. Please try again later" }
    });
  }
}

export function* PublishPostWatcher() {
  yield takeLatest(POST_PUBLICATION, postPublication);
}

export function* UserPublicationWatcher() {
  yield takeLatest(GET_USER_PUBLICATIONS, getUserPublicationsWorker);
}

export function* getLikedUserWatcher() {
  yield takeLatest(FETCH_LIKED_USERS, getLikedUsers);
}
export function* getPromotedUserWatcher() {
  yield takeLatest(FETCH_PROMOTED_USERS, getPromotedUsers);
}
export function* otherUserPublicationWatcher() {
  yield takeLatest(GET_OTHER_USER_PUBLICATIONS, getOtherUserPublicationsWorker);
}
