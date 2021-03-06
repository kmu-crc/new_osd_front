import React, { Component } from 'react'
import { Modal } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
// import { SetSession } from "modules/Sessions"
// import close from "source/close_white.png"
const MainBox=styled.form`
    width:64%;
    margin-left:18%;
    margin-top:107px;
    .itemBox{
        margin-top:30px;
        .normalBox{
            display:flex;            
            margin-top:16px;
        }
        .normalText{
            margin-left:21px;
            margin-top:3px;
            font-size:17px;
            font-weight:300;
            color:#707070;
            cursor:pointer;
        }
        .redBoldText{
            position:absolute;
            right:250px;
            font-size:20px;
            font-weight:500;
            color:#FF0000;
            line-height:29px;
            text-align:left;
            cursor:pointer;
            text-decoration:underline;
        }

    }
    .subItemBox{
        margin-top:65px;
        height:29px;
        .redUnderlineText{
            position:absolute;
            right:250px;
            font-size:20px;
            font-weight:500;
            color:#FF0000;
            line-height:29px;
            text-align:left;
            cursor:pointer;
            text-decoration:underline;
        }
        .blackBoldText{
            position:absolute;
            right:340px;
            font-size:20px;
            font-weight:500;
            color:#707070;
            line-height:29px;
            text-align:left;
            cursor:pointer;
        }
    }
    .titleLabel{
        width:300px;
        height:29px;
        margin-left:0px;
        font-size:20px;
        font-weight:500;
        color:#707070;
        line-height:29px;
        text-align:left;
    }
    .subLabel{
        width:500px;
        height:29px;
        margin-top:10px;
        font-size:17px;
        font-weight:200;
        color:#707070;
        line-height:29px;
        text-align:left;
    }
`
const InputText = styled.input.attrs({type:'text'})`
    width:708px;
    height:48px;
    margin-top:16px;
    padding-left:20px;
    font-size:20px;
    font-weight:300;
    color:#707070;
    background-color:#EFEFEF;
    outline:none;
    border:none;
    border-radius:15px;
    
`
const CustomModal = styled(Modal)`
    min-width: 1200px;
    height: 900px;
    border-radius: 35px; 
    font-family: Noto Sans KR;
    .title {
        padding: 0 0;
        margin: 0 auto;
        margin-top: 44px;
        text-align: center;
        line-height: 37px;
        color: #FF0000;
        font-size: 25px;
        font-weight: 500;
        width: 450px;
        height: 37px;
    }
`
const SmallCustomModal = styled(Modal)`
    min-width: 1200px;
    height: 700px;
    border-radius: 35px; 
    font-family: Noto Sans KR;
    .title {
        width: 450px;
        height: 37px;
        padding: 0 0;
        margin: 0 auto;
        margin-top: 144px;
        font-size: 25px;
        font-weight: 500;
        color: #FF0000;
        text-align: center;
        line-height: 37px;
    }
`
class SignInModal extends Component {
    constructor(props)
    {
        super(props);
        this.state = { email: "", password: "" ,findPW:false}
        this.findIDPW = this.findIDPW.bind(this);
        this.handlesubmitEnter=this.handlesubmitEnter.bind(this);

    }
    signin = () => {

        const { email, password } = this.state
        
        // ---------------- 예외처리
        let checkedMail = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
        if (email === "")
        {
            alert("아이디를 입력해주세요");
            return;
        }
        else if(checkedMail.test(this.state.email)===false)
        {
            alert("이메일 형식이 올바르지 않습니다");
            return;
        }
        else if(password==="")
        {
            alert("비밀번호를 입력해주세요");
            return;
        } 
        // -----------------------

        this.props.signinrequest({ email: email, password: password })
            .then(res => {
                console.log("cap", res)
                if (res.type === "opendesign/authentication/AUTH_SIGNIN_SUCCESS") {
                    // alert('로그인에 성공하였습니다.') // SetSession("opendesign_token",res.token)
                    this.props.signin()
                }
                else {
                    alert('로그인에 실패하였습니다');
                    this.setState({password:""})
                    //this.onClose()
                }
            })
    }
    async checkEmail()
    {
        const data = {email:this.state.email}
        let returnvalue = true;
        await this.props.CheckEmailRequest(data).then(
            (res)=>{
                console.log(res, data);
                if(res.checkEmail===false)
                {                   
                    returnvalue = false;
                }
            }
        );
        console.log("qwer",returnvalue);
        return returnvalue;
    }
    findIDPW()
    {
        this.setState({findPW:true});
    }
    onClose = () => { this.props.close() }

