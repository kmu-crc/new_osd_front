import React, { Component } from 'react'
import styled from 'styled-components'
import SignInModal from '../SignNav/SignInModal'

const UserMenu = styled.div`
  display: ${props => props.display};
  position: absolute;
  pointer-events: auto;
  top: ${props => props.top + "px"};
  left: ${props => props.left + "px"};
  z-index: 904;
  height: 154px;
  width: 150px;
  border-radius: 15px;
  border: 1px solid #FF0000;
  background-color: #FFFFFF;
  color: #707070;
  font-size: 20px;
  font-weight: 500;
  padding: 15px;
`;
// border: 1px solid blue;
const UserMenuItem = styled.div`
  cursor: pointer;
  width: 100%;
  padding-top: 5px;
  padding-bottom: 32px;
  padding-left: 13px;
  padding-right: 13px;
  line-height: 30px;
  text-align: left;
  &:hover {}
`;

const userinfo = { nickname: "진아진아진아", thumbnail: "" }
class SignNav extends Component {
    state = { is_signed: false, signin_modal: false, user_popup: null }
    openModal = () => { this.setState({ signin_modal: true }) }
    openUserMenu = (event) => {
        document.addEventListener("mousedown", this.handleClickOutside)
        const top = event.clientY + 10
        const left = event.clientX - (event.clientX + 75 > window.screenLeft ? 150 : 75)
        this.setState({ user_popup: { display: "block", top: top, left: left } })
    }
    closeModal = () => { this.setState({ signin_modal: false }) }
    signin = (success) => {
        this.setState({ is_signed: success })
        this.closeModal()
    }
    signout = () => {
        // todo: request signout and reload app.
        this.setState({ user_popup: null, is_signed: false })
    }
    gotoMyPage = () => {
        this.setState({ user_popup: null })
    }

    myRef = React.createRef()
    handleClickOutside = e => {
        if (this.myRef.current === null) return

        if (!this.myRef.current.contains(e.target)) {
            this.setState({ user_popup: null })
            document.removeEventListener("mousedown", this.handleClickOutside)
        }
    }
    render() {
        const info = userinfo
        const thm_url = "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/8c591282228133.5d1a240959aed.jpg"
        return (
            <>
                {this.state.user_popup &&
                    <UserMenu ref={this.myRef} display={"block"} top={this.state.user_popup.top} left={this.state.user_popup.left}>
                        <UserMenuItem onClick={this.gotoMyPage}>마이페이지</UserMenuItem>
                        <UserMenuItem onClick={this.signout}>로그아웃</UserMenuItem>
                    </UserMenu>}
                {this.state.signin_modal && <SignInModal open={this.state.signin_modal} signin={this.signin} close={this.closeModal} />}
                {this.state.is_signed
                    ? (<div onClick={this.openUserMenu} style={{ margin: "0", padding: "0", cursor: "pointer", display: "flex" }}>
                        <div style={{ marginRight: "10px", borderRadius: "50%", backgroundPosition: "center cetner", backgroundSize: "cover", backgroundColor: "#D6D6D6", width: "30px", height: "30px", backgroundImage: `url(${info.thumbnail}), url(${thm_url})` }} />{info.nickname}</div>)
                    : (<div onClick={this.openModal} style={{ margin: "0", padding: "0", cursor: "pointer" }}>로그인</div>)}
            </>
        )
    }
}

export default SignNav