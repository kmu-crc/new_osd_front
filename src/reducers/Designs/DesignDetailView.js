import * as types from "actions/ActionTypes";
import update from "react-addons-update";

const initialState = {
  DesignDetailView: {
    status: "INIT"
  },
  status: {
    DesignDetailView: [],
  }
};

export function DesignDetailView(state, action) {
  if (typeof state === "undefined")
    state = initialState;

  switch (action.type) {
    case types.GET_DESIGN_DETAIL_VIEW:
      return update(state, {
        status: {
          DesignDetailView: { $set: action.DesignDetailView }
        }
      });
    case types.DESIGN_DETAIL_VIEW_RESET:
      return update(state, {
        status: {
          DesignDetailView: { $set: action.DesignDetailView }
        }
      });
    default:
      return state;
  }
};
