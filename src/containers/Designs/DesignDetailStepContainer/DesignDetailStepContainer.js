import React, { Component } from "react"
import { connect } from "react-redux"
import GridEditor from "components/Designs/GridEditor"
import {
  CreateDesignBoardRequest, DeleteDesignBoardRequest,
  GetDesignDetailRequest, GetDesignCardRequest, GetDesignBoardRequest,
  UpdateCardTitleRequest, UpdateDesignBoardRequest, UpdateDesignTime
} from "redux/modules/design";

class DesignDetailStepContainer extends Component {
  componentDidMount() {
    this.props.GetDesignBoardRequest(this.props.design.uid);
  }
  render() {
    console.log("view:", this.props)
    return (<GridEditor {...this.props} />)
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.Authentication.status.token,
    userInfo: state.Authentication.status.userInfo,
    DesignDetailStep: state.DesignCard.status.DesignDetailStep,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    CreateDesignBoardRequest: (data, design_id, token) => {
      return dispatch(CreateDesignBoardRequest(data, design_id, token));
    },
    GetDesignDetailRequest: (id, token) => {
      return dispatch(GetDesignDetailRequest(id, token));
    },
    GetDesignBoardRequest: (id) => {
      return dispatch(GetDesignBoardRequest(id));
    },
    UpdateDesignTime: (design_id, token) => {
      return dispatch(UpdateDesignTime(design_id, token));
    },
    UpdateCardTitleRequest: (data, token, id) => {
      return dispatch(UpdateCardTitleRequest(data, token, id));
    },
    GetDesignCardRequest: (id, board_id) => {
      return dispatch(GetDesignCardRequest(id, board_id));
    },
    UpdateDesignBoardRequest: (id, token, data) => {
      return dispatch(UpdateDesignBoardRequest(id, token, data));
    },
    DeleteDesignBoardRequest: (id, board_id, token) => {
      return dispatch(DeleteDesignBoardRequest(id, board_id, token))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DesignDetailStepContainer)
