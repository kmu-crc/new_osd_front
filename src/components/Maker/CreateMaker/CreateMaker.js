import React, { Component } from "react";
import styled from 'styled-components';
import { Icon } from "semantic-ui-react";
import noimg from "source/noimg.png";
import { Dropdown } from "semantic-ui-react"
import { InputTag } from "components/Commons/InputItem/InputTag"
import { RedButton, GrayButton } from "components/Commons/CustomButton"
import { alert } from "components/Commons/Alert/Alert";
import { Confirm } from "components/Commons/Confirm/Confirm";
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

const MainBox = styled.div`
  *{
    color:black;
  }
  padding:20px 30px;
  .title{
    width:100%;
    display:flex;
    justify-content:center;
    font-family:Noto Sans KR, Bold;
    font-size:${market_style.font.size.normal3};
    font-weight:500;
  }
    .contentsBox{
      margin-top:20px;
      width:100%;
      display:flex;
    }
    .centering{
      justify-content:center;
    }
    .marginTop{
      margin-top:20px;
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
const Career = styled.div`
  .row{
    width:100%;
    display:flex;
    align-items:center;
    margin-bottom:10px;
  }
  .text_wrapper{
    width:100%;
  }
  .number{
    min-width:37px;
    font-size:${market_style.font.size.mini2};
  }
  .career_label{
    min-width:48px;
    font-size:${market_style.font.size.small1};
    font-weight:500;
  }
  .close{width:100%;text-align:right;}
