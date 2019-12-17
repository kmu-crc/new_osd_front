import React, { Component } from "react";
import styled, { keyframes } from "styled-components";
import logo from "source/logo.png";
import { setCookie, getCookie, SetSession } from "modules/Sessions";
import { Icon } from "semantic-ui-react";
import Button from "components/Commons/Button";
import ContentBox from "components/Commons/ContentBox";
import StyleGuide from "StyleGuide";
import Socket from "modules/socket";
import host from "config"
import Alarm from "./Alarm"
import NumberFormat from "modules/NumberFormat";

// css styling
const Head = styled.header`
  width: 100%;
  height: 60px;
  top: 0;
  position: fixed;
  z-index: 100;
  color: ${StyleGuide.color.geyScale.scale9};
  background-color: #fff;
  box-shadow: 0 1px 1px 1px #e1e4e6;
  a {
    font-weight: normal;
    &:hover {
      color: ${StyleGuide.color.main.basic};
    }
  }
`;
const keyframe = keyframes`
  0% {
    height: 0px;
  }
  100% {
    height: 75px;
  }
`
const Notification = styled.header`
  animation: ${keyframe} 0.4s ease-in-out;
  visibility: ${props => props.visible};
  width: 100%;
  height: 75px;
  top: 0;
  position: fixed;
  z-index: 100;
  color: ${StyleGuide.color.geyScale.scale9};
  background-color: #F2A3A9;
  .bottom{
    height: 35%;
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 3px 3px 3px 3px;
    color: white;
  }
  .content{
    height: 65%;
    color: white;
    text-align: center;
    padding: 5px 5px 5px 5px;
    button{
      border: none;
      color: white;
      background-color:${StyleGuide.color.main.dark};
    }
  }
  }
`;
const Content = styled(ContentBox)`
  position: relative;
`;

const MainMenu = styled.ul`
  width: 400px;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0;
  margin-left: 100px;
  list-style: none;
`;

const MenuItem = styled.li`
  float: left;
  a {
    line-height: 60px;
  }
  a.active {
    color: ${StyleGuide.color.main.basic};
  }
`;

const SubMenu = styled.div`
  display: block;
  position: absolute;
  width: 300px;
  height: 100%;
  right: 0;
  top: 0;
  line-height: 60px;
  &::after {
    display: block;
    clear: both;
    content: "";
  }
`;

const SubMenuGroup = styled.div`
  .submenu-item {
    & > a,
    & > button {
      margin: 0 1rem;
    }
  }
`;

const SubMenuItem = styled.div`
  float: left;
  position: relative;
  & > input {
    display: block;
    border: 1px solid #e9e9e9;
    border-radius: 2em;
    padding: 0.5em 1em;
    position: absolute;
    top: 50%;
    /* right: 2vw; */
    transform: translate(-100%, -50%);
    -ms-transform: translate(-100%, -50%);
    @media only screen and (max-width: 1200px) {
      display: none;
    }
  }
  & a {
    line-height: 60px;
  }

  & > button {
    position: relative;
    padding: 0;
    border: 0;
    background-color: transparent;
    outline: 0;
  }
`;

const Logo = styled.a`
  height: 60px;
  position: absolute;
  display: block;
  top: 0;
  left: 0;
  width: 60px;
  background-image: url(${logo});
  background-position: 50% 500%;
  background-size: 70px;
`;

const UserInterface = styled.div`
  width: 155px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  &::after {
    display: block;
    content: "";
    clear: both;
  }
`;
const UserItem = styled.div`
  text-align: right;
  & .logOutNavLink {
    margin: 0 0.5rem;
  }
`;

const UserBtn = styled.button`
  color: ${StyleGuide.color.geyScale.scale9};
  text-align: right;
  vertical-align: top;
  /* margin-left: 20px; */
  width: 100%;
  padding: 0;
  height: 60px;
  line-height: 60px;
  padding-left: 55px;
  padding-right: 20px;
  box-sizing: border-box;
  background-color: transparent;
  position: relative;
  border: 0;
  .userIcon {
    position: absolute;
    top: 50%;
    left: 20px;
    transform: translateY(-50%);
    display: block;
    width: 25px;
    height: 25px;
    background-position: center;
    background-size: cover;
    overflow: hidden;
    border-radius: 50%;
  }
  &.active {
    background-color: ${StyleGuide.color.geyScale.scale3};
  }
`;

const UserMenuDimm = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  top: 0;
  left: 0;
  background: 0 0;
