import React, { Component } from "react";
import styled from "styled-components";
import TextFormat from "modules/TextFormat";
import HaveInItemContainer from "containers/Products/HaveInItemContainer/HaveInItemContainer";
import HaveInGalleryContainer from "containers/Gallery/HaveInGalleryContainer/HaveInGalleryContainer";
import MakerRequestBoardContainer from "containers/Maker/MakerRequestBoardContainer";
import MakerReviewContainer from "containers/Maker/MakerReviewContainer";
import ReviewDetailModal from "components/Commons/ReviewDetailModal";
import { Icon } from "semantic-ui-react";
import ArticleModal from "components/Commons/ArticleModal/ArticleModal";
import market_style from "market_style";


const LocationList = [
  { value: 0, text: "서울특별시" },
  { value: 1, text: "부산광역시" },
  { value: 2, text: "대구광역시" },
  { value: 3, text: "인천광역시" },
  { value: 4, text: "광주광역시" },
  { value: 5, text: "대전광역시" },
  { value: 6, text: "울산광역시" },
  { value: 7, text: "경기도" },
  { value: 8, text: "강원도" },
  { value: 9, text: "충청북도" },
  { value: 10, text: "충청남도" },
  { value: 11, text: "전라북도" },
  { value: 12, text: "경상북도" },
  { value: 13, text: "경상남도" },
  { value: 14, text: "제주도" },
  { value: 15, text: "제한없음" },
];

// CSS STYLING
const Wrapper = styled.div`
  width:100%;
  display:flex;
  flex-direction:column;
  .row_wrapper{
    width:100%;
  }
  .flex{
    display:flex;
  }
  .flexWrap{
    flex-wrap:wrap;
  }
  @media only screen and (min-width: 1000px) and (max-width:1366px){
    .flexWrap{
      flex-wrap:nowrap;
    }
  }
  @media only screen and (min-width: 500px) and (max-width:1000px){
    .flexWrap{
      flex-wrap:wrap;
    }
  }
`;
const Expert = styled.div`
  width: 300px;
  height: 439px;
  margin-right:20px;
  padding:20px 25px;
  background: #FFFFFF;
  border-radius: 20px;
  border:1px solid #eaeaea;
  box-shadow: 3px 3px 5px #0000001A;
  .pic{
    width:100%;
    display:flex;
    justify-content:center;
  }
  .profile_Wrapper{
    width:100%;
    font-family: Noto Sans KR;
    text-align:center;
    .nick {
      margin-top:10px;
      overflow:hidden;
      text-overflow:ellipsis;
      white-space:nowrap;
      height:27px;
      font-weight: 500;
      font-size:${market_style.font.size.normal1};
      color: black;
      margin-top:0px 40px 0px 40px;
    }
    .category {
      font-weight: 300;
      font-size:${market_style.font.size.small1};
      margin-top: 10px;
      color: red;
    }
    .create_time{
      font-weight:300;
      font-size:${market_style.font.size.mini2};
      color:#707070;
      margin-top:10px;
    }
  }

  .like_Wrapper{
    width:100%;
    font-size:${market_style.font.size.small1};
    text-align:center;
    cursor:pointer;
    margin-top:5px;
    .unlike{
      color:#ff0000;
      font-weight:200;
    }
    .like{
      color:#ff0000;
    }
  }

  .counter_wrapper{
    margin-top: 10px;
    display: flex;
    justify-content:center;
    width: 100%;
    letter-spacing: 0;
    color: #000000;
    font-size:${market_style.font.size.mini2};
  
    .items {
      text-align: center;
      font-weight: 300;
    }
    .v-line {
      font-size:${market_style.font.size.mini2};
    }
    .likes {
      font-weight: 300;
    }
  }
  @media only screen and (min-width: 1000px) and (max-width:1366px){
    margin-bottom:20px;
  }
  @media only screen and (min-width: 500px) and (max-width:1000px){
    width:100%;
    margin-bottom:20px;
    margin-right:0px;
  }
`;
const Profile = styled.div`
  width: 250px;
  height: 250px;
  background: transparent;
  background-image: url(${props => props.face});
  border-radius: 50%;
  background-size: cover;
  background-position: center center;
`;

