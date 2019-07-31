import React, { Component } from 'react'
import styled from 'styled-components'
import zoom from "source/zoom.svg"

const SearchContainer = styled.div`
    background-color: #FFFFFF;
    border-radius: 20px;
    border: 1.5px solid #707070;
    width: 327px;
    height: 36px;
    background: url(${zoom});
    background-size: 21.49px 21.49px;
    background-repeat: no-repeat;
    background-position: right 12.7px top 4px;
    &:focus{
        outline: 1.5px solid red;
    }
    input {
        outline: none;
        width: 280px;
        border: none;
        margin: 0px 10px;
    }
`
class SearchForm extends Component {
    state = {}
    _search = () => { }
    _handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            console.log('Enter')
        }
    }
    render() {
        return (
            <SearchContainer onKeyDown={this._handleKeyDown}>
                <input type="text" placeholder="Search..." />
            </SearchContainer>)
    }
}



export default SearchForm