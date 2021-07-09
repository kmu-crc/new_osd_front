import React, { Component } from 'react';
import styled from 'styled-components';
import TextFormat from 'modules/TextFormat';
import noimg from "source/noimg.png";
import ModifyGroupInfoContainer from "containers/Groups/ModifyGroupInfoContainer/ModifyGroupInfoContainer"
import market_style from "market_style";


const Wrapper = styled.div`
  *{
    cursor:pointer;
  }
  position: relative;
  box-shadow: 3px 3px 5px #4141411A;
  border:1px solid #eaeaea;
  width: 172px;
  height: 190px;
  background: transparent;
  border-radius:10px;
  overflow:hidden;
  font-family: Noto Sans KR;
  cursor: pointer;
  padding:13px;
`;
const ItemPic = styled.div`
  width: 152px;
  height: 140px;
  background: transparent;
  background-image: url(${props => props.img});
  background-size: cover;
  background-position: center center
`;
const TextWrapper = styled.div`
  margin-top: 3px;
  width: 100%;
  display:flex;
  justify-content:center;
  align-items:center;
  .title {
    height:25px;
    font-weight: 500;
    font-size:${market_style.font.size.mini2};
    text-align: left;
  }
  .author {
    margin-top: 8px;
    font-weight: 300;
    font-size:${market_style.font.size.mini2};
    text-align: left;
    line-height: 18px;
  }
`;
const empty = { thumbnail: '', group_id: null, user_id: null, nick_name: "", title: '로딩중...', description: '로딩중...' };
class ModifyGallery_mobile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    }
    this.onClickCard = this.onClickCard.bind(this);
    this.handleShowModal = this.handleShowModal.bind(this);
  }
  onClickCard(event) {
    console.log(this.state.open);
    this.setState({ open: true })
  }
  handleShowModal(value) {
    this.setState({ open: false })
  }

  render() {
    // console.log(this.props.handler);
    const item = this.props.data || empty;
    return (
      <React.Fragment>
        {this.state.open ? <ModifyGroupInfoContainer handlerIsGalleryModify={this.props.handler} handleShowModal={this.handleShowModal} id={this.props.data.uid} open={this.state.open} /> : null}
        <Wrapper onClick={this.onClickCard}>
          <ItemPic img={(item && item.thumbnail) || noimg} />
          <TextWrapper>
            <div className="title"><TextFormat txt={item.title || "...로딩중"} /></div>
          </TextWrapper>
        </Wrapper>
      </React.Fragment>
    )
  }
}

export default ModifyGallery_mobile;