const Introduction = styled.div`
  width:980px;
  min-width:440px;
  height:439px;
  padding: 40px 60px;
  background: #FFFFFF;
  box-shadow: 3px 3px 5px #0000001A;
  border:1px solid #eaeaea;
  border-radius: 20px;
  font-family: Noto Sans KR;
  position:relative;
  .wrapItem{
    width:100%;
    height:100%;
    overflow: auto;
    .title {
      overflow:hidden;
      text-overflow:ellipsis;
      white-space:nowrap;
      padding:0px 0px 5px 0px;
      font-size:${market_style.font.size.normal1};
      font-weight: 500;
      color:black;
    }
    .text {
      width: 100%;
      margin-top: 5px;
      font-size:${market_style.font.size.small1};
      font-weight: 300;
      margin-bottom:25px;
      overflow: hidden;
      color:black;
    }
    .flex{
      display:flex;
    }
    .flexWrap{
      flex-wrap:wrap
    }
    .gradient_box{
      position:absolute;
      left:0px;
      top:0px;
      width:100%;
      height:100%;
      display:flex;
      justify-content:center;
      align-items:flex-end;
      padding:10px;
      border-radius: 20px;
      background:linear-gradient(180deg, rgba(255, 255, 255, 0), rgba(255, 255, 255,01.0));
    }
  }
`;
const ItemInfo = styled.div`
  margin-top: ${props => props.mTop == null ? "0px" : props.mTop + "px"};
  width: ${props => props.width == null ? "100%" : props.width + "px"};
  height: ${props => props.height == null ? "100%" : props.height + "px"};
  background: #FFFFFF;
  box-shadow: 3px 3px 5px #0000001A;
  border-radius: 20px;
  border:1px solid #eaeaea;
  opacity: 1;
  font-family: Noto Sans KR;
  padding: 10px 25px 20px 25px;

  .title {
    display:flex;
    color:black;
    justify-content:center;
    align-items:center;
    height:27px;
    font-size:${market_style.font.size.normal1};
    font-weight: 500;
    text-align: center;
  }
  .hrline{
    width:100%;
    border:1px solid #efefef;
  }
  .margin_bottom{
    margin-bottom:10px;
  }
  .wrapItem{
    width:100%;
    height:90%;
    display:flex;
    overflow-x:hidden;
    overflow-y:overlay;
  }

  .wrapGallery{
    width:100%;
    height:90%;
    display:flex;
    overflow-x:hidden;
    overflow-y:overlay;
  }
`;
const AdditionalInfo = styled.div`

  margin-top: ${props => props.mTop == null ? "0px" : props.mTop + "px"};
  width: ${props => props.width == null ? "100%" : props.width + "px"};
  height: ${props => props.height == null ? "max-content" : props.height + "px"};
  background: #FFFFFF;
  box-shadow: 3px 3px 5px #0000001A;
  border-radius: 20px;
  border:1px solid #eaeaea;
  opacity: 1;
  padding:10px 25px 15px 25px;
  font-family: Noto Sans KR;
  
  .title {
    display:flex;
    justify-content:center;
    align-items:center;
    height:27px;
    color:black;
    font-size:${market_style.font.size.normal1};
    font-weight: 500;
    text-align: center;
  }
  .hrline{
    width:100%;
    border:1px solid #efefef;
  }
  .margin_bottom{
    margin-bottom:10px;
  }
  .text {
    width: 371px;
    height: 86px;
    margin-top: 20px;
    margin-bottom: 34px;
    font-size:${market_style.font.size.small1};
    font-weight: 300;
    line-weight: 27px;
    text-align: left;
    overflow-y:scroll;
  }
  .reviewItem{
    width:100%;
    height:80%;
  }
  .wrapItem{
    width:100%;
    height:80%;
    display:flex;
    overflow:hidden;
    overflow-y:auto;
    }
`;
const MakerBoard = styled.div`

  width: ${props => props.width == null ? "100%" : props.width + "px"};
  margin-top: ${props => props.mTop == null ? "0px" : props.mTop + "px"};
  margin-bottom:50px;
  background: #FFFFFF;
  box-shadow: 3px 3px 5px #0000001A;
  border-radius: 20px;
  border:1px solid #eaeaea;
  opacity: 1;
  padding:10px 25px 20px 25px;
  font-family: Noto Sans KR;
  .flex{
    display:flex;
    justify-content:flex-end;
  }
  .headerWrapper{
    display:flex;
    justify-content:center;
    align-items:center;
    height:27px;
    width:100%;
    display:flex;
    justify-content:space-between;
  }
  .alignRight{
    display:flex;
    justify-content:flex-end;
    .link{
      width:max-content;
      cursor:pointer;
    }
  }
  ._title {
    width:100%;
    color: #000000;
    font-size:${market_style.font.size.normal1};
    font-weight: 500;
    text-align:center;
  };
  .redText{
    color:red;
  }

  .hrline{
    width:100%;
    border:1px solid #efefef;
  }
  .margin_bottom{
    margin-bottom:10px;
  }
  .list {
    font-weight: 300;
    font-size:${market_style.font.size.mini2};
    text-align: left;
    color: #000000;
    display:flex;
    flex-direction:column;
    align-items:center;
    .line {
      width:1300px;
      display: flex;
      flex-direction: row;
      margin-bottom: 37px;
      .title_text{
        width:750px;
        height:29px;
        overflow:hidden;
        margin-right:130px;
      }
      .sub_text{
        margin-left:70px;
      }
    }
    .circle {
      width: 80px;
      height: 29px;
      margin-right: 13px;
      border-radius: 16px;
      font-size:6px;
      display:flex;
      justify-content:center;
      align-items:center;
      padding:5px;
      &.red1 { background: #FF0000; };
      &.red2 { background: #FFC0C0; };
      &.red3 { background: #FF6868; };
      &.red4 { background: #FFD6D6; };
    };
  };
  .page {
    width: max-content;
    margin-top: 87px;
    margin-left: auto;
    margin-right: auto;
    font-size:${market_style.font.size.normal3};
    font-weight: 500;
    text-aglin: left;
    display: flex;
    flex-direction: row;
    line-height: 27px;
    color: #707070;
    .number{
      margin-right: 10px;
    }
    .this{
      color: red;
    }
    
    .another {}
    .more {}
  };
`;

