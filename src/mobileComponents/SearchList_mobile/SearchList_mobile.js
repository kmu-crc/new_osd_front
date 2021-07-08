import React, { Component } from "react";
import styled from "styled-components";
import Sorting from "components/Commons/Sorting";
import ContentBox from "components/Commons/ContentBox";
import StyleGuide from "StyleGuide";
import Dropdown from "semantic-ui-react/dist/commonjs/modules/Dropdown/Dropdown";
import ScrollProductListContainer_mobile from "mobileComponents/ScrollProductListContainer_mobile";
import ScrollMakerListContainer_mobile from "mobileComponents/ScrollMakerListContainer_mobile";
import ScrollDesignerListContainer_mobile from "mobileComponents/ScrollDesignerListContainer_mobile";
import { alert } from "components/Commons/Alert/Alert";
import market_style from "market_style";

const MainBox = styled.div`

` 
const Wrapper_ = styled.div`
  width:100%;
  display:flex;
  justify-content:center;
  margin-top:15px;
  // padding:${props=>props.marginType=="item"?"0px 13em":"0px 15em"};
  & ul {
    margin-top: 30px;
  }
  display: flex;  
  .left{
    margin-left: auto;
    margin-right: 25px;
  }
`;
const ImgWrapper = styled.div`
  width: 100%;
  height: max-content;
  margin-bottom:7px;
  margin-top:15px;
`;

const Title = styled.div`
  width: 100%;
  display:flex;
  justify-content:center;
  ._searchWrapper{
    width:max-content;
    position:relative;
  }
  & input {
    width:300px;
    height:35px;
    border:1px solid #707070;
    border-radius:22px;
    outline:none;
    padding:8px 35px 8px 30px;
    text-align: left;
    font-weight:700;
    vertical-align: middle;
    background-color: transparent;
    color: ${StyleGuide.color.geyScale.scale7};
    &::placeholder {
      color: ${StyleGuide.color.geyScale.scale3};
    }
  }
  & .searchBtn {
    position:absolute;
    right:5px;
    top:7px;
    background: transparent;
    border:none;
    &:focus {
      outline: 0;
    }
  }
  & .searchBtn .icon {
    font-size: ${market_style.font.size.small3};
    color: ${StyleGuide.color.geyScale.basic};
  }
`;

const MenuWrap = styled.div`
  width:100%;
  background-color: white;
  margin-bottom: 15px;
  padding:0px 10px;
  display:flex;
  justify-content:space-between;
  align-items:center;
  .dropstyle{
    min-width:max-content;
    height:max-content;
  }
`;

const type = [
  { key: "item", value: "item", text: "아이템" },
  { key: "designer", value: "designer", text: "디자이너" },
  { key: "maker", value: "maker", text: "메이커" }
];

class SearchList_mobile extends Component {
  state = {
    rendering: true,
    keyword: ""
  }

  async componentDidMount() {
    if (this.props.keyword && this.props.keyword !== "null") {
      document.getElementById("searchInput").value = await this.props.keyword;
      this.setState({
        keyword: this.props.keyword
      });
    }
    document.getElementById("searchInput").focus();
  }

  changeState = async () => { // 리렌더링을 위한 state값 변경
    await this.setState({ rendering: false });
    await this.setState({ rendering: true });
  }

  getSearchValue = async(e) => {
    const target = e.target;
    const value = target.value;
    let regExp = /^[a-zA-Zㄱ-힣0-9]*$/i;
    if (!value.match(regExp)) {
      await alert("특수문자는 사용할 수 없습니다.");
      target.value = "";
      return;
    } else {
      this.setState({
        keyword: value
      });
    }
  }

