import React, { Component } from 'react';
import styled from 'styled-components';
import DateFormat from "modules/DateFormat";
import { Pagination } from 'semantic-ui-react'
import { InputPriceNew } from "components/Commons/InputItem"
import { AddPoint } from "components/Commons/InputItem"
import { alert } from "components/Commons/Alert/Alert";
import { confirm } from "components/Commons/Confirm/Confirm";

import $ from "jquery";
import market_style from "market_style";

const Wrapper = styled.div`
*{
  // border:1px solid black;
}
  width: 100%;
  .tabBox{
    width:100%;
    display:flex;
    justify-content:center;
    font-size:${market_style.font.size.normal1};
    font-family:Noto Sans KR;
    .text_grey{min-width:max-content;color:#d6d6d6;cursor:pointer;}
    .text_black{min-width:max-content;color:black;cursor:pointer;}
    .text_light_grey{color:#efefef;}
    .margin_left{margin-left:0px;}
    .margin_right{margin-right:20px;}
  }
`;
const PointContainer = styled.div`
  margin:-20px 20px -20px 20px;
  width: 100%;
  margin-right: auto;
  margin-left: auto;
`;
const Title = styled.div`
  text-align: center;
  font-weight: 500;
  font-size: 36px;
  line-height: 36px;
  width: max-content;
  margin-top: 50px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 45px;
  &.smaller {
    font-size: 28px;
    margin-bottom: 25px;
  }
`;

const PaymentBox = styled.div`
  width:100%;
  .continue{
    cursor:pointer;
    width:100%;
    text-align:right;
    font-size:${market_style.font.size.normal3};
    font-family:Noto Sans CJK KR, Medium;
    color:red;
  }
  .hrLine{
    width:100%;
    border:1px solid #efefef;
    margin-top:16px;
    margin-bottom:10px;
  }
  .mypoint{
    width:100%;
    text-align:right;
    font-family:Noto Sans CJK KR, Regular;
    font-size:${market_style.font.size.small1};
    color:red;
    margin-bottom:38px;
  }
  .input_title{
    min-width:max-content;
    font-family:Noto Sans KR;
    font-size:${market_style.font.size.small1};
    font-weight:500;
    margin-right:30px;
    margin-bottom:10px;
  } 
  .input_flag{
    width:1px;
    height:20px;
    margin-right:30px;
    border-right:1px solid #707070;
    font-size:${market_style.font.size.normal3};
    margin-bottom:10px;
  }
  .margin_top{
    margin-top:107px;
  }
  .inputprice{
    width:100%;
    display:flex;
    flex-wrap:wrap;
    align-items:center;
    margin-bottom:50px;
  }
  .align_right{
    justify-content:flex-end;
    .button_red{
      width:150px;
      height:40px;
      display:flex;
      justify-content:center;
      align-items:center;
      color:white;
      font-size:${market_style.font.size.normal1};
      background-color:red;
      cursor:pointer;
    }
  }
  .addPrice{
    width:100%;
    display:flex;
    flex-wrap:wrap;
    margin-bottom:7px;
    .selectPayment{
      display:flex;
      flex-wrap:wrap;
    }
    .buttonIcon{
      cursor:pointer;
      width:130px;
      height:46px;
      display:flex;
      border-radius:20px;
      justify-content:center;
      align-items:center;
      background: #E9E9E9 0% 0% no-repeat padding-box;
    }
    .redbtn{
      
      background-color:red;
      color:white;
      font-size:${market_style.font.size.small1};
      margin-right:20px;
      margin-bottom:10px;
    }
    .defaultbtn{
      color:#707070;
      font-size:${market_style.font.size.small1};
      margin-right:20px;
      margin-bottom:10px;
    }
  }
`
const PointListBox = styled.div`
  width:100%;
  .hrLine{
    width:100%;
    border:1px solid #efefef;
    margin-top:16px;
    margin-bottom:10px;
  }
  .hrLineDeep{
    border: 1px solid #AFAFAF;
    opacity: 1;
  }
  .content_box{
    width:100%;
    height:max-content;
    // box-shadow: 5px 5px 10px #00000029;
    // border-radius: 20px;
    // padding:44px 55px 44px 55px;
    .titleBox{
      display:flex;
      align-items:center;
      justify-content:center;
      height:max-content;
      width:100%;
      margin-top:28px;
      margin-bottom:9px;
      ._title{
        width:100%;
        height:max-content;
        font-family:Noto Sans KR;
        color:black;
        font-size:${market_style.font.size.small1};
        text-align:center;
        font-weight:500;
      }
    }
    .history_box{
      width:100%;
      display:flex;
      align-items:center;
      height:38px;
      .history{
        width:100%;
        font-family:Noto Sans CJK KR, Regular;
        font-size:${market_style.font.size.small1};
        text-align:center;
      }
    }
    .hrLineBottom{
      width:100%;
      height:2px;
      background-color:#efefef;
    }
  }
  .pagenation{
    width:100%;
    display:flex;
    margin-top:46px;
    justify-content:center;
  }
`

