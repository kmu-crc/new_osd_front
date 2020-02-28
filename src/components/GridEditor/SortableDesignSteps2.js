import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { CreateCard, StepCard, ContentCard } from "./GridTools";
import { SortableContainer, SortableElement, arrayMove, SortableHandle } from "react-sortable-hoc";

const AsBelowArrow = styled.div`
    margin-left: ${props => props.marginLeft + "px" || "0px"};
    margin-top: ${props => props.marginTop + "px" || "0px"};
    width: ${props => props.percent * 100}px;
    height: ${props => props.percent * 65}px;
    background: #707070 0% 0% no-repeat padding-box;
    opacity: ${props => props.opacity};
    border-top: ${props => props.percent * 65}px solid ${props => props.color || "#707070"};
    border-left: ${props => props.percent * 50}px solid transparent;
    border-right:${props => props.percent * 50}px solid transparent;
    transform: rotate(${props => props.angle}deg);
`;
const DragHandler = styled.div`
    position: absolute;
    margin-left: 150px;
    margin-top: 30px;
    z-index: 800;
    .wrapper {
        display: flex;
        visibility: hidden;
    }
    .tip-txt {
        display: none;
        width: max-content;
        background-color: #000000;
        color: #FFFFFF;
        text-align: center;
        border-radius: 6px;
        padding: 5px 0;
        margin-top: -10px;
    }
    :hover {
        .wrapper {
            visibility: visible;
        }
        .tip-txt {
            display: block;
        }
    }
`;

const Container = SortableContainer(({ children }) =>
    <ul style={{ margin: "0px", padding: "0px" }}>{children}</ul>);
const HorizonDragHandle = SortableHandle(() =>
    <div style={{ display: "flex" }}>
        <AsBelowArrow color="#FF0000" angle={90} percent={.21} marginRight={7} />
        <AsBelowArrow color="#FF0000" angle={-90} percent={.21} />
    </div>)
const VerticalDragHandle = SortableHandle(({ is_white }) =>
    <div>
        <AsBelowArrow color={is_white ? "#FFFFFF" : "#FF0000"} opacity={is_white ? 1 : 0.5} angle={180} percent={.21} />
        <AsBelowArrow color={is_white ? "#FFFFFF" : "#FF0000"} opacity={is_white ? 1 : 0.5} angle={0} percent={.21} marginTop={7} />
    </div>)
const margin = {
    marginTop: "25px", marginRight: "74px", marginBottom: "37px"
};
const SortableCard = SortableElement(({ editor, card, openCard, boardId, designId }) => (
    <ContentCard onClick={() => openCard(card, card.order, boardId)} id="contentcard" uid={card.uid} {...margin} card={card} designId={designId} >
        {editor ? <VerticalDragHandle is_white={card.first_img} /> : null}
    </ContentCard>));

const SortableStep = SortableElement(({ reload, index, editStep, step, boardId, editor, designId, openCard, createCard, reorder }) => (
    <div style={{ position: "relative" }}>
        <DragHandler>
            <div className="wrapper">
                {editor ? <HorizonDragHandle /> : null}
                <div className="tip-txt">단계의 순서를<br />'드래그앤드롭'으로<br />바꾸실 수 있습니다.</div>
            </div>
        </DragHandler>
        <StepCard
            onClick={() => editStep(step.title, step.uid)}
            title={step.title}
            uid={step.uid}
            id="stepcard"
            marginTop={0} marginRight={74} marginBottom={0} marginLeft={0} />

        {step.cards && step.cards.length > 0 &&
            <Fragment>
                <div style={{ marginTop: "25px" }}>
                    <AsBelowArrow angle={0} percent={.25} marginTop={0} marginRight={0} marginBottom={0} marginLeft={85} />
                </div>
                <div>
                    <SortableDesignCards
                        reload={reload}
                        editor={editor}
                        boardId={boardId}
                        stepindex={index}
                        items={step.cards}
                        designId={designId}
                        openCard={openCard}
                        reorder={reorder} />
                </div>
            </Fragment>}
        {editor &&
            <div style={{ marginTop: step.cards && step.cards.length > 0 ? "25px" : "66px" }}>
                <CreateCard
                    onClick={() => createCard({ order: (step && step.cards) ? step.cards.length : 0, id: boardId })}
                    title={""} step={"카드 "}
                    marginTop={0} marginRight={74} marginBottom={0} marginLeft={0} />
            </div>}
    </div>));

class SortableDesignCards extends Component {
    constructor(props) {
        super(props);
        this.state = { items: this.props.items };
        this.onSortEnd = this.onSortEnd.bind(this);
    };
    onSortEnd = ({ oldIndex, newIndex }) => {
        if (oldIndex === newIndex) return;
        this.setState(({ items }) => ({ items: arrayMove(items, oldIndex, newIndex), }));
        this.props.reorder(this.state.items);
    };
    componentDidUpdate(prevProps) {
        if (prevProps.reload !== this.props.reload) {
            return true;
        }
    };
    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.reload !== this.props.reload) {
            return true;
        }
        if (nextProps.items !== this.props.items) {
            this.setState({ items: nextProps.items });
            return true;
        }
        if (nextState.items !== this.state.items) {
            return true;
        }
        return false;
    };

    render() {
        const { items } = this.state;
        const { editor, designId, openCard, createCard, boardId } = this.props;

        return (<Container
            axis="y"
            pressThreshold={5}
            onSortEnd={this.onSortEnd}
            onSortStart={(_, event) => event.preventDefault()}
            useDragHandle>
            {items.map((item, index) => (
                <SortableCard
                    stepindex={this.props.index}
                    cardindex={index}
                    createCard={createCard}
                    openCard={openCard}
                    boardId={boardId}
                    designId={designId}
                    editor={editor}
                    key={`step-${index}`}
                    index={index}
                    card={item}
                />))}
        </Container>)
    }
};
class SortableDesignSteps2 extends Component {
    constructor(props){
        super(props);
        this.state = { steps: this.props.steps };
    }

    render() {
        console.log("SortableDesignSteps2:", this.state.steps);
        const { steps } = this.state;

        return (<Container
            axis="x"
            pressThreshold={5}
            onSortEnd={this.onSortEnd}
            onSortStart={(_, event) => event.preventDefault()}
            // shouldCancelStart = { this.shouldCancelStart }
            useDragHandle>
            <div style={{ display: "flex" }}>
                {steps.map((step, index) => (
                    <SortableStep
                        key={`step-${index}`}
                        step={step}
                    />
                ))}
            </div>
        </Container >)
    }
};


export default SortableDesignSteps2;