`

const ThumbnailBox = styled.div`
  *{
    font-family:Noto Sans KR;
    font-weight:500;
    font-size:${market_style.font.size.small1};
    color:#707070;
  }
  width:300px;
  height:322px;
  box-shadow: 3px 3px 5px #0000001A;
  border:1px solid #eaeaea;
  border-radius: 20px;
  padding:20px 25px;
  margin-right:20px;
  display:flex;
  flex-direction:column;
  align-items:center;
  .label{
    width:100%;
    display:flex;
    justify-content:center;
    margin-bottom:10px;
  }
  .wrapper_thumb{
    width:max-content;
    height:max-content;
  }
  .thumbnail{
    cursor:pointer;
    width:250px;
    height:250px;
    display:flex;
    justify-content:center;
    align-items:center;
    background:#EEEEEE;
    border-radius:50%;
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
const Thumbnail = styled.div`
  cursor:pointer;
  width:250px;
  height:250px;
  display:flex;
  justify-content:center;
  align-items:center;
  background-image: ${props => `url(${props.imageURL == null ? noimg : props.imageURL})`};
  background-size: cover;
  background-position: center center;
  border-radius:50%;
`;
const ExperienceBox = styled.div`
    width:100%;
    box-shadow: 3px 3px 5px #0000001A;
    border-radius: 20px;
    border: 0.5px solid #EAEAEA;
    padding:10px 30px 16px 30px;
    .title_{
      width:100%;
      height:27px;
      text-align:center;
      font-size:${market_style.font.size.normal1};
      font-weight:500;
      color:#707070;
    }
    .wrapper{
      width:100%;
    }
    .labelBox{
      width:100%;
      display:flex;
      border-top:2px solid #EFEFEF;
      border-bottom:2px solid #EFEFEF;
      padding:10px 5px 10px 26px;
      margin-bottom:5px;
      .number_label{
        width:7%;
        min-width:max-content;
        font-size:${market_style.font.size.mini2};
        margin-right:5px;
      }
      .text_label{
        width:31%;
        font-size:${market_style.font.size.mini2};
      }
      .last_label{
        width:31%;
      }
    }
    .careerBox{
      display:flex;
      align-items:center;
      padding:5px 0px 5px 26px;
      .number_wrapper{
        width:7%;
        font-weight:500;
        font-size:${market_style.font.size.small1};
      }
      .text_wrapper{
        width:31%;
        padding-right:34px;
      }
      .last_margin{
        width:31%;
      }
      .close{
        cursor:pointer;
      }
    }
`
const FormBox = styled.div`
    *{
      font-size:${market_style.font.size.small1};
    }
    width:100%;
    height:322px;

    box-shadow: 3px 3px 5px #0000001A;
    border-radius: 20px;
    padding:27px 50px;
    border: 0.5px solid #EAEAEA;
    .FormBoxScroll{
      padding:0px 15px 0px 0px;
      width:100%;
      height:100%;
      overflow-Y:auto;
      overflow-X:hidden;
    }
  .maxWidth{
    width:100%;
  }
  .wrapper{
    
    width:100%;
    display:flex;
    align-items:center;
    margin-bottom:18px;
  }
  .last_margin{
    margin-bottom:0px;
  }
  .wrapper_noflex{
    width:100%;
    margin-bottom:70px;
  }
  .margin_zero{
    margin:0px;
  }
  .margin_bottom{
    margin-bottom:30px;
  }
  .flex{
    display:flex;
    align-items:flex-start;
  }
  .innerWraper{
    width:100%;
    margin-bottom:26px;
    display:flex;
  }
  .label{
    width:141px;
    font-size:${market_style.font.size.small1};
    font-family:Noto Sans KR;
    font-weight:500;
    color:#707070;
    min-width:157px;
  }
  .label_centering{
    text-align:center;
  }
  .index{
    width:30px;
    height:30px;
    color:#707070;
  }
  .flexWrapBox{
    width:100%;
    display:flex;
    flex-wrap:wrap;
  }
  @media only screen and (min-width: 500px) and (max-width:1000px){
    padding:27px;
  }

`;
const Button = styled.div`
    width:${props => props.width == null ? 100 + "%" : props.width + "px"};
    height:${props => props.height == null ? 100 + "%" : props.height + "px"};
    background-color:white;
    font-family:Noto Sans KR;
    font-size:${market_style.font.size.small1};
    display:flex;
    align-items:center;
    cursor:pointer;
    margin-left:${props => props.margin == null ? 0 + "px" : props.margin + "px"};
    .label{
      margin-left:10px;
    }
    
`;
const InputText = styled.input.attrs({ type: "text" })`
  width:${props => props.width == null ? 100 + "%" : props.width + "px"};
  height:31px;
  border-radius:10px;
  font-family:Noto Sans KR;
  font-size:${market_style.font.size.mini2};
  background-color:#E9E9E9;
  outline:none;
  border:0px;
  padding: 0.67857143em 1em;
  font-weight:300;
`;
const InputTextarea = styled.textarea`
  width:${props => props.width == null ? 100 + "%" : props.width + "px"};
  height:${props => props.height == null ? 100 + "%" : props.height + "px"};
  border-radius:10px;
  font-family:Noto Sans KR;
  font-size:${market_style.font.size.mini2};
  background-color:#E9E9E9;
  outline:none;
  border:0px;
  readonly;
  resize:none;
  padding: 0.67857143em 1em;
  font-weight:300;

`;
const Margin = styled.div`
  width:${props => props.width == null ? 100 + "%" : props.width + "px"};
  height:${props => props.height == null ? 100 + "%" : props.height + "px"}
`;
const DropBox = styled(Dropdown)`
    width:160px;
    min-width:100px !important;
    min-height:31px !important;
    max-height:31px !important;   
    display:flex !important;
    align-items:center !important; 
    background-color:#E9E9E9 !important;
    margin-right:10px;
    font-size:${market_style.font.size.small1};
    border-radius:10px !important;
    position:relative !important;
    
    .icon{
      width:max-content !important;
      height:max-content !important;
      padding:6px !important;
    }
    .menu{
      height:max-content;
      max-height:113px !important;
      z-index:9999 !important;

    }
    @media only screen and (min-width: 500px) and (max-width:1000px){
      margin-bottom:10px;
    }
`;

class CreateMaker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      thumbnail: null, thumbnail_name: null,
      category_level1: -1, category_level2: -1, location: null,
      explain: "", tag: [], equipment: [], technique: [],
      // career: [{ number: 0, task: "", explain: "", during: "" }],
      career:[],
    }
    this.onClickCategorylevel1 = this.onClickCategorylevel1.bind(this);
    this.onClickCategorylevel2 = this.onClickCategorylevel2.bind(this);
    this.onChangeCareer = this.onChangeCareer.bind(this);
    this.onClickAddCareer = this.onClickAddCareer.bind(this);
    this.onDeleteCareer = this.onDeleteCareer.bind(this);
    this.handleOnChangeThumbnail = this.handleOnChangeThumbnail.bind(this);
    this.onChangeExplain = this.onChangeExplain.bind(this);
    this.onChangeLocation = this.onChangeLocation.bind(this);
    this.handleAddTag = this.handleAddTag.bind(this);
    this.handleAddEquipment = this.handleAddEquipment.bind(this);
    this.handleAddTechnique = this.handleAddTechnique.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    // this.setState({
    //   thumbnail: noimg,
    //   thumbnail_name: "sh",
    //   category_level1: -1,
    //   category_level2: -1,
    //   explain: "블롸블라",
    //   tag: ["가", "나", "다"],
    //   equipment: ["장비1", "장비2", "장비3",],
    //   technique: ["기술1", "기술2", "기술3",],
    //   career: [{ number: 0, task: "테스트업무", explain: "테스트업무입니다", during: "1999~2001" }],
    // })
  }
  async onClickCategorylevel1(event, { value }) {
    await this.setState({ category_level1: { value }.value });
  }
  async onClickCategorylevel2(event, { value }) {
    await this.setState({ category_level2: { value }.value });
  }
  async onChangeCareer(number, task, explain, during) {
    let arr = this.state.career.slice();
    await arr.splice(number, 1, { number: number, task: task, explain: explain, during: during });
    this.setState({
      career: arr,
    })
  }
  onClickAddCareer(event) {
    this.setState({
      career: this.state.career.concat({ number: this.state.career.length, task: "", explain: "", during: "" }),
    })
  }
  async onDeleteCareer(value){

    const number = value;
    let copy = [...this.state.career];
    await copy.splice(number,1);
    copy&&copy.map(async(item,index)=>{
      item.number=index;
      console.log(index);
    });
    console.log(copy);
    await this.setState({career:copy});
  }
  onChangeExplain(event) {
    this.setState({ explain: event.target.value })
  }
  onChangeLocation(event, { value }) {
    this.setState({ location: { value }.value });
  }
  handleAddTag(tag) {
    this.setState({
      tag: tag.slice(),
    });
  }
  handleAddEquipment(equipment) {
    this.setState({
      equipment: equipment.slice(),
    })
  }
  handleAddTechnique(technique) {
    this.setState({
      technique: technique.slice(),
    })
  }

  handleOnChangeThumbnail(event) {
    event.preventDefault();
    const reader = new FileReader();
    const file = event.target.files[0];
    reader.onloadend = () => {
      this.setState({ thumbnail: reader.result, thumbnail_name: file.name })
    }
    if (event.target.files[0]) {
      reader.readAsDataURL(file);
    }
  }

  onSubmit= async e => {

    e.preventDefault();

    let tagList = "";
    this.state.tag.map((item, index) => { // 태그,태그,태그 ...
      return (
        tagList += item + ","
      );
    });
    let experienceList = "";
    this.state.career.map((item, index) => { // 넘버,업무,설명,기간/넘버,업무,설명,기간/넘버, ...
      return (
        experienceList += item.number + "," + item.task + "," + item.explain + "," + item.during + "/"
      );
    });

    const data = {
      files: [],
      user_id: this.props.userInfo.uid,
      type: "maker",
      description: this.state.explain,
      category_level1: this.state.category_level1,
      category_level2: this.state.category_level2,
      location: this.state.location,
      tag: this.state.tag.join(","),
      experience: experienceList,
      maker_equipment: this.state.equipment.join(","),
      maker_technique: this.state.technique.join(","),

    }
    let file = { value: this.state.thumbnail, name: this.state.thumbnail_name, key: 0 };
    data.files.push(file);
    console.log(data);


    if (this.state.thumbnail != null || this.state.thumbnail !== "") {
      data.files.push(file);
    }
    // if (data.files.length <= 0 || data.files[0].value === (this.props.MyDetail.profileImg&&this.props.MyDetail.profileImg.m_img)) {
    //   delete data.files;
    // }

        // 예외처리
    if(data.user_id == "" || data.user_id == null){
          await alert("닉네임을 입력해주세요","확인");
          return;
    }else if(data.category_level1<=0||data.category_level1==null){
          await alert("카테고리를 입력해주세요","확인");
          return;
    }else if(this.state.thumbnail == null || this.state.thumbnail == ""){
          await alert("썸네일을 등록해주세요","확인");
          return;
    }

    console.log(this.props.token);
    // return;
    this.props.InsertMakerDetailRequest(data, this.props.token)
      .then(async res => {
        console.log("res", res.res);
        const result = res.res;

        if (res.res.success) {
          await alert("정보가 수정되었습니다.");
          // this.props.history.push(`/`);
          // window.location.href = "/designer";
          window.location.href = `/mypage`;
        } else {
          await alert("다시 시도해주세요");
          this.setState({
            loading: false
          });
        }
      })
      .catch(async e => {
        console.log("실패", e);
        await alert("다시 시도해주세요");
        this.setState({
          loading: false
        });
      });
    // this.props.InsertMakerDetailRequest(data, this.props.token)
    //   .then(res => {
    //     console.log("res", res);
    //     const result = res;
    //     if (result.success) {
    //       alert("정보가 수정되었습니다.");
    //       //this.props.history.push(`/`);
    //       window.location.href = "/maker";
    //     } else {
    //       alert("다시 시도해주세요");
    //       this.setState({
    //         loading: false
    //       });
    //     }
    //   })
    //   .catch(e => {
    //     console.log("실패", e);
    //     alert("다시 시도해주세요");
    //     this.setState({
    //       loading: false
    //     });
    //   });

    // window.location.href = "/myPage"
  }

  render() {
    const category1 = this.props.category1 || [{ text: "_", value: -1 }];
    const category2 = (this.state.category_level1 && this.props.category2 && this.props.category2.filter(item => item.parent === this.state.category_level1)) || [{ text: "_", value: -1 }];

    return (
      <React.Fragment>
        <MainBox>
          <div className="title">메이커 등록</div>
          <div className="contentsBox flexWrap">
            <ThumbnailBox>
              <div className="label">프로필 썸네일<sup style={{color:"red"}}>*</sup></div>
              <input hidden onChange={this.handleOnChangeThumbnail} id="file" type="file" />
              <label className="wrapper_thumb" htmlFor="file">
                {this.state.thumbnail == null ?
                  <div className="thumbnail"><div>첨부</div></div>
                  :
                  <Thumbnail imageURL={this.state.thumbnail} />
                }
              </label>
            </ThumbnailBox>
            {/* <RedButton onClick={this.onSubmit} left={223} bottom={0}><div>등록하기</div></RedButton> */}
            <FormBox>
              <div className="FormBoxScroll">
              <div className="wrapper flex">
                <div className="label">닉네임<sub style={{color:"red"}}>*</sub></div>
                {this.props.userInfo.nickName}
              </div>

              <div className="wrapper flex">
                <div className="label">설명</div>
                <InputTextarea onChange={this.onChangeExplain} value={this.state.explain} placeholder="설명을 입력해주세요" height={67} />
              </div>

              <div className="wrapper flex">
                <div className="label">카테고리<sup style={{color:"red"}}>*</sup></div>
                <div className="flexWrapBox">
                  <DropBox id="category_level1" value={this.state.category_level1} selection options={category1} placeholder="대분류" onChange={this.onClickCategorylevel1} />
                  <DropBox id="category_level2" value={this.state.category_level2} selection options={category2} placeholder="소분류" onChange={this.onClickCategorylevel2} />
                </div>
                </div>
              <div className="wrapper flex">
                <div className="label">태그</div>
                <div className="maxWidth">
                  <InputTag taglist={this.state.tag} getValue={this.handleAddTag} placeholder="태그를 입력하고 [enter]키를 누르세요"/>
                </div>
              </div>

              <div className="wrapper flex">
                <div className="label">위치</div>
                {/* <DropBox id="country" disabled selection options={[{ value: 0, text: "대한민국" }]} value={0} /> */}
                <DropBox upward id="location" value={isNaN(parseInt(this.state.location, 10)) === true ? null : parseInt(this.state.location, 10)} selection options={LocationList} placeholder="시/도"
                  onChange={this.onChangeLocation} />
              </div>

              {/* <div className="wrapper_noflex ">
                {
                  this.state.career.map((item, index) => {
                    console.log("career", item)
                    return (
                      <CreateCareer item={item} number={(item.number) + 1} onChangeCareer={this.onChangeCareer} key={index} />
                    );
                  })
                }
                <Button onClick={this.onSubmit} width={250} height={30} margin={157} onClick={this.onClickAddCareer}>
                  <Icon name="plus" /><div className="label">경력 추가하기</div>
                </Button>
              </div> */}

              <div className="wrapper flex">
                <div className="label">보유장비</div>
                <div className="maxWidth">
                  <InputTag taglist={this.state.equipment} getValue={this.handleAddEquipment} placeholder="보유장비를 입력하고 [enter]키를 누르세요"/>
                </div>
              </div>

              <div className="wrapper flex">
                <div className="label">보유기술</div>
                <div className="maxWidth">
                  <InputTag taglist={this.state.technique} getValue={this.handleAddTechnique} placeholder="보유장비 입력하고 [enter]키를 누르세요"/>
                </div>
              </div>
              </div>
            </FormBox>


          </div>

          <div className="contentsBox">
          <ExperienceBox>
              <div className="title_">경험</div>
              <div className="labelBox">
                <div className="number_label">번호</div>
                <div className="text_label">업무</div>
                <div className="text_label">기간</div>
                <div className="text_label">내용</div>
              </div>
              
              <div className="wrapper_noflex ">
                {this.state.career.map((item, index) => {
                  console.log("career", item)
                  return (
                    <CreateCareer item={item} number={(item.number) + 1} onChangeCareer={this.onChangeCareer} onDeleteCareer={(index)=>this.onDeleteCareer(index)} key={index} />
                  );
                })}
                {/* <CreateCareer number={0} onChangeCareer={this.onChangeCareer}/> */}
                <Button /*onClick={this.onSubmit}*/ width={250} height={30} margin={112} onClick={this.onClickAddCareer}>
                  <Icon name="plus" size='tiny' color='red' /><div className="label">경험 추가</div>
                </Button>
              </div>
            </ExperienceBox>
          </div>
          <div className="contentsBox centering marginTop">
            <RedButton width={150} height={30} fontSize={market_style.font.size.small1} text={"메이커를 등록합니다."} okText="확인" cancelText="취소" value={"등록하기"} onClick={this.onSubmit} isConfirm={true} />
            <GrayButton width={150} height={30} fontSize={market_style.font.size.small1} text={"취소하시겠습니까?"} value={"취소하기"} onClick={() => { window.location.href = "/mypage" }} isConfirm={false}></GrayButton>
          </div>
        </MainBox>
      </React.Fragment>
    );
  };
} export default CreateMaker;


