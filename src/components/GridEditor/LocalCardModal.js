import React, { Component } from 'react';
import { Modal } from 'semantic-ui-react';
import styled from 'styled-components';
import arrow from "source/arrow.svg";
import Cross from "components/Commons/Cross";
import DateFormat from "modules/DateFormat";
import { FormThumbnailEx } from "components/Commons/FormItems";
import { ValidationGroup } from "modules/FormControl";
import TextFormat from 'modules/TextFormat';
import Loading from "components/Commons/Loading";
import { InputContent } from "components/Commons/InputItem";
// import {confirmAlert} from "react-confirm-alert";
// import {options,optionsAlter} from "components/Commons/InputItem/AlertConfirm"
import { alert } from "components/Commons/Alert/Alert";
import { confirm } from "components/Commons/Confirm/Confirm";
const ContentBorder = styled.div`
    height: 29px;
    font-family: Noto Sans KR;
    font-size: 20px;
    color: #707070;
    font-weight: 500;
    line-height: 29px;
    margin-left: 50px;
    margin-top: 30px;
    padding-right: 25px;
    .border-line {
        border-bottom: 1px solid #707070;
    }
`;
//const CommentWrapper = styled.div`
//    .comment-title {
//        margin-left: 45px;
//    }
//    .comment-body{
//        margin-left: 52px;
//        margin-top: 15px;
//        color: #707070;
//        font-size: 20px;
//        font-weight: 500;
//        font-family: Noto Sans KR;
//        line-height: 29px;
//    }
//`;
const CardDialog = styled(Modal)`
    margin-top: 50px !important;
    margin-bottom: 50px !important;
    height: max-content;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    box-shadow: 0px 3px 6px #000000;
    border: 1px solid #EFEFEF;
    border-radius: 10px;
    opacity: 1;
    ::-webkit-scrollbar {
        position: absolute;
        width: 3.9px;
    }
    ::-webkit-scrollbar-thumb {
        background: rgba(112, 112, 112, 0.45) !important;
    } 
    .content{
        padding: 45px;
        margin-left: auto;
        line-height: 17px;
    }
    .prevPane {
        width: 115px;
        height: 813.28px;
        position: absolute;
        left: 0%;
        margin-left: -195px;
        margin-top: 75.7px;
        border-radius: 0px 10px 10px 0px;
        background-color: #FFFFFF;
    }
    .prevArrow {
        width: 14px;
        height: 47px;
        position: absolute;
        left: 0%;
        margin-top: 409.81px;
        margin-left: -47px;
        background-image: url(${arrow});
        background-repeat: no-repeat;
        background-size: cover;
    }
    .nextPane {
        width: 115px;
        height: 813.28px;
        position: absolute;
        left: 100%;
        margin-left: 80px;
        margin-top: 75.7px;
        border-radius: 10px 0px 0px 10px;
        background-color: #FFFFFF;
    }
    .nextArrow {
        width: 14px;
        height: 47px;
        position: absolute;
        left: 100%;
        margin-top: 409.81px;
        margin-left: 33px;
        background-image: url(${arrow});
        -webkit-transform: rotate(180deg);
        transform: rotate(180deg);
        background-repeat: no-repeat;
        background-size: cover;
    }
    .close-box {
        width: max-content;
        cursor: pointer;
        position: relative;
        margin-left: auto;
        margin-right: 10px;
        margin-top: 10px; 
    }
    .content-wrapper {
        position: relative;
        .card-header-first {
            display: flex;
            justify-content: space-between;
            height: 29px;
            margin-top: 30px;
            margin-left: 52px;
            .header-title {
                font-family: Noto Sans KR;
                font-size: 20px;
                color: #707070;
                font-weight: 500;
                line-height: 29px;
            }
            .header-edit-button {
                font-family: Noto Sans KR;
                font-size: 17px;
                color: #707070;
                font-weight: 900;
                line-height: 29px;
                margin-right: 75px;
                .edit-btn {
                    border: none;
                    background: none;
                    width: max-content;
                    height: 40px;
                    line-height: 40px;
                    color: #FF0000;
                    padding-bottom: 1.5px;
                    border-bottom: 1.5px solid #FF0000;
                    font-size: 20px;
                    font-weight: 500;
                    font-family: Noto Sans KR;
                    text-align: left;
                    cursor: pointer;
                }
                .cancel-btn {
                    margin-left: 25px;
                    border: none;
                    background: none;
                    width: max-content;
                    height: 40px;
                    line-height: 40px;
                    color: #707070;
                    padding-bottom: 1.5px;
                    border-bottom: 1.5px solid #707070;
                    font-size: 20px;
                    font-weight: 500;
                    font-family: Noto Sans KR;
                    text-align: left;
                    cursor: pointer;
                }
            }
        }
        .card-header-second {
            width: 100%;
            height: 29px;
            display: flex;
            justify-content: flex-start;
            padding-left: 52px;
            margin-top: 30px;
            .contents {
                font-size: 20px;
                color: #707070;
                font-weight: 300;
                font-family: Noto Sans KR;
                line-height: 29px;   
            }
            .nick-name {
                width: max-content;
                margin-left: auto;
                margin-right: 5px;
                font-size: 20px;
                color: #707070;
                font-weight: 300;
                font-family: Noto Sans KR;
                line-height: 29px;   
            }
            .update-time {
                width: max-content;
                margin-right: 75px;
                color: #707070;
                font-size: 17px;
                font-weight: 300;
                font-family: Noto Sans KR;
                line-height: 29px;
            }
        }
    }

`
const EditCardHeaderContainer = styled.div`
    .edit-header-container {
        display: flex;
        margin-top: 15px;
        margin-left: 45px;
        width: max-content;
        .edit-card-info {
            width: max-content;
            height: 29px;
            font-size: 20px;
            font-weight: 500;
            font-family: Noto Sans KR;
            text-align: left;
            line-height: 40px;
            color: #707070;
        }
    }
    .edit-header-thumbnail {
        display: flex;
        margin-top: 25px;
        margin-left: 65px;
        .thumbnail-txt {
            width: 97px;
            height: 29px;
            font-size: 20px;
            font-weight: 500;
            font-family: Noto Sans KR;
            text-align: left;
            line-height: 40px;
            color: #707070;
        }

    }
    .edit-header-title {
        display: flex;
        margin-top: 15px;
        margin-left: 65px;
        .title-txt {
            width: 97px;
            height: 29px;
            font-size: 20px;
            font-weight: 500;
            font-family: Noto Sans KR;
            text-align: left;
            line-height: 40px;
            color: #707070;
        }
        .title-input-container{
            margin-left: 31px;
            width: 500px;
            height: 56px;
            background-color: #EFEFEF;
            border-radius: 5px;
        }
        .title-input-style{
            border-radius: 5px;
            width: 100%;
            border: none;
            background: transparent;
            font-size: 20px;
            font-weight: 500;
            color: #707070;
            height: 100%;
            padding: 16px 23px 16px 23px;
        }
    }
    .edit-header-description{
        display: flex;
        margin-top: 15px;
        margin-left: 65px;
        .description-txt{
            width: 97px;
            height: 29px;
            font-size: 20px;
            font-weight: 500;
            font-family: Noto Sans KR;
            text-align: left;
            line-height: 40px;
            color: #707070;
        }
        .description-input-container{
            margin-left: 31px;
            width: 505px;
            height: 56px;
            background-color: #EFEFEF;
            border-radius: 5px;
        }
        .description-input-style{
            border-radius: 5px;
            width: 100%;
            border: none;
            background: transparent;
            font-size: 20px;
            font-weight: 500;
            color: #707070;
            height: 100%;
            padding: 16px 23px 16px 23px;
        }
    }
    .edit-header-button-container {
        width: max-content;
        margin-left: auto;
        margin-right: 25px;
        .edit-header-submit-button {
            border: none;
            background: none;
            width: max-content;
            height: 40px;
            line-height: 40px;
            color: #FF0000;
            padding-bottom: 1.5px;
            border-bottom: 1.5px solid #FF0000;
            font-size: 20px;
            font-weight: 500;
            font-family: Noto Sans KR;
            text-align: left;
            cursor: pointer;
        }
        .edit-header-cancel-button {
            margin-left: 10px;
            border: none;
            background: none;
            width: max-content;
            height: 40px;
            line-height: 40px;
            color: #707070;
            padding-bottom: 1.5px;
            border-bottom: 1.5px solid #707070;
            font-size: 20px;
            font-weight: 500;
            font-family: Noto Sans KR;
            text-align: left;
            cursor: pointer;
        }
    }
`;
//const BlankSpace = styled.div`
//    width: 250px;
//    height: 250px;
//    background-color: "white";
//    borderRadius: 15px
//`;
const ButtonContainer = styled.div`
  margin-bottom: 35px;
  margin-left: auto;
  margin-right: auto;
  .content-edit-wrapper {
    width: max-content;
    margin-left: auto;
    margin-right: auto;
  }
  .content-edit-button {
    width: max-content;
    padding: 7px;
    padding-bottom: 1px;
    border: none;
    border-bottom: 1px solid red;
    color: #FF0000;
    font-size: 20px;
    font-weight: 500;
    background: none;
    cursor: pointer;
  }
  .content-add-wrapper {
    width: max-content;
    margin-left: auto;
    margin-right: auto;
  }
  .content-add-button {
    width: max-content;
    border: none;
    padding: 7px;
    padding-bottom: 1px;
    border-bottom: 1px solid red;
    color: #FF0000;
    font-size: 20px;
    font-weight: 500;
    background: none;
    cursor: pointer;
  }
`;
const EditorBottonWrapper = styled.div`
    width: max-content;
    margin: auto;
    margin-top: 10px;
    padding: 15px;
    background: #FFFFFF;
    border-radius: 25px;
    z-index: 907;
    .submit {
      margin-left: 5px;
      background: none;
      border: none;
      width: max-content;
      padding: 7px;
      padding-bottom: 1px;
      color: #FF0000;
      font-size: 20px;
      font-weight: 500;
      cursor: pointer;
      :hover{
        background-color: #DDD;
        border-radius: 25px;
      }
    }
    .cancel {
      margin-left: 10px;
      background: none;
      border: none;
      width: max-content;
      padding: 7px;
      padding-bottom: 1px;
      color: #707070;
      font-size: 20px;
      font-weight: 500;
      cursor: pointer;
      :hover{
        background-color: #DDD;
        border-radius: 25px;
      }
    }
`;

