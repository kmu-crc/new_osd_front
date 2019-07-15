import * as types from "actions/ActionTypes";
import host from "config";

// 탑 디자인 가져오기
export function GetTopDesignListRequest(page) {
  return (dispatch) => {
    return fetch(`${host}/design/TopList/${page}`, {
      headers: { "Content-Type": "application/json" },
      method: "get"
    }).then((response) => {
        return response.json();
      }).then((data) => {
        console.log("design data >>", data);
        if (!data) {
          console.log("no data");
          data = [];
        }
        if (page === 0) {
          dispatch(GetTopDesignListClear(data));
          return;
        }
        dispatch(GetTopDesignListSuccess(data));
      }).catch((error) => {
        dispatch(GetTopDesignListFailure());
        console.log("err", error);
      })
  }
};

export function GetTopDesignListSuccess(data) {
  return {
    type: types.GET_TOP_DESIGN_LIST_SUCCESS,
    TopList : data
  };
};

export function GetTopDesignListFailure() {
  return {
    type: types.GET_TOP_DESIGN_LIST_FAILURE,
    TopList : [],
    TopListAdded : []
  };
};

export function GetTopDesignListClear(data) {
  return {
    type: types.GET_TOP_DESIGN_LIST_CLEAR,
    TopList: data,
    TopListAdded: []
  }
}

// 탑 디자이너 가져오기
export function GetTopDesignerListRequest() {
  return (dispatch) => {
    return fetch(`${host}/designer/TopList`, {
      headers: { "Content-Type": "application/json" },
      method: "get"
    }).then((response) => {
        return response.json();
      }).then((data) => {
        console.log("designer data >>", data);
        if (!data) {
          console.log("no data");
          data = [];
        }
        dispatch(GetTopDesignerListSuccess(data));
      }).catch((error) => {
        dispatch(GetTopDesignerListFailure());
        console.log("err", error);
      })
  }
};

export function GetTopDesignerListSuccess(data) {
  return {
    type: types.GET_TOP_DESIGNER_LIST_SUCCESS,
    TopDesignerList : data
  };
};

export function GetTopDesignerListFailure() {
  return {
    type: types.GET_TOP_DESIGNER_LIST_FAILURE,
    TopDesignerList : []
  };
};

export function GetTopGroupListRequest(page) {
  return (dispatch) => {
    return fetch(`${host}/group/topGroupList/1/like`, {
      headers: { "Content-Type": "application/json" },
      method: "get"
    }).then((response) => {
        return response.json();
      }).then((data) => {
        console.log("group data >>", data);
        if (!data) {
          console.log("no data");
          data = [];
        }
        if (page === 0) {
          dispatch(GetTopGroupListClear(data));
          return;
        }
        dispatch(GetTopGroupListSuccess(data));
      }).catch((error) => {
        dispatch(GetTopGroupListFailure());
        console.log("err", error);
      })
  }
};

export function GetTopGroupListSuccess(data) {
  return {
    type: types.GET_TOP_GROUP_LIST_SUCCESS,
    TopList : data
  };
};

export function GetTopGroupListFailure() {
  return {
    type: types.GET_TOP_GROUP_LIST_FAILURE,
    TopList : [],
    TopListAdded : []
  };
};

export function GetTopGroupListClear(data) {
  return {
    type: types.GET_TOP_GROUP_LIST_CLEAR,
    TopList: data,
    TopListAdded: []
  }
}