    handlesubmitEnter = (e) => {
        if (e.keyCode === 13) {
          this.signin();
        }
    }
    
    handeEmailChange = (e) => {
        this.setState({ email: e.target.value })
    }
    handlePasswordChange = (e) => {
        this.setState({ password: e.target.value })
    }
    onBack(){
        window.location.href="/SignIn";
    }
    onSubmit = async e => {
        const data = {email:this.state.email};

        let checkedMail = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

        if(this.state.email === "")
        {
            alert("아이디를 입력해주세요!");
            return;
        }
        else if(checkedMail.test(this.state.email)===false)
        {
            alert("올바른 양식이 아닙니다!");
            return;
        }
        else if(await this.checkEmail()===true)
        {      
            alert("등록되지 않은 아이디입니다.");
            return;
        }

        e.preventDefault();
            this.props.FindPwRequest(data);
            this.setState({loading:true});

            alert("해당 아이디로 메일 전송이 완료되었습니다!");      
            this.props.close();      
      };
   
    render() {
        const { open } = this.props
        const { email, password } = this.state
        return (
            <React.Fragment>
                {this.state.findPW === false?
            <CustomModal  open={open} onClose={this.onClose}>
                <Modal.Content>
                    <div className="title">OPEN SOURCE DESIGN</div>
                    <MainBox onSubmit={this.signin}>
                        <div className="itemBox">
                                    <div className="titleLabel">아이디</div>
                                    <InputText onKeyDown={this.handlesubmitEnter} name='email' type='text' value={email || ""} 
                                    onChange={this.handeEmailChange} placeholder="아이디(이메일주소)를 입력하세요(ex. opensrcdesign@gmail.com)." />
                        </div>
                        <div className="itemBox">
                                    <div className="titleLabel">비밀번호</div>
                                    <InputText onKeyDown={this.handlesubmitEnter} name='password' type='password' value={password || ""} 
                                    onChange={this.handlePasswordChange}  placeholder="비밀번호를 입력하세요." />
                        </div>

                        <div className="subItemBox">
                            <div className="redUnderlineText" onClick={this.signin}>로그인</div>
                        </div>
                        <div className="subItemBox"> 
                            <div className="titleLabel" style={{cursor:"pointer"}} onClick={this.findIDPW}>비밀번호 찾기</div>
                        </div>
                        <div className="subItemBox">
                        <div className="titleLabel">아직 계정이 없으신가요?<br />
                        <Link style={{ color: "#FF0000" ,lineHeight:"3em"}} to="/signup" onClick={this.onClose}>회원가입</Link>
                        </div>
                        </div>
                    </MainBox>
                </Modal.Content>
            </CustomModal>
            :
            //< ================  비밀번호 찾기 ===================== >
            <SmallCustomModal open={open} onClose={this.onClose}>
            <Modal.Content>
                <div className="title">OPEN SOURCE DESIGN</div>
                <MainBox onSubmit={this.signin}>
                    <div className="titleLabel">비밀번호 찾기</div>
                    <div className="subLabel">비밀번호를 찾고자하는 아이디를 입력해주세요</div>
                        <InputText name='email' value={email || ""} onChange={this.handeEmailChange}  placeholder="아이디(이메일주소)를 입력하세요(ex. opensrcdesign@gmail.com)." />
                    <div className="subItemBox">
                    <div className="blackBoldText" onClick={this.onBack}>뒤로</div>
                    <div className="redUnderlineText" onClick={this.onSubmit}>전송</div>
                    </div>
                </MainBox>
            </Modal.Content>
            </SmallCustomModal>
                }
            </React.Fragment>
        )
    }
}


export default SignInModal