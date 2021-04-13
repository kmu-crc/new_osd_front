import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetMyProjectItemRequest } from "actions/Item";
import Item_myDetail from "components/Items/Item_myDetail";
import PagingList from "components/Commons/PagingList";
import ScrollList from "components/Commons/ScrollList";
import styled from "styled-components";
import { Pagination } from 'semantic-ui-react'

const Board = styled.div`
  margin:-20px -50px -20px -50px;
  display:flex;
  flex-direction:column;
  .title_{
    font-family:Noto Sans KR;
    font-size:18px;
    color:black;
    width:100%;
    display:flex;
    justify-content:center;
    align-items:center;
  }
  .lineBox{
    width:100%;
    padding:6px 38px 10px 38px;
    .line{
      width:100%;
      border:1px solid #efefef;
    }
  }
  .pagenation{
    display:flex;
    justify-content:center;
  }
`
class MyProjectItemContainer extends Component {
  constructor(props)
  {
    super(props);
    this.state = {
      page:0,
    }
    this.goPage = this.goPage.bind(this);
  }
  componentWillMount() {
    this.props.GetMyProjectItemRequest(this.props.id, this.props.token, 0);
  }
  goPage = async (page) => {
    await this.setState({ page:page });
    this.props.GetMyProjectItemRequest(this.props.id, this.props.token, page);
  };
  getList = (page) =>
    this.props.GetMyProjectItemRequest(this.props.id, this.props.token, page);


  render() {
    console.log("test-----",this.props);
    const { page } = this.state;
    const lastPage = parseInt(this.props.allPage / 8, 10);
    return (
      <Board>
      <div className="title_">참여 프로젝트</div>
      <div className="lineBox"><div className="line"/></div>
      <PagingList getListRequest={this.getList}
                    type="sales_Expert"
                    ListComponent={Item_myDetail}
                    dataList={this.props.dataList} 
                    dataListAdded={this.props.dataListAdded}
                    mobile={16} tablet={8} computer={8} largeScreen={5} widescreen={2} customClass="largeCustom"/>
        {
        lastPage==0?null:
        <div className="pagenation">
        <Pagination
          activePage={page + 1}
          boundaryRange={0}
          defaultActivePage={1}
          ellipsisItem={null}
          firstItem={null}
          lastItem={null}
          siblingRange={1}
          totalPages={lastPage + 1}
          // pointing
          secondary
          onPageChange={(event, { activePage }) => {
            this.goPage(activePage - 1);
          }}
        />
        </div>
        }
      </Board>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.Authentication.status.token,
  dataList: state.MyProjectItem.status.MyProjectItem,
  dataListAdded: state.MyProjectItem.status.MyProjectItemAdded,
});
const mapDispatchToProps = (dispatch) => ({
  GetMyProjectItemRequest: (id, token, page) => dispatch(GetMyProjectItemRequest(id, token, page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyProjectItemContainer);