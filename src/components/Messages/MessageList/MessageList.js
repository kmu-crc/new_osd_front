import React, { Component } from 'react'
import styled from 'styled-components'
import FormDataToJson from "modules/FormDataToJson"
// import MessageDetailContainer from "containers/Messages/MessageDetailContainer"
import Socket from "modules/Socket"
import plus from "source/plus_cross_gray.png"
import jina from "source/jina.png"

const List = styled.div`
  margin-top: 14.09px;
  width: 365px;
  height: 738px;
  overflow: hidden;
  &:hover {
    overflow-y: scroll;
  }
`
const TextArea = styled.textarea`
  padding-top: 24.5px;
  padding-right: 40px;
  background-color: #EFEFEF;
  border: none;
  resize: none;
  width: 1131px;
  height: 171.5px;
  font-size: 18px;
  line-height: 27px;
  font-weight: 500;
  text-align: left;
  color: #707070;
  &:focus{
    outline: 1px solid #707070;
  }
`

class MessageList extends Component {
  state = {
    msgId: -1,
    selectId: null,
    selectName: null,
    openMember: false,
    friendList: [],
    render: true,
  }

  async componentDidMount() {
    await this.props.GetMyMsgListRequest(this.props.token)
      .then(async (res) => {
        if (res.MsgList && res.MsgList.length > 0) {
          let arr = [];
          arr = res.MsgList.map(list => { return (list.friend_id) })
          await this.setState({
            friendList: arr
          });
        }
      });
    if (this.props.id && this.props.name) {
      let id = parseInt(this.props.id, 10);
      this.selectMember({
        email: null,
        nick_name: this.props.name,
        uid: id
      })
      Socket.on("reload_msglist", () => {
        console.log("giveit")
        this.setState({ render: true })
      })
    }
  }

  shouldComponentUpdate(nextProps) {
    setTimeout(() => {
      // this.list._reactInternalFiber.child.stateNode.scrollTop = this.list._reactInternalFiber.child.stateNode.scrollHeight;
    }, 100);
    if (JSON.stringify(this.props.id) !== JSON.stringify(nextProps.id)) {
      if (nextProps.id && nextProps.name) {
        let id = parseInt(nextProps.id, 10);
        this.selectMember({
          email: null,
          nick_name: nextProps.name,
          uid: id
        });
      }
    }
    return true;
  }

  getValue = (value) => {
    this.setState({
      openMember: true
    });
    if (!value) {
      this.setState({
        openMember: false
      });
      return;
    }
    this.props.SearchMemberRequest(null, { key: value }, this.props.token);
  }

  selectMember = async (data) => {
    await this.setState({
      render: false
    });
    const index = this.state.friendList.indexOf(data.uid);
    console.log(this.state, this.props.MessageList, index);
    if (index === -1) {
      this.setState({
        selectId: data.uid,
        selectName: data.nick_name,
        openMember: false,
        msgId: -1,
        render: true
      });
    } else {
      this.setState({
        selectId: data.uid,
        selectName: data.nick_name,
        openMember: false,
        msgId: this.props.MessageList[index].uid,
        render: true
      });
    }
  }

  setMsgId = async (group_id, user_id, user_name) => {
    await this.setState({
      msgId: group_id,
      selectId: user_id,
      selectName: user_name,
      openMember: false,
      render: false
    });
    this.setState({
      render: true
    });
    setTimeout(async () => {
      await this.props.GetMyMsgListRequest(this.props.token)
      this.setState({ render: true })
    }, 250)
  }

  comfirmMsgAlarm = (from) => {
    Socket.emit("confirmMsgAlarm", { uid: this.props.userInfo, fromID: from })
  }

  onSubmitForm = async (data) => {
    if (this.state.selectId === null) {
      alert("받는 사람을 지정해주세요.")
      return
    }
    this.props.SendMessageRequest(this.props.token, FormDataToJson(data), this.state.selectId)
      .then(async res => {
        if (res.data && res.data.success === true) {
          await this.props.GetMyMsgListRequest(this.props.token)
          await this.setState({
            msgId: res.data.groupId,
            render: false
          });
        }
        this.setState({
          render: true
        });
        this.props.history.replace("/message");
      })
  }

