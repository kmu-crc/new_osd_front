import React, { Component } from 'react';
import { CreateStep } from "./GridTools";
import styled from 'styled-components';
import CardModal from "./CardModal";
import NewStepModal from "./NewStepModal";
import EditStepModal from "./EditStepModal";
import NewCardModal from "./NewCardModal";
import { ReactHeight } from 'react-height';
import arrow from "source/arrow.svg";
import SortableDesignSteps from "./SortableDesignSteps";
import osdcss from "StyleGuide";
import { alert } from "components/Commons/Alert/Alert";
// import { confirm } from "components/Commons/Confirm/Confirm";

const LeftWhitePane = styled.div`
    position: absolute;
    z-index: 830;
    width: ${props => props.width}px;
    height: ${props => props.height}px;
    left: ${props => props.left}px;
    right: ${props => props.right}px;
    background: #FFFFFF; // transparent linear-gradient(90deg, rgba(255,255,255, 0) 0%, rgba(255,255,255, 1) 50%, rgba(255,255,255, 1) 100%);
    backgroundRepeat: no-repeat;
    @media only screen and (min-width : ${osdcss.resolutions.SmallMinWidth}px) 
    and (max-width : ${osdcss.resolutions.MediumMinWidth}px) { 
        background: transparent linear-gradient(-90deg, rgba(255,255,255, 0) 20%,rgba(255,255,255, 1) 70%);
    }

`;
const RightWhitePane = styled.div`
    position: absolute;
    z-index: 830;
    width: ${props => props.width}px;
    height: ${props => props.height}px;
    left: ${props => props.left}px;
    right: ${props => props.right}px;
    background: #FFFFFF; // transparent linear-gradient(-90deg, rgba(255,255,255, 0) 0%, rgba(255,255,255, 1) 50%, rgba(255,255,255, 1) 100%);
    backgroundRepeat: no-repeat;
    @media only screen and (min-width : ${osdcss.resolutions.SmallMinWidth}px) 
    and (max-width : ${osdcss.resolutions.MediumMinWidth}px) { 
        background: transparent linear-gradient(90deg, rgba(255,255,255, 0) 20%, rgba(255,255,255, 1) 70%);
    }

`;
const Arrow = styled.div`
    width: 17px;
    height: 48px;
    position: absolute;
    top: ${props => props.gap + 105}px;
    left: ${props => props.left}px;
    right: ${props => props.right}px;
    z-index: 831;
    border: none;
    background-image: url(${arrow});
    background-size: cover;
    background-position: 50%;
    transform: rotate(${props => props.angle});
    opacity: 0.9;
    cursor: pointer;
    :hover{
        opacity: 1;
    }
    @media only screen and (min-width : ${osdcss.resolutions.MediumMinWidth}px) 
    and (max-width : ${1024}px) { 
        top: ${props => props.gap}px;
    }
    @media only screen and (min-width : ${osdcss.resolutions.SmallMinWidth}px) 
    and (max-width : ${osdcss.resolutions.MediumMinWidth}px) { 
        top: 110px;
        // top: ${props => props.gap}px;
    }
`;
const GridEditorWrapper = styled.div`
    display: flex;
    margin-left:32px;
    margin-bottom: 75px;
    width: ${window.innerWidth < osdcss.resolutions.LargeMaxWidth
        ? window.innerWidth
        : osdcss.resolutions.LargeMaxWidth}; 
    .Editor{
        padding-right: 250px;
        overflow: hidden;
        white-space: nowrap;
        display: flex;
        margin-top: 30px;
    }
    @media only screen and (min-width : ${osdcss.resolutions.SmallMinWidth}px) 
    and (max-width : ${osdcss.resolutions.MediumMinWidth}px) { 
        margin-left:60px;
    }
`;
const Wrapper = styled.div`
    position: relative;
`;