const Won = N => N.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

class Point extends Component {
  constructor(props) {
    super(props);
    this.state = {
      price: 0,
      point: null,
      tab: 0,
      page: 0,
      flag: 5,
      paymentType: 0,
    }
    this.PointUp = this.PointUp.bind(this);
    this.callback = this.callback.bind(this);
    this.pointChange = this.pointChange.bind(this);
    this.PointToMoney = this.PointToMoney.bind(this);
    this.onChangePoint = this.onChangePoint.bind(this);
    this.onClickedPlusPointToMoney = this.onClickedPlusPointToMoney.bind(this);
    this.onClickedMinusPointToMoney = this.onClickedMinusPointToMoney.bind(this);
    this.getPriceValue = this.getPriceValue.bind(this);
    this.getLoadData = this.getLoadData.bind(this);
  }


getLoadData=async()=>{
  console.log(this.state.page);
  this.props.GetHistoryRequest(this.props.userInfo.uid,this.state.page, this.props.token);
}
goNext = async () => {
  await this.setState({ page: this.state.page + 1 });
  this.getLoadData();
};
goPrev = async () => {
  await this.setState({ page: this.state.page - 1 });
  this.getLoadData();
}
goPage = async (pagenum) => {
  await this.setState({ page:pagenum });
  this.getLoadData();
};
async getPriceValue(value) {
  await this.setState({ point: value });
}
pointChange(event){
    console.log(event.target.value);
    this.setState({point:event.target.value});
}
callback =(rsp,type)=>{
    if ( rsp.success ) {
      let msg = '결제가 완료되었습니다.';
      msg += '고유ID : ' + rsp.imp_uid;
      msg += '상점 거래ID : ' + rsp.merchant_uid;
      msg += '결제 금액 : ' + rsp.paid_amount;
      msg += '카드 승인번호 : ' + rsp.apply_num;
      this.props.PointUpRequest(
      { id: this.props.userInfo.uid, token: this.props.token },
      { point: 1000, type: type }
    ).then(async () => {
      this.props.GetMyPointRequest(this.props.userInfo.uid, this.props.token);
      this.props.GetHistoryRequest(this.props.userInfo.uid, 0, this.props.token);
      // await alert("현금 전환이 완료되었습니다.");
    })
  } else {
      var msg = '결제에 실패하였습니다.';
      msg += '에러내용 : ' + rsp.error_msg;
  }
  // alert(msg);
}
PointUp = async(type) => {
    const {IMP} = window;
    const pointMoney = this.state.point;
    await IMP.request_pay({
      pg : 'html5_inicis', // version 1.1.0부터 지원.
      pay_method : 'card',
      merchant_uid : 'merchant_' + new Date().getTime(),
      name : '주문명:결제테스트',
      amount : pointMoney,
      buyer_email : 'iana6528@gmail.com',
      buyer_name : '구매자이름',
      buyer_tel : '010-1234-5678',
      buyer_addr : '서울특별시 강남구 삼성동',
      buyer_postcode : '123-456',
      m_redirect_url : 'http://localhost:3000/mypage'
  }, (rsp)=>this.callback(rsp,type));
    // this.props.PointUpRequest(
    //   { id: this.props.userInfo.uid, token: this.props.token },
    //   { point: 1000, type: type }
    // ).then(async() => {
    //   this.props.GetMyPointRequest(this.props.userInfo.uid, this.props.token);
    //   this.props.GetHistoryRequest(this.props.userInfo.uid,0, this.props.token);
    //   // await alert("현금 전환이 완료되었습니다.");
    // })
  };
  async PointToMoney(type) {
    console.log(this.props.Point, this.state.point);
    if (this.props.Point < parseInt(this.state.point, 10) * 1000) {
      await alert("금액이 부족합니다.");
      return;
    }
    if (this.state.point === 0) {
      await alert("현금으로 전환하고자 하는 금액이 0원입니다. 전환하고자하는 금액을 지정해주세요.");
      return;
    }
    this.props.PointUpRequest(
      { id: this.props.userInfo.uid, token: this.props.token },
      { point: this.state.point *-1, type: type }
    ).then(() => {
      this.props.GetMyPointRequest(this.props.userInfo.uid, this.props.token);
      this.props.GetHistoryRequest(this.props.userInfo.uid, 0, this.props.token);
    }).then(() => {
      // alert("현금 전환이 완료되었습니다!");
      this.setState({ point: 0 });
    })
  }
  async onChangePoint(event) {
    await this.setState({
      point: event.target.value,
    });
  }
  async onClickedPlusPointToMoney() {
    const { Point } = this.props;
    Point >= 1000 * (this.state.point + 1) ? this.setState({ point: this.state.point + 1 }) : await alert("현금화하실 포인트가 없습니다.");
  }
  onClickedMinusPointToMoney() {
    this.state.point > 0 ? this.setState({ point: this.state.point - 1 }) : this.setState({ point: 0 })
  }
  render() {
    const { Point, History, HistoryCount } = this.props;
    const { page } = this.state;
    const lastPage = parseInt(HistoryCount / 12, 10);
    let pagecount=0;
    
    //---------------------------결제관련-----------------------------------
      const {IMP} = window;
      IMP.init(`imp21280997`);
      console.log(IMP);

    //--------------------------------------------------------------------
    
    return (<Wrapper>
      <PointContainer>
        {/* <div className="title"> 내 포인트 관리</div> */}
        <div className="tabBox">
          {this.state.tab == 0 ?
            <React.Fragment>
              <div onClick={() => this.setState({ tab: 0 })} className="text_black margin_left margin_right">포인트 충전</div>
              <div className="text_light_grey margin_right" />
              <div onClick={() => this.setState({ tab: 1 })} className="text_grey margin_right">현금 전환</div>
              <div className="text_light_grey margin_right" />
              <div onClick={() => this.setState({ tab: 2 })} className="text_grey">충전 내역</div>
            </React.Fragment>
            :
            this.state.tab == 1 ?
              <React.Fragment>
                <div onClick={() => this.setState({ tab: 0 })} className="text_grey margin_left margin_right">포인트 충전</div>
                <div className="text_light_grey margin_right" />
                <div onClick={() => this.setState({ tab: 1 })} className="text_black margin_right">현금 전환</div>
                <div className="text_light_grey margin_right" />
                <div onClick={() => this.setState({ tab: 2 })} className="text_grey">충전 내역</div>
              </React.Fragment>
              :
              <React.Fragment>
                <div onClick={() => this.setState({ tab: 0 })} className="text_grey margin_left margin_right">포인트 충전</div>
                <div className="text_light_grey margin_right" />
                <div onClick={() => this.setState({ tab: 1 })} className="text_grey margin_right">현금 전환</div>
                <div className="text_light_grey margin_right" />
                <div onClick={() => this.setState({ tab: 2 })} className="text_black">충전 내역</div>
              </React.Fragment>
          }
        </div>
        {
          this.state.tab == 0 ?
            <React.Fragment>
              <PaymentBox>
                <div className="hrLine" />
                <div className="mypoint">보유 포인트 : {Won(Point || 0)} p</div>

                <div className="inputprice">
                  <div className="input_title">충전 금액</div><div className="input_flag" />
                  <div><AddPoint name="price" getValue={this.getPriceValue} /></div>
                </div>

                <div className="addPrice">
                  <div className="input_title">충전 수단</div><div className="input_flag" />
                  <div className="selectPayment">
                    <div onClick={() => this.setState({ paymentType: 0 })} className={`buttonIcon ${this.state.paymentType == 0 ? "redbtn" : "defaultbtn"}`}>현금 결제</div>
                    <div onClick={() => this.setState({ paymentType: 1 })} className={`buttonIcon ${this.state.paymentType == 1 ? "redbtn" : "defaultbtn"}`}>신용카드 결제</div>
                    <div onClick={() => this.setState({ paymentType: 2 })} className={`buttonIcon ${this.state.paymentType == 2 ? "redbtn" : "defaultbtn"}`}>간편 결제</div>
                  </div>
                  <div></div>
                </div>
                <div className="addPrice align_right">
                  <div onClick={() => this.PointUp("CLICK")} className="button_red">결제하기</div>
                </div>
              </PaymentBox>
            </React.Fragment>
            :
            this.state.tab == 1 ?
              <React.Fragment>
                <PaymentBox>
                  <div className="hrLine" />
                  <div className="mypoint">보유 포인트 : {Won(Point || 0)} p</div>
                  <div className="inputprice">
                    <div className="input_title">전환 금액</div><div className="input_flag" />
                    <div><AddPoint name="price" getValue={this.getPriceValue} /></div>
                  </div>
                  <div className="addPrice align_right">
                    <div onClick={() => this.PointToMoney("CLICK")} className="button_red">전환하기</div>
                  </div>
                </PaymentBox>
              </React.Fragment>
              :
              <PointListBox>
                <div className="hrLine" />
                <div className="content_box">
                  <div className="titleBox">
                    <div className="_title">날짜</div>
                    <div className="_title">결제 금액</div>
                    <div className="_title">결제 수단</div>
                  </div>
                  <div className="hrLineDeep" />
                  {HistoryCount ? (
                    History.map(histo => {
                      pagecount++;
                      console.log(HistoryCount);
                      return (
                        // 5*page+1<=pagecount&&pagecount<=5*page+5?
                        <React.Fragment>
                          <div className="history_box" key={histo.uid + "history"}>
                            <div className="history">{
                              new Date(histo.create_time).getFullYear() + "."
                              + ((new Date(histo.create_time).getMonth() + 1) < 10 ? '0' + (new Date(histo.create_time).getMonth() + 1) : (new Date(histo.create_time).getMonth() + 1)) + "."
                              + (new Date(histo.create_time).getDate() < 10 ? '0' + new Date(histo.create_time).getDate() : new Date(histo.create_time).getDate())}</div>
                            <div className="history">{histo.point_variation}</div>
                            <div className="history">{histo.charge_type}</div>
                          </div>
                          <div className="hrLineBottom" />
                        </React.Fragment>
                      )
                    }
                    )) : (<div>포인트 충전 내역 없음</div>)}
                  {12 < HistoryCount ?
                    // <div onClick={this.goNext}>next</div> 
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
                    : null}

                </div>
              </PointListBox>
        }
      </PointContainer>
    </Wrapper>)
  }
}
export default Point;