// 경력 //
class CreateCareer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task: "", explain: "", during: "",
    }
    this.onChangeTask = this.onChangeTask.bind(this);
    this.onChangeExplain = this.onChangeExplain.bind(this);
    this.onChangeDuring = this.onChangeDuring.bind(this);
    this.onDeleteAll = this.onDeleteAll.bind(this);
  }
  componentDidMount() {

    this.setState({
      task: this.props.item.task,
      explain: this.props.item.explain,
      during: this.props.item.during,
    })
  }
  componentDidUpdate(prevProps) {
    if (prevProps.item !== this.props.item) {
      this.setState({
        task: this.props.item.task,
        explain: this.props.item.explain,
        during: this.props.item.during,
      })
    }
    return true;
  }
  onChangeTask(event) {
    this.setState({ task: event.target.value, })
    this.props.onChangeCareer(this.props.number - 1, event.target.value, this.state.explain, this.state.during);
  }
  onChangeExplain(event) {
    this.setState({ explain: event.target.value, })
    this.props.onChangeCareer(this.props.number - 1, this.state.task, event.target.value, this.state.during);
  }
  onChangeDuring(event) {
    this.setState({ during: event.target.value, })
    this.props.onChangeCareer(this.props.number - 1, this.state.task, this.state.explain, event.target.value);
  }
  onDeleteAll(event){
    let number = this.props.number-1;
    if(number<0)return;
    this.props.onDeleteCareer(number);  }


  render() {
    const leadingZeros = (n, digits) => { //0채우는 함수
      var zero = '';
      n = n.toString();

      if (n.length < digits) {
        for (var i = 0; i < digits - n.length; i++)
          zero += '0';
      }
      return zero + n;
    }
    console.log("careerlog", this.state);
    return (
      <React.Fragment>
        <Career>
          <div className="row">
            <div className="number">{leadingZeros(this.props.number, 2)}</div>
            <div className="career_label">업무</div>
            <div className="text_wrapper">
              <InputText value={this.state.task} onChange={this.onChangeTask}/>
            </div>
          </div>
          <div className="row">
            <div className="number"/>
            <div className="career_label">기간</div>
            <div className="text_wrapper">
            <InputText value={this.state.during} onChange={this.onChangeDuring}/>
            </div>
          </div>
          <div className="row">
            <div className="number"/>
            <div className="career_label">내용</div>
            <div className="text_wrapper">
            <InputText value={this.state.explain} onChange={this.onChangeExplain}/>
            </div>
          </div>
          <div className="close" onClick={this.onDeleteAll}>x</div>
        </Career>
      </React.Fragment>
    );
  }
}
// import React, { Component } from "react";
// import styled from 'styled-components';
// import { FormInput, FormAddress, FormExp, FormTag, FormThumbnail, FormDropBox, FormCheckBoxnew } from "components/Commons/FormItems";
// import Button from "components/Commons/Button";
// import { Header, Grid } from "semantic-ui-react"
// import StyleGuide from "StyleGuide";


