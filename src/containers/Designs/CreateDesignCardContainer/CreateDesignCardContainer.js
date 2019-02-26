import React, { Component } from "react";
import { connect } from "react-redux";
import { CreateDesignCardRequest } from "actions/Designs/DesignCard";
import { GetDesignBoardRequest } from "actions/Designs/DesignBoard";
import CreateCard from "components/Designs/CreateCard";
import {UpdateDesignTime} from "actions/Designs/UpdateDesign";
import { GetDesignDetailRequest} from "actions/Design";

class CreateDesignCardContainer extends Component {
  render() {
    return(
      <CreateCard {...this.props}/>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.Authentication.status.token
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    CreateDesignCardRequest: (data, design_id, board_id, token) => {
      return dispatch(CreateDesignCardRequest(data, design_id, board_id, token));
    },
    GetDesignBoardRequest: (id) => {
      return dispatch(GetDesignBoardRequest(id));
    },
    GetDesignDetailRequest: (id, token) => {
      return dispatch(GetDesignDetailRequest(id, token));
    },
    UpdateDesignTime: (id) => {
      return dispatch(UpdateDesignTime(id));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateDesignCardContainer);