export class LocalCardModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false, scroll: false, edit: false, hook: false,
            title: this.props.title || "", content: this.props.content || "",
            card_content: {
                deleteContent: [], newContent: [], updateContent: []
            }
        };
        this.onSave = this.onSave.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.onClose = this.onClose.bind(this);
        this.onChangeValueThumbnail = this.onChangeValueThumbnail.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeContent = this.onChangeContent.bind(this);
        this.saveTemporary = this.saveTemporary.bind(this);
        this.submit = this.submit.bind(this);
    };
    async handleCancel(obj) {
        if (obj.length > 0 || this.state.title !== "" || this.state.content !== "") {
            if (!await confirm("작업중인 데이터는 저장되지 않습니다. 그래도 하시겠습니까?")) {
                return;
            }
        }
        this.onClose();
    };
    onClose() {
        this.props.close();
    };
    async onChangeValueThumbnail(data) {
        let obj = {};
        if (data.target) {
            obj[data.target.name] = data;
            await this.setState(obj);
        }
    };
    onChangeTitle(event) {
        if (event.target) {
            this.setState({ title: event.target.value });
        }
    };
    onChangeContent(event) {
        if (event.target) {
            this.setState({ content: event.target.value });
        }
    };
    async saveTemporary(obj) {
        // console.log("zlzl change", obj);
        // if exists

        // const newObj = { deleteContent: [], newContent: obj.content, updateContent: [] };
        // await this.setState({ card_content: newObj });
        // this.submit();
    };
    async submit() {
        if (!this.state.title || this.state.title === "") {
            await alert("컨텐츠의 제목을 입력하세요.");
            await this.setState({ loading: false });
            return;
        }
        // new card
        let files = null;
        await ValidationGroup(this.state, false)
            .then(async data => {
                files = await data && data.files;
                let thumbnail = files ? { img: files && files[0].value, file_name: files && files[0].name } : null;
                this.props.return && this.props.return({
                    card: { title: this.state.title, order: this.props.cardOrder, boardId: this.props.boardId },
                    content: {
                        title: this.state.title, thumbnail: thumbnail, content: this.state.content,
                        data: {
                            deleteContent: this.state.card_content.deleteContent,
                            newContent: this.state.card_content.newContent,
                            updateContent: this.state.card_content.updateContent
                        }
                    }
                })
                await this.setState({ loading: false });
                this.onClose();
            }
            );
    };
    async onSave() {
        await this.submit();
    };
    async onCancel(event) {
        // confirmAlert(options("모든 내용이 저장되지 않고 닫힙니다. 그래도 계속 진행하시겠습니까?"
        // ,()=>{
        //         this.setState({
        //         loading: false, scroll: false, edit: false, hook: false,
        //         title: "", content: "",
        //         card_content: {
        //             deleteContent: [], newContent: [], updateContent: []
        //         }
        //     })
        // }
        // ,event));
        // const confirm = window.confirm("모든 내용이 저장되지 않고 닫힙니다. 그래도 계속 진행하시겠습니까?");
        if (await confirm("모든 내용이 저장되지 않고 닫힙니다. 그래도 계속 진행하시겠습니까?")) {
            this.setState({
                loading: false, scroll: false, edit: false, hook: false,
                title: "", content: "",
                card_content: {
                    deleteContent: [], newContent: [], updateContent: []
                }
            })
        }
    };

    render() {
        const imgURL = this.props.card && this.props.card.first_img == null ? null : this.props.card.first_img.l_img;
        const { card } = this.props;
        // const { isTeam /*, edit*/ } = this.props;

        console.log("local-card-modal:", this.props);

        return (<React.Fragment>
            <CardDialog open={this.props.open} onClose={this.onClose}>
                {this.state.loading && <Loading />}

                <div className="close-box" onClick={this.onClose} >
                    <Cross angle={45} color={"#000000"} weight={3} width={33} height={33} />
                </div>
                <div className="content-wrapper" >
                    {this.state.edit === false
                        ? <React.Fragment>
                            <div className="card-header-first">
                                <div className="header-title">{card.title}</div>
                                <div className="header-edit-button">
                                    {this.props.edit ?
                                        <React.Fragment>
                                            <button className="edit-btn" onClick={() => this.setState({ edit: !this.state.edit, title: card.title, content: card.content })} >수정하기</button>
                                            <button className="cancel-btn" onClick={(event) => this.removeCard(event)} >삭제하기</button>
                                        </React.Fragment> : undefined}
                                </div>
                            </div>
                            <div className="card-header-second" >
                                <div className="contents"><TextFormat txt={card.content || ""} chars={25} /></div>
                                <div className="nick-name">{card.nick_name}</div>
                                <div className="update-time">(업데이트&nbsp;:&nbsp;{DateFormat(card.update_time)})</div>
                            </div>
                        </React.Fragment>

                        : <React.Fragment>
                            <EditCardHeaderContainer>
                                <div className="edit-header-container">
                                    <div className="edit-card-info">컨텐츠 정보 수정</div>
                                </div>
                                <div className="edit-header-thumbnail">
                                    <div className="thumbnail-txt">이미지</div>
                                    <FormThumbnailEx style={{ width: "210px", height: "210px", marginLeft: "30px", borderRadius: "10px", backgroundColor: "#EFEFEF" }}
                                        name="thumbnail" image={imgURL} placeholder="썸네일 등록" getValue={this.onChangeValueThumbnail} validates={["OnlyImages", "MaxFileSize(10000000)"]} />
                                </div>
                                <div className="edit-header-title">
                                    <div className="title-txt">제목</div>
                                    <div className="title-input-container">
                                        <input className="title-input-style" name="title" onChange={this.onChangeTitle} value={this.state.title} maxLength="20" placeholder="제목을 입력해주세요." />
                                    </div>
                                </div>
                                <div className="edit-header-description">
                                    <div className="description-txt">설명</div>
                                    <div className="description-input-container">
                                        <input className="description-input-style" name="content" onChange={this.onChangeContent} value={this.state.content} maxLength="1000" placeholder="설명을 입력해주세요." />
                                    </div>
                                </div>
                            </EditCardHeaderContainer>
                        </React.Fragment>}

                    <ContentBorder><div className="border-line" /></ContentBorder>
                    <div className="content" >
                        <InputContent content={card.contents} returnState={this.saveTemporary} />
                    </div>

                    <ButtonContainer >
                        <EditorBottonWrapper>
                            <button onClick={this.onSave} className="submit" type="button">
                                <i className="icon outline save" />저장하기</button>
                            <button onClick={this.onCancel} className="cancel" type="button">
                                <i className="icon trash" />취소하기</button>
                        </EditorBottonWrapper>
                    </ButtonContainer>
                </div>


            </CardDialog>

        </React.Fragment>)
    }
}