// const category = [
//   { text: "특허권", value: 0 },
//   { text: "디자인권", value: 1 },
//   { text: "기술자문", value: 2 },
//   { text: "기술상담", value: 3 },
//   { text: "경험", value: 4 },
//   { text: "정보/데이터", value: 5 },
//   { text: "아이디어/노하우", value: 6 },
//   { text: "제품", value: 7 },
// ];

// const FromFieldCard = styled.div`
//   width: 100%;
//   background-color: white;
//   box-shadow: 0px 1px 2px 2px rgba(0, 0, 0, 0.1);
//   padding: 70px;
//   margin-bottom: 30px;
//   border-radius: 3px;
//   @media only screen and (min-width: 1200px) {
//     padding: 70px 100px 70px 100px;
//   }

//   .miniLabel{
//     width:100px;
//     margin-top:10px;
//     margin-bottom:10px;
//   }
// `;

// const FormHeader = styled(Header)`
//   position: relative;
//   padding-right: 2.5rem !important;
//   @media only screen and (max-width: 991px) {
//     padding-bottom: 2rem !important;
//   }
//   &::after {
//     position: absolute;
//     display: inline-block;
//     content: "";
//     height: 20px;
//     width: 100%;
//     border-bottom: 3px solid ${StyleGuide.color.geyScale.scale5};
//     bottom: 10px;
//     left: 0;