`;

const UserMenu = styled.ul`
  display: block;
  position: absolute;
  pointer-events: auto;
  top: 60px;
  right: 0;
  z-index: 1000;
  width: 150px;
  background-color: ${StyleGuide.color.geyScale.scale0};
  border: 1px solid ${StyleGuide.color.geyScale.scale2};
  box-shadow: 1px 0px 3px ${StyleGuide.color.geyScale.scale2};
`;

const UserMenuItem = styled.li`
  text-align: center;
  width: 100%;
  height: 50px;
  border-bottom: 1px solid ${StyleGuide.color.geyScale.scale2};
  box-sizing: border-box;
  line-height: 50px;
  &:hover {
    background-color: ${StyleGuide.color.geyScale.scale2};
  }
  a {
    line-height: 50px;
    display: block;
    width: 100%;
    height: 100%;
    &:hover {
      color: ${StyleGuide.color.geyScale.scale9};
    }
  }
`;

const LogOutBtn = styled.button`
  background-color: transparent;
  border: 0;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  color: ${StyleGuide.color.geyScale.scale9};
`;

const AlarmLabel = styled.div`
  width: 30px;
  height: 30px;
  position: absolute;
  top: 50%;
  left: 50%;
  color: white;
  background-color: red;
  border-radius: 15px;
  line-height: 30px;
  text-align: center;
  font-size: 16px;
  vertical-align: middle;
  padding-top: 2px;
  transform: scale(0.6);
  -ms-transform: scale(0.6);
  transform-origin: 0 0;
  -ms-transform-origin: 0 0;
`;

class Header extends Component {
  state = {
    profile: false,
    active: false,
    keyword: null,
    noti: {},
    notification: null,
    msg: null
  }
  _getNotification = () => {
    return fetch(`${host}/common/notice`, { headers: { "Content-Type": "application/json" }, method: "get" })
      .then((response) => { return response.json() })
      .then((data) => {
        if (data) {
          this.setState({ notification: data })
        }
      })//.catch(err => console.log(err))
  }
  componentDidMount() {
    if (this.props.valid) {
      try {
        Socket.emit("INIT", this.props.userInfo.uid)
        Socket.on("getNoti", noti => {
          this.setState({ noti: noti })
        })
      } catch (err) {
        console.log(err)
      }
    }
    this._getNotification()
  }
  // shouldComponentUpdate(nextProps, nextState) {
  // return this.state.notification != nextState.notification;
  // }
  handleSignOut = async () => {
    SetSession("opendesign_token", null).then(data => {
      console.log("setsession", data)
      this.props.SignOutRequest()
      this.setState({ profile: false, active: false, keyword: null, noti: {}, msg: null })
      this.props.history.push("/")
    })
    console.log(this.props)
  }

  onActive = e => {
    const event = e;
    event.stopPropagation();
    let target = event.currentTarget;
    let active = this.props.isActive;
    if (active === "INIT" || active !== "MENU") {
      active = "MENU";
    } else if (active === "MENU") {
      active = "INIT";
    }
    console.log("onactive", active);
    this.props.SetActive(active, target);
  };

  saveKeyWord = e => {
    const target = e.target;
    const word = target.value;
    let regExp = /^[a-zA-Zㄱ-힣0-9]*$/i;
    if (!word.match(regExp)) {
      alert("특수문자는 사용할 수 없습니다.");
      target.value = "";
      return;
    } else {
      this.setState({
        keyword: word
      });
    }
  };

  submitEnter = e => {
    if (e.keyCode === 13) {
      document.getElementById("searchLink").click();
    }
  };

  limitNickName = str => {
    if (str.length < 6) {
      return str;
    }
    else {
      return str.slice(0, 5) + "...";
    }
  }

  close = (noti) => (e) => {
    var dif = Math.abs(new Date(noti.expiry_time) - new Date()) / (1000 * 60 * 60 * 24)
    this.refs[noti.uid].checked && setCookie('noti_' + noti.uid, 'hidden' + noti.uid, parseInt(dif, 10) + 1)
    let notification = this.state.notification
    for (var i = 0; i < notification.length; i++) {
      if (notification[i].uid === noti.uid) {
        notification[i].visible = "hidden"
      }
    }
    this.setState({ notification: notification })
  }
  render() {
    const LoginNav = () => {
      return (
        <UserInterface>
          <UserItem>
            <UserBtn
              onClick={this.onActive}
              className={`openMenu ${this.props.active === "MENU" && "active"}`}
            >
              <div
                className="userIcon"
                style={{
                  backgroundImage: `url(${this.props.userInfo.thumbnail &&
                    this.props.userInfo.thumbnail.s_img}), url(${logo})`
                }}
                onError={this.noneImage}
              />
              {this.limitNickName(this.props.userInfo.nickName)}
            </UserBtn>
            <UserMenuDimm
              style={{
                display: `${this.props.active === "MENU" ? "block" : "none"}`
              }}
            >
              <Content>
                <UserMenu>
                  <UserMenuItem>
                    <a href="/myPage">
                      <Icon name="user" />
                      마이페이지
                    </a>
                  </UserMenuItem>
                  {/* <UserMenuItem>
                    <a href="/message">
                      <Icon name="envelope" />
                      메시지함
                    </a>
                  </UserMenuItem> */}
                  <UserMenuItem>
                    <LogOutBtn onClick={this.handleSignOut}>
                      <Icon name="log out" />
                      로그아웃
                    </LogOutBtn>
                  </UserMenuItem>
                </UserMenu>
              </Content>
            </UserMenuDimm>
          </UserItem>
        </UserInterface>
      );
    };

    const LogOutNav = () => {
      return (
        <UserInterface>
          <UserItem>
            <a href="/signin" className="logOutNavLink">로그인</a>
          </UserItem>
          <UserItem>
            <a href="/signup" className="logOutNavLink">회원가입</a>
          </UserItem>
        </UserInterface>
      );
    };
    const notice = this.state.notification
    const design_menu_bold = this.props.location.pathname === "/design" || this.props.match.path.indexOf("/design/") === 0 || this.props.match.path.indexOf("/designDetail") !== -1 ? "active" : "";
    const group_menu_bold = this.props.location.pathname === "/maker" || this.props.match.path.indexOf("/makerDetail") !== -1 ? "active" : "";
    const designer_menu_bold = this.props.location.pathname === "/designer" || this.props.match.path.indexOf("/designer/") === 0 || this.props.match.path.indexOf("/designerDetail") !== -1 ? "active" : "";
    return (
      <Head>
        {notice && notice.length > 0 &&
          notice.map(notifi => {
            if (getCookie('noti_' + notifi.uid))
              return;
            else
              return <Notification visible={notifi.visible || "visible"} key={notifi.uid} >
                <div className="content">
                  <div>
                    {notifi.content}<br />
                  </div>
                  <div className="bottom">
                    <div >
                      <input type="checkbox" name={notifi.uid} ref={notifi.uid} /> 그만보기
                      &nbsp;<button type="button" onClick={this.close(notifi)} >닫기</button>
                    </div>
                  </div>
                </div>
              </Notification>
          })}
        <Content>
          <MainMenu>
            <Logo href="/" />
            <MenuItem><a href="/design" className={design_menu_bold}>디자인</a></MenuItem>
            <MenuItem><a href="/designer" className={designer_menu_bold}>디자이너</a></MenuItem>
            <MenuItem><a href="/maker" className={group_menu_bold}>메이커</a></MenuItem>
            <MenuItem><a href="/createdesign"><Button size="small" round={true} color="Solid">상품 등록</Button></a></MenuItem>
          </MainMenu>
          <SubMenu>
            <SubMenuGroup>
              <SubMenuItem className="submenu-item">
                <input
                  onChange={this.saveKeyWord}
                  onKeyDown={this.submitEnter}
                />
                <a
                  href={`/search/null/null/${this.state.keyword}`}
                  id="searchLink"
                >
                  <Icon name="search" />
                </a>
              </SubMenuItem>
              {this.props.valid ? (
                <div>
                  <SubMenuItem className="submenu-item">
                    <Alarm
                      history={this.props.history}
                      token={this.props.token}
                      open={this.openAlarmHandler}
                      close={this.onAlarmHandler}
                      noti={this.state.noti}
                      valid={this.props.valid}
                      uid={this.props.userInfo.uid}
                      socket={Socket}
                    />
                  </SubMenuItem>
                  <SubMenuItem className="submenu-item">
                    <a href="/message">
                      <Icon name="envelope" />
                      {this.state.noti.countMsg > 0 && (
                        <AlarmLabel>{NumberFormat(this.state.noti.countMsg)}</AlarmLabel>
                      )}
                    </a>
                  </SubMenuItem>
                </div>
              ) : null}
            </SubMenuGroup>
            <SubMenuItem>
              {this.props.valid ? <LoginNav /> : <LogOutNav />}
            </SubMenuItem>
          </SubMenu>
        </Content>
      </Head>
    )
  };
}

export default Header;
