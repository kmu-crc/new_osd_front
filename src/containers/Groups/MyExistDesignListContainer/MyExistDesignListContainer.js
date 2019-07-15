import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DeleteDesignInGroupRequest, GetMyExistDesignListRequest, GetDesignInGroupRequest, GetGroupCountRequest } from "actions/Group";
import MyExistDesign from "components/Groups/MyExistDesign";

class MyExistDesignListContainer extends Component {
  render(){
    return(
      <MyExistDesign {...this.props}/>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.Authentication.status.token,
    MyDesignList: state.MyExistList.status.MyExistDesignList
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    DeleteDesignInGroupRequest: (id, designid) => {
      return dispatch(DeleteDesignInGroupRequest(id, designid))
    },
    GetMyExistDesignListRequest: (token, id) => {
      return dispatch(GetMyExistDesignListRequest(token, id))
    },
    GetDesignInGroupRequest: (id, page, sort) => {
      return dispatch(GetDesignInGroupRequest(id, page, sort))
    },
    GetGroupCountRequest: (id) => {
      return dispatch(GetGroupCountRequest(id))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyExistDesignListContainer);