const ExpTable = styled.div`
    *{
      font-family:Noto Sans KR;
      font-size:${market_style.font.size.mini2};
    }
    width: ${props => props.width == null ? "100%" : props.width + "px"};
    height: ${props => props.height == null ? "100%" : props.height + "px"};
    margin-left: ${props => props.mLeft == null ? "0px" : props.mLeft + "px"}px;
    margin-top: ${props => props.mTop == null ? "0px" : props.mTop + "px"};
    
    .row{
      width:100%;
      display:flex;
      margin-top:10px;
    }
    .header{
      width:100%;
      display:flex;
      padding:5px 0px;
      border-top:2px solid #efefef;
      border-bottom:2px solid #efefef;
    }
    .th{
      width:33%;
      height:100%;
      font-weight:400;
      text-align:center;
      color:#707070;
      font-size:${market_style.font.size.small1};
    }
    .td{
      width:33%;
      height:100%;
      font-weight:300;
      text-align:center;
      font-size:${market_style.font.size.small1};
      color:#000000;
    }
`;
const TitleForm = styled.input`
  padding: 10px;
  resize: none;
  width: 100%;
  height: 30px;
  border: 1px solid #E6E6E6;
  outline: none;
  border-radius: 10px;
`
const CommentForm = styled.textarea`
  padding:10px;
  resize:none;
  width:100%;
  height:100px;
  border:1px solid #E6E6E6;
  outline:none;
  border-radius:10px;
`
const TagPiece = styled.div`
    width: max-content;
    min-width: max-content;
    background-color:#E9E9E96A;
    margin-right: 8px;
    margin-top: 5px;
    color: #707070;
    padding:5px 12px;
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    font-size:${market_style.font.size.small1};
    .close {
        margin-left: 10px;
        width: max-content;
        height: max-content;
        padding: 0px 2px;
    }
`;
const CreateRequest = styled.div`

width:100%;
height:30px;
display:flex;
justify-content:flex-end;
// margin-top:10px;

.button{
    width:150px;
    height:30px;
    display:flex;
    justify-content:center;
    align-items:center;
    background-color:red;
    cursor:pointer;
    margin-left:20px;
    .font{
      font-size:${market_style.font.size.small1};
      color:white;
    }
}
.button_reverse{
  border:1px solid red;
  width:150px;
  height:30px;
  display:flex;
  justify-content:center;
  align-items:center;
  cursor:pointer;
  margin-left:20px;
  .font{
    font-size:${market_style.font.size.small1};
    color:#707070;
  }
}

`;

class MakerDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wirte: false, comment: "", title: "",
      tab: true,
      isLike: false,
      nick_name: "",
      thumbnail: null, thumbnail_name: null,
      category_level1: -1, category_level2: -1, location: null,
      explain: "", tag: [], equipment: [], technique: [],
      career: [{ number: 0, task: "", explain: "", during: "" }],
      //for review detail
      reviewdetail: false, detail: null,
      create_time:"",
      update_time:"",
      haveGallery:true,
    };
    this.onClickRequest = this.onClickRequest.bind(this);
    this.onClickisLike = this.onClickisLike.bind(this);
  }
  componentWillUpdate(nextProps) {
    if (this.props.MakerViewDetail !== nextProps.MakerViewDetail) {
      this.setState(nextProps.MakerViewDetail);
      const technique =nextProps.MakerViewDetail.maker_technique? nextProps.MakerViewDetail.maker_technique.split(","):[];
      nextProps.MakerViewDetail.maker_technique&&technique.pop();
      const equipment =nextProps.MakerViewDetail.maker_equipment?nextProps.MakerViewDetail.maker_equipment.split(","):[];
      nextProps.MakerViewDetail.maker_equipment&&equipment.pop();
      this.setState({technique:technique,equipment:equipment,});
    }
    if (this.props.like !== nextProps.like) {
      this.setState({ isLike: nextProps.like });
    }
  }

  onClickRequest(event) {
    window.location.href = "/requestToMaker/" + this.props.id;
  }
  onClickisLike(event) {
    const isLike = !this.state.isLike;

    isLike === false ? this.props.UnlikeMakerRequest(this.state.user_id, this.props.token)
      : this.props.LikeMakerRequest(this.state.user_id, this.props.token);

    this.setState({ isLike: isLike });
  }
  createNoneRequest = (title,content) => {
    const data = {
      type: "maker",
      status: "normal",
      category_level1: this.state.category_level1,
      category_level2: this.state.category_level2,
      // content: this.state.comment,
      // title: this.state.title,
      title: title,
      content: content,
      expert_id: this.props.id || null,
      personal: this.props.id || null,
    };
    this.props.CreateRequestRequest(data, this.props.token)
      .then(res => {
        if (res.success) {
          // alert("글이 등록되었습니다.");
          this.props.GetMakerRequestListRequest(this.props.id, 0);
        }
        this.setState({ write: false, title: "", comment: "" });
      })
      .catch(err => console.log("에러발생" + err));
  }
  render() {
    console.log(this.props,this.state);

    const { likeCount, itemCount } = this.props.MakerViewDetail;
    console.log("detail:", this.props);
    const { write } = this.state;
    // 카테고리
    let categoryName = this.props.category1 && this.props.category2 &&
      this.state.category_level2 < 1 ?
      this.props.category1[parseInt(this.state.category_level1-1, 10)]
      && this.props.category1[parseInt(this.state.category_level1-1, 10)].text
      : null;

    this.props.category2 && this.props.category2.map((item, index) => {
      if (item.parent === this.state.category_level1 && item.value === this.state.category_level2) {
        categoryName = item.text;
      }
      return item;
    })
    const Location = this.state.location == null ? "" : LocationList[this.state.location] && LocationList[this.state.location].text;

    return (
      this.props.MakerViewDetail ?
        <Wrapper>
          <div className="row_wrapper flex flexWrap">
            {/* Designer */}
            <Expert>
              {/* Profile */}
              <div className="pic">
              <Profile face={this.state.image} />
              </div>
              {/* Text */}
              <div className="profile_Wrapper">
                    <div className="nick">
                    {this.state.nick_name}
                    </div>                
                    <div className="create_time">
                    {new Date(this.state.create_time).getFullYear()+"년"
                    +(new Date(this.state.create_time).getMonth()+1)+"월"
                    +(new Date(this.state.create_time).getDate())+"일 등록"}</div>
                    <div className="category"><TextFormat txt={categoryName || "전체"} chars={32} /></div>
              </div>
              <div className="like_Wrapper">
                {this.state.isLike === false ?
                  <div onClick={this.onClickisLike} className="unlike">♡</div>
                  :
                  <div onClick={this.onClickisLike} className="like">♥</div>
                }
                {/* ♥ */}
              </div>
              {/* Counter */}
              <div className="counter_wrapper">
                <div className="items">
                  {itemCount || 0}개의 아이템 |</div>&nbsp;&nbsp;
                <div className="v-line" />
                <div className="likes">{/*♥*/}
                  <Icon className="heart" size="small" color="red" />{likeCount || 0}</div>
              </div>
            </Expert>

            {/* Introduction */}
            <Introduction>
              <div className="wrapItem">
                <div className="title">
                  {this.state.nick_name}
              </div>
                <div className="text">{this.state.description}</div>
                <div className="title">위치</div>
                <div className="text">{Location}</div>
                <div className="title">태그</div>
                <div className="text flex flexWrap">
                  {
                    this.state.tag==null||this.state.tag.length==0?
                    "태그없음"
                    :
                    null
                  }
                  {
                    typeof this.state.tag === "string"
                      ? this.state.tag.split(",").map((item, index) =>
                        item ? <TagPiece key={index}>{item}</TagPiece> : null)
                      : this.state.tag.map((item, index) =>
                        item ? <TagPiece key={index}>{item}</TagPiece> : null)
                  }
                </div>
                <div className="title">보유기술</div>
                <div className="text flex flexWrap">
                  {
                    this.state.technique==null||this.state.technique.length==0?
                    "태그없음"
                    :
                    this.state.technique.map((item, index) => {
                      return (
                        <TagPiece key={index}>
                          {item}
                        </TagPiece>
                      );
                    })
                  }
                </div>
                <div className="title">보유장비</div>
                <div className="text flex flexWrap">
                  {
                    this.state.equipment==null||this.state.equipment.length==0?
                    "태그없음"
                    :
                    this.state.equipment.map((item, index) => {
                      return (
                        <TagPiece key={index}>
                          {item}
                        </TagPiece>
                      );
                    })
                  }
                </div>
                {/* <div className="gradient_box"><div>▾</div></div> */}
              </div>
            </Introduction>
            {/** 상세소개*/}

          </div>
          {
          this.state.experience&&
          this.state.experience.split("/")&&
          ((this.state.experience.split("/").length>0&&this.state.experience.split("/")[0]=="0,,,")||
          this.state.experience.split("/").length<=0)
          ?
          null
          :
          <AdditionalInfo height={190} mTop={20}>
          <div className="title margin_bottom">제작 경험</div>
          <div className="wrapItem">
          <ExpTable>
            <div className="header">
              <div className="th">업무</div>
              <div className="th">내용</div>
              <div className="th">기간</div>
            </div>
            {
              this.state.experience && this.state.experience.split("/").map((item, index) =>
                <div className="row" key={index}>
                  {item.split(",").map((element, subIndex) =>
                    subIndex > 0 ? <div className="td" key={subIndex}>{element}</div> : null
                  )}
                </div>)
            }
          </ExpTable>
            </div>
          </AdditionalInfo>
          }


          {/**보유아이템 */}
          <ItemInfo height={420} mTop={20}>
            <div className="title margin_bottom">제작 아이템</div>
            <div className="hrline margin_bottom"/>
            <div className="wrapItem">
          {<HaveInItemContainer id={this.props.id} />}
        </div>
          </ItemInfo>

          {/* 갤러리 */}
          {
            this.state.haveGallery==true?
            <ItemInfo height={379} mTop={20}>
            <div className="title margin_bottom">갤러리</div>
            <div className="hrline margin_bottom"/>
            <div className="wrapGallery">
              {<HaveInGalleryContainer id={this.props.id} handleHaveGallery={(result)=>{this.setState({haveGallery:result})}} isModify={false} />}
            </div>
            </ItemInfo>
            :
            null
          }

          {/* 리뷰 */}
          <AdditionalInfo mTop={20} style={{height:"max-content"}}>
            <div className="title margin_bottom">리뷰({this.props.ReviewCount})</div>
            <div className="hrline margin_bottom"/>
            <div className="reviewItem">
            <MakerReviewContainer
              count={this.props.ReviewCount}
              id={parseInt(this.props.id, 10)}
              handler={detail => this.setState({ reviewdetail: true, detail: detail })} />
              </div>
          </AdditionalInfo>
          {/* 리뷰자세히 모달*/}
          {this.state.reviewdetail ? <ReviewDetailModal open={this.state.reviewdetail} close={() => this.setState({ reviewdetail: false })} detail={this.state.detail} /> : null}

            <MakerBoard mTop={20}>
            <div className="headerWrapper margin_bottom">
              <div className="_title">메이커 게시판</div>
            </div>
            <div className="hrline"/>
              <div className="list">
                <MakerRequestBoardContainer id={parseInt(this.props.id, 10)} />
              </div>
              {write ?
                  <ArticleModal
                  write={this.state.write}
                  handlerModal = {(write)=>{this.setState({write:write})}}
                  createNoneRequest={(title,content)=>this.createNoneRequest(title,content)}
                />
                :
                this.props.userInfo==null?null:
                <CreateRequest>
                <div className="button_reverse" onClick={this.onClickRequest}>
                  <div className="font">제작 의뢰</div>
                </div>
                <div className="button" onClick={() => this.setState({ write: true,content:"" })}>
                  <div className="font" >게시글 작성</div>
                </div>
              </CreateRequest>
              }
            </MakerBoard>
        </Wrapper>
        : <div>LOADING Maybe...</div>);
  }
}

export default MakerDetail;