// <PointWrapper>
// <div className="text">사용가능한 금액:</div>
// <div className="unit">₩</div>
// <div className="point">{Won(Point || 0)}</div>
// </PointWrapper>

// <Title className="smaller">충전수단</Title>
// <Charge>
// <div className="item"><button onClick={() => this.PointUp("CLICK")} className="charge">클릭으로 충전!</button></div>
// <div className="item"><button onClick={() => alert("찬호가 안하고 입해했데요...")} className="charge not-yet">ㅇㅇㅇ으로 충전</button></div>
// <div className="item"><button onClick={() => alert("찬호가 안하고 입해했데요...")} className="charge not-yet">ㅇㅇㅇ으로 충전</button></div>
// </Charge>
// {
// (this.props.userInfo.isDesigner === 1 || this.props.userInfo.isMaker === 1) ?
//   <React.Fragment>
//     <Title className="smaller">현금전환</Title>
//     <Charge>
//       <div className="item flex">
//         {/* <FormStyle value={this.state.point} onChange={this.onChangePoint} type="number" /> */}
//         <FormStyle type="number" value={this.state.point} />
//         <Button onClick={this.onClickedPlusPointToMoney}>
//           <div className="text">+</div>
//         </Button>
//         <Button onClick={this.onClickedMinusPointToMoney}>
//           <div className="text">-</div>
//         </Button>
//         <Button onClick={() => this.PointToMoney("CLICK")}>
//           <div className="text">클릭으로 전환</div>
//         </Button>

//       </div>
//     </Charge>
//   </React.Fragment> : null
// }
// <Title className="smaller">충전내역</Title>
// <HistoryContainer>
// <div className="history-element">
//   <div>변동내역</div>
//   <div>날짜</div>
//   <div>결제수단</div>
// </div>
// {HistoryCount ? (
//   History.map(histo =>
//     <div className="history-element" key={histo.uid + "history"}>
//       <div>{histo.point_variation}</div>
//       <div>{DateFormat(histo.create_time)}</div>
//       <div>{histo.charge_type}</div>
//     </div>
//   )) : (<div>?????</div>)}
// </HistoryContainer>