//     @media only screen and (min-width: 992px) {
//       width: 1px;
//       display: block;
//       position: absolute;
//       right: 2rem;
//       top: 50%;
//       left: initial;
//       bottom: initial;
//       transform: translateY(-50%);
//       border-bottom: 0;
//       border-right: 3px solid #191919;
//     }
//   }
// `;

// const Label = styled.div`
//   margin: 0 0 0.8rem 0;
//   display: block;
//   color: rgba(0,0,0,.87);
//   font-size: .92857143em;
//   font-weight: 700;
//   text-transform: none;
// `;

// class CreateMaker extends Component {
//   render() {
//     return (
//       <React.Fragment>
//         <div>
//           <form onSubmit={this.onSubmit}>
//             <FromFieldCard>
//               <Grid>
//                 <Grid.Column mobile={16} computer={4}>
//                   <FormHeader as="h2">메이커 정보</FormHeader>
//                 </Grid.Column>
//                 <Grid.Column mobile={16} computer={12}>
//                   <Label>썸네일 등록</Label>
//                   <FormThumbnail
//                     name="thumbnail"
//                     placeholder="썸네일 등록"
//                     getValue={this.onChangeValue}
//                     onChange={() => { this.liveCheck("thumbnail") }}
//                     validates={["Required", "OnlyImages", "MaxFileSize(10000000)"]}
//                   />
//                   <Label>카테고리</Label>
//                   <FormDropBox
//                     name="explanation"
//                     placeholder="메이커 설명을 입력해주세요."
//                     options={category}
//                   />
//                   <Label>설명</Label>
//                   <FormInput
//                     name="explanation"
//                     placeholder="메이커 설명을 입력해주세요."
//                     getValue={this.onChangeValue}
//                   />
//                   <Label>위치</Label>
//                   <FormAddress />
//                   <Label>경력</Label>
//                   <FormExp />
//                   <Label>태그</Label>
//                   <FormTag
//                     placeholder="태그를 입력해주세요(한글10자 영문20자 이내)" />
//                   <Label>보유장비</Label>
//                   <FormCheckBoxnew
//                     items="장비1장비1,장비2장비2,장비3장비3,장비4장비4,장비5장비5,장비6장비6,장비7장비7,장비8장비8,장비9장비9,장비10장비10" />
//                   <div className="miniLabel">추가입력</div><FormTag />

//                   <Label>보유기술</Label>
//                   <FormCheckBoxnew
//                     items="기술1기술1,기술2기술2,기술3기술3,기술4기술4,기술5기술5,기술6기술6,기술7기술7,기술8기술8,기술9기술9,기술10기술10" />
//                   <div className="miniLabel">추가입력</div><FormTag />
//                 </Grid.Column>
//               </Grid>
//             </FromFieldCard>
//           </form>
//           <div style={{ width: "max-content", marginLeft: "auto" }}>
//             <Button color="Primary">등록하기</Button>
//           </div>
//         </div>
//       </React.Fragment>
//     );
//   }
// }

// export default CreateMaker;
