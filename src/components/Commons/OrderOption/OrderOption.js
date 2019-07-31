import React, { Component } from 'react'
import styled from 'styled-components'

const OrderWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    padding-top: 55px;
    font-size: 20px;
    font-family: Noto Sans KR;
    color: #707070;
    font-weight: 500;
    line-height: 29px;
    text-align: middle;
`
const OrderElement = styled.div`
    font-family: Noto Sans KR;
    font-weight: 500;
    line-height: 29px;
    font-size: 20px;
    cursor: pointer;
    &.selected {
        color: #FF0000;
        margin-right: ${props => props.marginRight};
        border-bottom: 1.5px solid red;
    }
    &.unselected {
        color: #707070;
        margin-right: ${props => props.marginRight};
    }
`
class OrderOption extends Component {
    state = {
        options:
            [{ text: "인기순", keyword: "like", marginRight: "30px" },
            { text: "최신순", keyword: "update", marginRight: "44px" }]
    }
    handleClicked = (order) => {
        this.props.order_clicked(order)
    }
    render() {
        const { options } = this.state
        const { selected } = this.props
        return (

            <OrderWrapper>
                {options.map(opt => {
                    return (<OrderElement
                        marginRight={opt.marginRight}
                        className={selected.keyword === opt.keyword ? "selected" : "unselected"}
                        onClick={() => this.handleClicked(opt)} key={opt.keyword}>{opt.text}</OrderElement>)
                })}
            </OrderWrapper>
        )
    }
}

export default OrderOption