  submitEnter = async(e) => {
    if (e.keyCode === 13) {
      this.onSearchSubmit(this.state.keyword);
      const location = window.location.pathname;

      const designerActive = (location.indexOf("/designer") !== -1 || location.indexOf("/designerDetail") !== -1) && (location.indexOf(`/request`) === -1)
      const makerActive = (location.indexOf("/maker") !== -1 || location.indexOf("/makerDetail") !== -1) && (location.indexOf(`/request`) === -1)
      const itemActive = (location.indexOf("/product") !== -1 || (location.indexOf("/createproduct") !== -1)|| (location.indexOf("/productModify") !== -1)|| location.indexOf("/productDetail") !== -1) && (location.indexOf(`/request`) === -1)
      let searchtype = designerActive ? "designer" : makerActive ? "maker" : itemActive ? "item" : null;
      console.log(this.state.keyword);
      let countItem =-1;
      let countMaker=-1;
      let countDesigner=-1;
      await this.props.GetItemSearchCountRequest(this.props.sort, this.props.cate1, this.props.cate2, this.state.keyword)
      .then((data)=>{console.log(data);countItem=data.searchCount==null?-1:data.searchCount;});
      await this.props.GetMakerSearchCountRequest(this.props.sort, this.props.cate1, this.props.cate2, this.state.keyword)
      .then((data)=>{console.log(data);countMaker=data.searchCount==null?-1:data.searchCount;});
      await this.props.GetDesignerSearchCountRequest(this.props.sort, this.props.cate1, this.props.cate2, this.state.keyword)
      .then((data)=>{console.log(data);countDesigner=data.searchCount==null?-1:data.searchCount;});
      if(makerActive){
        searchtype=countMaker>0?"maker":
        countDesigner>0?"designer":
        countItem>0?"item":
        "item";
      }else if(itemActive){
        searchtype=countItem>0?"item":
        countDesigner>0?"designer":
        countMaker>0?"maker":
        "item";
      }else{
          searchtype=countDesigner>0?"designer":
          countMaker>0?"maker":
          countItem>0?"item":
          "item";
      }
      console.log(searchtype);
  
      window.location.href = `/search/${searchtype}/update/${this.state.keyword}`;
  
    }
  }

  onSearchSubmit = async(data) => {
    if (this.state.keyword == null || this.state.keyword === "") {
      await alert("키워드를 입력해주세요");
    } else {
      this.props.history.replace(`/search/${this.props.type}/${this.props.sort}/${this.state.keyword}`);
      this.changeState();
    }
  }

  typeChange = (e, { value }) => {
    this.props.history.replace(`/search/${value}/${this.props.sort}/${this.props.keyword}`);
    this.changeState();
  }

  sortChange = (e, { value }) => {
    this.props.history.replace(`/search/${this.props.type}/${value}/${this.props.keyword}`);
    this.changeState();
  }

  render() {
    const typetext =
      this.props.type && this.props.type === "designer" ? "디자이너"
        : this.props.type && this.props.type === "maker" ? "메이커"
          : "아이템"
    console.log(this.props.sort);
    return (
      <MainBox >
        <ImgWrapper>
          <Title>
            <div className="_searchWrapper">
            <input id="searchInput"
              placeholder="검색어를 입력하세요"
              onChange={this.getSearchValue}
              onKeyDown={this.submitEnter}
            />
            <button onClick={this.onSearchSubmit} className="searchBtn">
              <i aria-hidden="true" size="tiny" className="search icon"></i>
            </button>
            </div>
          </Title>
        </ImgWrapper>
        <MenuWrap>
              <Dropdown
                  className="dropstyle"
                  placeholder={typetext}
                  options={type}
                  onChange={this.typeChange} />
        </MenuWrap>
        <div>
          {this.state.rendering &&
            <Wrapper_ marginType={this.props.type}>
              {this.props.type === "designer" ? <ScrollDesignerListContainer_mobile isSmall={true} sort={this.props.sort} keyword={this.props.keyword} /> : null}
              {this.props.type === "maker" ? <ScrollMakerListContainer_mobile isSmall={true} sort={this.props.sort} keyword={this.props.keyword} /> : null}
              {this.props.type === "item" ? <ScrollProductListContainer_mobile isSearch={true} isSmall={true} sort={this.props.sort} keyword={this.props.keyword} /> : null}
            </Wrapper_>
          }
        </div>
      </MainBox>
    )
  }
}

export default SearchList_mobile;