class GridEditor extends Component {
    constructor(props) {
        super(props);
        this.temp = React.createRef();
        this.grid = React.createRef();
        this.state = {
            content: [],
            h: 0, w: window.innerWidth < osdcss.resolutions.LargeMaxWidth ? window.innerWidth : osdcss.resolutions.LargeMaxWidth,
            left: false, right: false, card_loading: false, card: false, newcard: false, row: null, col: null,
            boardId: null, newstep: false, editstep: false, cardDetail: null, title: null, where: null, tmp: null,
            gap: null,
        };
        this.handleScroll = this.handleScroll.bind(this);
        this.handleResize = this.handleResize.bind(this);
        this.ScrollLeft = this.ScrollLeft.bind(this);
        this.ScrollRight = this.ScrollRight.bind(this);
        this.createNewCard = this.createNewCard.bind(this);
        this.CloseNewStep = this.CloseNewStep.bind(this);
        this.CloseEditStep = this.CloseEditStep.bind(this);
        this.OpenNewStep = this.OpenNewStep.bind(this);
        this.OpenEditStep = this.OpenEditStep.bind(this);
        this.RemoveStep = this.RemoveStep.bind(this);
        this.EditStep = this.EditStep.bind(this);
        this.NewStep = this.NewStep.bind(this);
        this.requestReorder = this.requestReorder.bind(this);
        this.requestCardReorder = this.requestCardReorder.bind(this);
        this.handleReturn = this.handleReturn.bind(this);
    };
    componentWillUnmount() {
        window.removeEventListener("resize", this.handleResize, true);
        window.removeEventListener("scroll", this.handleScroll, true);
    }
    componentDidMount() {
        window.addEventListener("resize", this.handleResize, true);
        window.addEventListener("scroll", this.handleScroll, true);
    }
    handleScroll(event) {
        if (this.grid && event.target.scrollTop !== 0) {
            this.setState({ gap: event.target.scrollTop });
        }
    }
    handleResize() {
        this.setState({
            w: window.innerWidth < osdcss.resolutions.LargeMaxWidth
                ? window.innerWidth
                : osdcss.resolutions.LargeMaxWidth
        });
        if (this.temp) {
            if (this.temp.current.scrollWidth - this.temp.current.scrollLeft < this.state.w) {
                this.setState({ right: false });
            } else {
                this.setState({ right: true });
            }
            if (this.temp.current.scrollLeft > 0) { this.setState({ left: true }); }
        }
    }
    createNewCard(row, boardId) {
        this.setState({ row: row, boardId: row.id, newcard: true });
    }
    openCard = (card, row, boardId) => {
        this.setState({ cardDetail: card, title: card.title, row: row, boardId: boardId, card: true });
    }
    OpenNewStep() {
        this.setState({ newstep: true });
    }
    CloseNewStep() {
        this.setState({ newstep: false });
    }
    CloseEditStep() {
        this.setState({ editstep: false });
    }
    async OpenEditStep(title, where) {
        await this.setState({ editstep: true, title: title, where: where });
    }
    sorting = (list) => {
        list.map((item, index) => {
            item.order = index;
            return item;
        })
        return list;
    }
    async RemoveStep(data) {
        await this.props.DeleteItemListRequest(this.props.itemId, data, this.props.token)
            .then(res => {
                console.log(res);
                this.requestReorder(this.sorting(this.props.ItemStep));
            })
            .then(res => {
                console.log(res);
                this.props.GetItemStepsRequest(this.props.itemId, this.props.token);
            })
            .catch((err) => {
                console.error(err);
                // alert("Failed to delete the STEP");
            });
    };
    async EditStep(data) {
        await this.props.UpdateItemListRequest(this.props.itemId, data.where, this.props.token, { title: data.title })
            .then(res => {
                console.log(res);
                this.props.GetItemStepsRequest(this.props.itemId, this.props.token);
            })
        this.CloseEditStep();
    }
    async NewStep(_data) {
        const data = { title: _data.title, order: _data.where, type: "item", content_id: this.props.item["item-id"], }
        await this.props.CreateItemListRequest(data, this.props.item["item-id"], this.props.token)
            .then(res => {
                console.log(res);
                this.props.GetItemStepsRequest(this.props.item["item-id"], this.props.token);
            })
            .catch(async (err) => { await alert("Failed to create new STEP"); console.error(err) });
        this.CloseNewStep();
    }
    ScrollLeft() {
        if (this.temp) {
            this.temp.current.scrollLeft -= 275;

            if (this.temp.current.scrollWidth - this.temp.current.scrollLeft >= this.state.w) {
                this.setState({ right: true });
            }

            if (this.temp.current.scrollLeft === 0) {
                this.setState({ left: false });
            }
        }
    }
    ScrollRight() {
        if (this.temp) {
            this.temp.current.scrollLeft += 275;

            if (this.temp.current.scrollWidth - this.temp.current.scrollLeft <= this.state.w) {
                this.setState({ right: false });
            }

            if (this.temp.current.scrollLeft > 0) {
                this.setState({ left: true });
            }
        }
    }
    async requestCardReorder(items) {
        const jobs = [];
        let promiseAry = [];
        items.forEach((element, index) => {
            if (element.order !== index) jobs.push({ uid: element.uid, neworder: index });
        });
        if (jobs.length === 0) return;
        promiseAry = jobs.map(job =>
            this.props.UpdateCardTitleRequest({ order: job.neworder }, this.props.token, job.uid)
        );
        await Promise.all(promiseAry)
            .then(() => this.props.GetDesignBoardRequest(this.props.item.uid))
            .then(() => this.props.GetDesignCardRequest(this.props.item.uid, this.state.boardId));
    }
    async requestReorder(items) {
        console.log(items);
        const jobs = [];
        let promiseAry = [];
        items.forEach((element, index) => {
            if (element.order !== index) { jobs.push({ uid: element.uid, neworder: index }); }
        });
        if (jobs.length === 0) return;
        promiseAry = jobs.map(job =>
            this.props.UpdateItemListRequest(this.props.itemId, job.uid, this.props.token, { order: job.neworder }))

        await Promise
            .all(promiseAry)
            .then(() =>
                this.props.GetItemStepsRequest(this.props.itemId, this.props.token)
            )
    }
    componentDidUpdate(props, state) {
        if (props.ItemStep !== this.props.ItemStep) {
            if (this.props.ItemStep.length) {
                if (this.props.ItemStep.length * 275 > this.grid.current.clientWidth) {
                    this.setState({ right: true });
                }
            }
        }
        // if (nextProps.DesignDetailStepCard && nextProps.DesignDetailStepCard.uid != null && this.props.DesignDetailStepCard !== nextProps.DesignDetailStepCard) {
        // console.log(nextProps.DesignDetailStepCard.uid, "i got it", nextProps.DesignDetailStepCard, this.props.DesignDetailStepCard, typeof this.props.DesignDetailStepCard);
        // this.setState({ cardDetail: nextProps.DesignDetailStepCard });
        // }
        return true;
    }
    async handleReturn(data) {
        console.log(data);
        let copy = [...this.state.content];
        for (let item of copy) {
            // if (item)
            if (item.uid === data.uid) {

            }
        }
    }
    render() {
        const { editor, ItemStep, itemId } = this.props;
        const { gap, h, left, right, boardId, card, row, newcard, newstep, editstep, cardDetail, title, where } = this.state;
        const steps = ItemStep;

        return (
            <Wrapper>
                {itemId ?
                    <React.Fragment>
                        {left ? <LeftWhitePane
                            width={138} height={h}
                            background="transparent linear-gradient(-90deg, rgba(255,255,255, 0) 0%, rgba(255,255,255, 1) 50%, rgba(255,255,255, 1) 100%)">
                            <Arrow angle="0deg" gap={gap} left={50} onClick={this.ScrollLeft} />
                        </LeftWhitePane> : null}

                        {right ? <RightWhitePane
                            width={138} height={h} right={0}
                            background="transparent linear-gradient(-90deg, rgba(255,255,255, 1) 0%, rgba(255,255,255, 1) 50%, rgba(255,255,255, 0) 100%)">
                            <Arrow angle="180deg" gap={gap} right={50} onClick={this.ScrollRight} />
                        </RightWhitePane> : null}

                        {editor && newcard ?
                            <NewCardModal
                                // boardId={boardId}
                                // order={steps.length}
                                isTeam={editor}
                                itemId={this.props.itemId}
                                open={newcard}
                                row={row}
                                return={this.handleReturn}
                                close={() => this.setState({ newcard: false })}
                            /> : null}

                        {card ?
                            <CardModal
                                bought={this.props.bought}
                                open={card} close={() => this.setState({ card: false })}
                                edit={editor} //userInfo && (userInfo.uid === cardDetail.user_id)}
                                card={cardDetail}
                                isTeam={editor}
                                // title={title}
                                boardId={boardId}
                                itemId={itemId}
                            /> : null}

                        {editor && newstep ?
                            <NewStepModal
                                {...this.props}
                                steps={steps}
                                open={newstep}
                                newStep={this.NewStep}
                                close={this.CloseNewStep}
                            /> : null}

                        {editor && editstep ?
                            <EditStepModal
                                open={editstep}
                                title={title}
                                where={where}
                                steps={steps}
                                RemoveStep={this.RemoveStep}
                                EditStep={this.EditStep}
                                close={this.CloseEditStep}
                            /> : null}

                        <ReactHeight onHeightReady={(height => { this.setState({ h: height }) })}>
                            <GridEditorWrapper ref={this.grid}>
                                <div style={{ width: window.innerWidth + "px" }} className="Editor" ref={this.temp}>
                                    {/* ------------단계 ------------*/}
                                    {steps && steps.length > 0 ?
                                        <SortableDesignSteps
                                            editStep={this.OpenEditStep}
                                            item_id={this.props.item.uid}
                                            editor={editor ? true : false}
                                            items={steps}
                                            cardReorder={this.requestCardReorder}
                                            createCard={this.createNewCard}
                                            openCard={this.openCard}
                                            reorder={this.requestReorder}
                                        /> : null}
                                    {editor ?
                                        <div style={{ display: "flex" }}>
                                            <CreateStep
                                                onClick={this.OpenNewStep}
                                                step={"단계"} />
                                            <div style={{ width: "300px" }}>&nbsp;</div>
                                        </div> : null}
                                </div>
                            </GridEditorWrapper>
                        </ReactHeight>
                    </React.Fragment>
                    : <div>FAILED TO LOAD DATA :( <br />
                    PLEASE, REFRESH THIS PAGE... :)</div>
                }
            </Wrapper>)
    }
}

export default GridEditor;