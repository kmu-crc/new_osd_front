import React, { Component } from 'react';
import styled from 'styled-components';
import Star from "components/Commons/Star";
import NumberFormat from "modules/NumberFormat";
import PointFormat from "modules/PointFormat";
import { Rating } from 'semantic-ui-react'

import TextFormat from 'modules/TextFormat';
import noimg from "source/noimg.png";
import customimg from "source/toolbox.png";
import { alert } from "components/Commons/Alert/Alert";
import { confirm } from "components/Commons/Confirm/Confirm";
import market_style from "market_style";


const Wrapper = styled.div`
  *{
    cursor:pointer;
  }
  width: 296px;
  height: 342px;
  padding: 20px 10px;
  position: relative;
  border: 0.5px solid #EAEAEA;
  border-radius: 20px;
  box-shadow: 3px 3px 5px #4141411A;
  background: transparent;
  font-family: Noto Sans KR;
  cursor: pointer;
`;
const ItemPic = styled.div`
  min-width: 100%;
  min-height: 236px;
  max-width: 100%;
  max-height: 236px;
  font-size:30px;
  font-weight:500;
  color:white;
  background-color:#EFEFEF;
  display:flex;
  justify-content:center;
  align-items:center;
  background-image: url(${props => props.img});
  background-size: cover;
  background-position: center center
`;
const TextWrapper = styled.div`
  margin-top:10px;
  width: 100%;
  display:flex;
  justify-content:space-between;
  align-items:center;
  .title_ {
    width:110px;
    height:22px;
    color:#000000;
    font-weight: 600;
    font-size:${market_style.font.size.small1};
    text-align: left;
  }
  .author {
    width:60px;
    height:20px;
    display: flex;
    justify-content:flex-end;
    color:#707070;
    font-weight: 400;
    font-size:${market_style.font.size.small1};
    line-height: 18px;
  }
`;
const NumberWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items:center;
  margin-top:10px;
  .price {
    font-weight: 400;
    font-size:${market_style.font.size.small1};
    text-align: left;
    color:black;
  }
  .score {
    margin-left: auto;
    display: flex;
    flex-direction: row;
    vertical-align: middle;
    font-weight: 300;
    font-size:${market_style.font.size.tiny3};
    text-align: left;
  }
  .avg{
    font-weight: 300;
    font-size:${market_style.font.size.tiny3};
    text-align: left;
  }
`;
const PrivateLabel = styled.div`
  position: absolute;
  right: 10px;
  bottom: 60px;
  width: max-content;
  padding: 5px 10px;
  background-color: gray;
  color: white;
  border-radius: 15px;
`;
const TypeText = styled.div`
font-size:${market_style.font.size.tiny1};
font-weight:100;
  color:red;
`
const empty = { thumbnail: '', title: '로딩중...', userName: "로딩중...", price: 999, unit: 'won', score: 4.0, reviews: 999 };
class Item_mini extends Component {
  Keeper = () => {
    const item = this.props.data;
    if (item.uid) {
      const yours = item.members && item.members.filter(mem => mem.user_id === this.props.userInfo && this.props.userInfo.uid);
      if (item.private && !yours) {
        // alert("비공개!");
        return;
      } else {
        window.location.href = `/productDetail/${item.uid}`;
      }
    }
    // () => item.uid ? item.private ? alert("비공개!") : null : alert("이 아이템의 상세내용을 가져올 수 없습니다.")
  }
  render() {
    const item = this.props.data || empty;
    const date = new Date(item.create_time).getFullYear() + '/' + (parseInt(new Date(item.create_time).getMonth(),10)+1) + '/' + new Date(item.create_time).getDate();
    const img = item ? item.thumbnail : noimg;
    console.log(this.props);
    const RenderingStar = ()=>{
      return( 
      <div style={{display:"flex", alignItems:"center"}}>
      <Rating name="score" size='mini' icon='star' defaultRating={parseInt(item.score,10)||0} maxRating={5} disabled />
      <div className="avg">({item.avg})</div>
      </div>)
    }
    return (
      // const ItemContent = () =>
      <Wrapper onClick={this.Keeper}>
        {/* picture */}
        <ItemPic img={img} />
        {/* text */}
        <TextWrapper>
          <div className="title_"><TextFormat txt={item.title} /></div>
          <div className="author">
            <TextFormat txt={item.userName} />
          </div>
        </TextWrapper>
        <NumberWrapper>
          <div className="price">{PointFormat(item.price / (parseInt(item.price)>9999?10000:1000) || 0)}{parseInt(item.price)>9999?"만 point":" point"}</div>
          <div className="score">
            <RenderingStar/>
          </div>
        </NumberWrapper>
        {item.custom && item.isPurchased === 0 ?
          <PrivateLabel onClick={() => this.props.confirm(item.payment_id)}>
            <div>구매확인</div>
          </PrivateLabel> : null}
      </Wrapper>
    )
  }
}

export default Item_mini;
