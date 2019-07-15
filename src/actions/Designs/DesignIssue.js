import * as types from "actions/ActionTypes";
import host from "config";

export const CreateDesignIssueRequest = (data, design_id, token) => {
  return (dispatch) => {
    dispatch(CreateIssue());
    console.log("request", data);
    return fetch(`${host}/design/designDetail/${design_id}/createIssue`, { 
      headers: {
        "x-access-token": token, 
        "Content-Type": "application/json" 
      }, 
      method: "POST", 
      body: JSON.stringify(data) 
    }).then(function (res) {
        return res.json();
    }).then(function (res) {
      return dispatch(CreateIssueSuccess(res));
    }).catch((error) => {
      console.log("insert issue err", error);
      return dispatch(CreateIssueFailure(error));
    });
  };
};

export const CreateIssue = () => {
  return {
    type: types.CREATE_ISSUE
  };
};

export const CreateIssueSuccess = (res) => {
  return {
    type: types.CREATE_ISSUE_SUCCESS,
    success: res.success
  };
};

export const CreateIssueFailure = (error) => {
  return {
    type: types.CREATE_ISSUE_FAILURE,
    success: error.success,
  };
};

export const UpdateDesignIssueRequest = (data, design_id, issue_id, token) => {
  return (dispatch) => {
    dispatch(UpdateIssue());
    console.log("request", data);
    return fetch(`${host}/design/designDetail/${design_id}/updateIssue/${issue_id}`, { 
      headers: {
        "x-access-token": token, 
        "Content-Type": "application/json" 
      }, 
      method: "POST", 
      body: JSON.stringify(data) 
    }).then(function (res) {
        return res.json();
    }).then(function (res) {
      return dispatch(UpdateIssueSuccess(res));
    }).catch((error) => {
      console.log("update issue err", error);
      return dispatch(UpdateIssueFailure(error));
    });
  };
};

export const UpdateIssue = () => {
  return {
    type: types.UPDATE_ISSUE
  };
};

export const UpdateIssueSuccess = (res) => {
  return {
    type: types.UPDATE_ISSUE_SUCCESS,
    success: res.success
  };
};

export const UpdateIssueFailure = (error) => {
  return {
    type: types.UPDATE_ISSUE_FAILURE,
    success: error.success
  };
};

export const UpdateIssueStatusRequest = (data, design_id, issue_id, token) => {
  return (dispatch) => {
    dispatch(UpdateIssueStatus());
    console.log("request", data);
    return fetch(`${host}/design/designDetail/${design_id}/updateIssueStatus/${issue_id}`, { 
      headers: {
        "x-access-token": token, 
        "Content-Type": "application/json" 
      }, 
      method: "POST", 
      body: JSON.stringify(data) 
    }).then(function (res) {
        return res.json();
    }).then(function (res) {
      return dispatch(UpdateIssueStausSuccess(res));
    }).catch((error) => {
      console.log("update issue err", error);
      return dispatch(UpdateIssueStatusFailure(error));
    });
  };
};

export const UpdateIssueStatus = () => {
  return {
    type: types.UPDATE_ISSUE_STATUS
  };
};

export const UpdateIssueStausSuccess = (res) => {
  return {
    type: types.UPDATE_ISSUE_STATUS_SUCCESS,
    success: res.success
  };
};

export const UpdateIssueStatusFailure = (error) => {
  return {
    type: types.UPDATE_ISSUE_STATUS_FAILURE,
    success: error.success
  };
};

export const DeleteDesignIssueRequest = (design_id, issue_id, token) => {
  return (dispatch) => {
    dispatch(DeleteIssue());
    return fetch(`${host}/design/designDetail/${design_id}/deleteIssue/${issue_id}`, { 
      headers: {
        "x-access-token": token, 
        "Content-Type": "application/json" 
      }, 
      method: "DELETE"
    }).then(function (res) {
        return res.json();
    }).then(function (res) {
      return dispatch(DeleteIssueSuccess(res));
    }).catch((error) => {
      console.log("delete issue err", error);
      return dispatch(DeleteIssueFailure(error));
    });
  };
};

export const DeleteIssue = () => {
  return {
    type: types.DELETE_ISSUE
  };
};

export const DeleteIssueSuccess = (res) => {
  return {
    type: types.DELETE_ISSUE_SUCCESS,
    success: res.success
  };
};

export const DeleteIssueFailure = (error) => {
  return {
    type: types.DELETE_ISSUE_FAILURE,
    success: error.success,
  };
};

// 디자인 이슈 댓글 생성
export const CreateIssueCommentRequest = (data, design_id, issue_id, token) => {
  return (dispatch) => {
    dispatch(CreateIssueComment());
    console.log("request", data);
    return fetch(`${host}/design/designDetail/${design_id}/issue/${issue_id}/createComment`, { 
      headers: {
        "x-access-token": token, 
        "Content-Type": "application/json" 
      }, 
      method: "POST", 
      body: JSON.stringify(data)
    }).then(function (res) {
        return res.json();
    }).then(function (res) {
      return dispatch(CreateIssueCommentSuccess(res));
    }).catch((error) => {
      console.log("insert issue err", error);
      return dispatch(CreateIssueCommentFailure(error));
    });
  };
};

export const CreateIssueComment = () => {
  return {
    type: types.CREATE_ISSUE_COMMENT
  };
};

export const CreateIssueCommentSuccess = (res) => {
  return {
    type: types.CREATE_ISSUE_COMMENT_SUCCESS,
    success: res.success
  };
};

export const CreateIssueCommentFailure = (error) => {
  return {
    type: types.CREATE_ISSUE_COMMENT_FAILURE,
    success: error.success
  };
};

// 디자인 이슈 댓글 삭제
export const DeleteIssueCommentRequest = (design_id, issue_id, comment_id, token) => {
  return (dispatch) => {
    dispatch(DeleteIssueComment());
    return fetch(`${host}/design/designDetail/${design_id}/issue/${issue_id}/deleteComment/${comment_id}`, { 
      headers: {
        "x-access-token": token, 
        "Content-Type": "application/json" 
      }, 
      method: "DELETE"
    }).then(function (res) {
        return res.json();
    }).then(function (res) {
      return dispatch(DeleteIssueCommentSuccess(res));
    }).catch((error) => {
      console.log("insert issue err", error);
      return dispatch(DeleteIssueCommentFailure(error));
    });
  };
};

export const DeleteIssueComment = () => {
  return {
    type: types.DELETE_ISSUE_COMMENT
  };
};

export const DeleteIssueCommentSuccess = (res) => {
  return {
    type: types.DELETE_ISSUE_COMMENT_SUCCESS,
    success: res.success
  };
};

export const DeleteIssueCommentFailure = (error) => {
  return {
    type: types.DELETE_ISSUE_COMMENT_FAILURE,
    success: error.success
  };
};