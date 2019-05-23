import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import styled from "styled-components";
import eximg from "source/myPage.jpeg";
import { Icon } from "semantic-ui-react";
import StyleGuide from "StyleGuide";
import DateFormat from "modules/DateFormat";
import NumberFormat from "modules/NumberFormat";
import TextFormat from "modules/TextFormat";

// css styling

const Groupli = styled.li`
  width: 100%;
  margin: 0 auto 2rem;
  font-size: 13px;
  border-radius: 3px 3px 3px 3px;
  overflow: hidden;
  box-shadow: 0px 2px 10px 2px rgba(0,0,0,0.1);
  background-color: #fff;
  list-style-type: none;
  box-sizing: border-box;
  padding: 10px;
`;

const ImgPart = styled.div`
  width: 100%;
  height: 140px;
  overflow: hidden;
  background-size: cover;
  background-position: center;
  & img {
    width: 100%;
    height: 100%;
  }
`;

const TextPart = styled.div`
  padding: 10px 10px;
  font-size: ${StyleGuide.font.size.paragraph};
  & .owner {
    line-height: 1.35;
    margin: 5px 0;
    color: ${StyleGuide.color.geyScale.scale6};
  }
  & .title {
    font-size: 16px;
    font-weight: bold;
    line-height: 20px;
    height: 20px;
    color: ${StyleGuide.color.geyScale.scale7};
  }
  & .cate {
    color: ${StyleGuide.color.geyScale.scale6};
    font-size: ${StyleGuide.font.size.small};
  }
`;

const Count = styled.div`
  background-color: #fff;
  padding: 5px 10px;
  color: ${StyleGuide.color.geyScale.scale6};
  border-top: 1px solid ${StyleGuide.color.geyScale.scale1};
  font-weight: 400;
  font-size: 12px;
  & div {
    float: left;
    padding-right: 10px;
  }
  &::after{
    display: block;
    content: "";
    clear: both;
  }
`;


class Group extends Component {
  refresh = (id) => {
    if (this.props.rerender) {
      window.location.href(`/groupDetail/${id}`);
    } else {
      return;
    }
  }

  render() {
    let group = this.props.data;

    return (
      <NavLink to={"/groupDetail/" + group.uid} onClick={() => this.refresh(group.uid)}>
        <Groupli>
          <ImgPart style={group.thumbnailUrl ? { backgroundImage: `url(${group.thumbnailUrl.m_img})` } : { backgroundImage: `url(${eximg})` }} />
          <TextPart>
            <div className="title"><TextFormat txt={group.title} /></div>
            <div className="owner" style={{ display: "flex" }}><TextFormat txt={group.userName} chars={10} /> 님의 그룹</div>
            <div className="cate">
              최근 업데이트 {DateFormat(group.child_update_time)}
            </div>
          </TextPart>
          <Count>
            <div>
              <Icon name="window restore" /> {group.group ? NumberFormat(group.group) : 0}
            </div>
            <div>
              <Icon name="signup" /> {group.design ? NumberFormat(group.design) : 0}
            </div>
            <div>
              <Icon name="heart" /> {group.like ? NumberFormat(group.like) : 0}
            </div>
          </Count>
        </Groupli>
      </NavLink>
    );
  }
}

export default Group;