  render() {
    // const msgList = this.props.MessageList
    const Peer = () => {
      return (
        <div style={{ width: "336px", marginBottom: "30px", display: "flex" }}>
          <div style={{ width: "70px", height: "70px", background: `url(${jina})`, backgroundSize: "cover", backgroundPosition: "center center" }} />
          <div style={{ width: "244px", height: "70px", marginLeft: "22px" }}>
            <div style={{ display: "flex" }}>
              <div style={{ width: "123px", height: "29px", fontSize: "17px", lineHeight: "25px", color: "#707070", textAlign: "left", fontWeight: "500", marginRight: "22px" }}>진아진아진아</div>
              <div style={{ marginTop: "3px", width: "99px", height: "23px", fontSize: "14px", lineHeight: "20px", color: "#707070", textAlign: "left", fontWeight: "300" }}>최근 활동: 8분 전</div>
            </div>
            <div style={{ width: "244px", height: "28px", marginTop: "10px", fontSize: "17px", lineHeight: "25px", color: "#707070", textAlign: "left", fontWeight: "300" }}>아 감사합니다!</div>
          </div>
        </div>
      )
    }
    return (
      <>
        <div style={{ width: "1920px", height: "48px", marginTop: "8px", display: "block", backgroundColor: "#EFEFEF" }}>
          <div style={{
            display: "inline-block", marginLeft: "65px", marginTop: "9px", width: "74px", height: "29px",
            fontFamily: "Noto Sans KR", fontWeight: "500", textAlign: "left", lineHeight: "29px", color: "#707070", fontSize: "20px"
          }}>메시지함</div>
        </div>
        <div style={{ width: "1750px", height: "869px", marginTop: "25px", marginLeft: "85px", marginBottom: "28px", display: "flex" }}>
          <div style={{ width: "445px", backgroundColor: "#EFEFEF", borderRadius: "25px 0 0 25px", paddingLeft: "54px" }}>
            <div style={{ display: "flex" }}>
              <div style={{
                width: "303px", height: "30px", marginTop: "34px", fontFamily: "Noto Sans KR",
                fontWeight: "500", textAlign: "left", fontSize: "20px", lineHeight: "29px", color: "#707070"
              }}>받은 메시지함</div>
              <div style={{
                width: "50.91px", height: "50.91px", marginLeft: "20px", marginTop: "25px",
                background: `url(${plus})`, backgroundSize: "cover", backgroundPosition: "center center"
              }} />
            </div>
            {/* <div style={{ marginTop: "14.09px", width: "336px", height: "738px", overflowY: "auto" }}> */}
            <List>
              <Peer /><Peer /><Peer /><Peer /><Peer /><Peer /><Peer /><Peer /><Peer /><Peer /><Peer /><Peer />
            </List>
            {/* </div> */}
          </div>
          <div style={{ width: "7px", backgroundColor: "#FFFFFF" }}></div>
          <div style={{ width: "1298px", backgroundColor: "#EFEFEF", borderRadius: "0px 25px 25px 0px", paddingLeft: "27px" }}>
            <div style={{ width: "123px", height: "29px", marginTop: "36px", fontWeight: "500", fontSize: "20px", lineHeight: "29px", color: "#707070" }}>진아진아진아</div>
            <div style={{ width: "99px", height: "23px", marginTop: "5px", fontWeight: "300", fontSize: "14px", lineHeight: "20px", color: "#707070" }}>최근 활동: 8분 전</div>
            <div>
              <div style={{ width: "1249px", borderBottom: "1px solid #707070", paddingBottom: "68.5px" }} >
                {/* received */}
                <div style={{
                  marginTop: "311px",
                  width: "571px", height: "57px", backgroundColor: "#FFFFFF", borderRadius: "25px", marginBottom: "4px",
                  paddingTop: "16px", paddingRight: "25px", paddingBottom: "18px", paddingLeft: "20px"
                }}>
                  <div style={{ width: "526px", height: "23px", fontSize: "17px", fontWeight: "500", textAlign: "left", lineHeight: "25px", color: "#707070" }}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                        </div>
                </div>
                {/* sent */}
                <div style={{
                  width: "571px", height: "139px", backgroundColor: "#FFFFFF", borderRadius: "25px"
                  , paddingTop: "18px", paddingRight: "25px", paddingBottom: "16px", paddingLeft: "20px"
                  , marginLeft: "677px",
                }}>
                  <div style={{ width: "526px", height: "105px", fontSize: "17px", fontWeight: "500", lineHeight: "25px", textAlign: "left", color: "#707070" }}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in</div>
                </div>
              </div>
              <div style={{ marginRight: "23px", display: "flex" }}>
                <div style={{ width: "1131px", height: "170px" }}>
                  <TextArea >
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                </TextArea>
                </div>
                <div style={{ width: "117px", height: "170px", marginTop: "1.5px", backgroundColor: "#FFFFFF", borderRadius: "0 0 25px 0", cursor: "pointer" }}>
                  <div style={{ marginTop: "69px", marginLeft: "27px", fontWeight: "500", textAlign: "left", width: "68px", height: "33px", fontSize: "18px", lineHeight: "27px", color: "#707070" }}>
                    전송하기</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default MessageList;