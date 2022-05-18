import React from 'react'
import styled from 'styled-components'

const Card = (props) => {
    return (
        <Paper bgColor={props.bgColor} 
                bgImg={props.bgImg}
                onClick={props.handleClick}
                isClicked={props.isClicked}
                isLocked={props.isLocked}
        />
    )
}

export default Card

const Paper = styled.div`
    width: 120px;
    height: 120px;
    background-color: ${(props) => (props.isClicked || props.isLocked) ? 'inherit' : '#322704'};                                                                     
    background-image: ${(props) => (props.isClicked || props.isLocked) ? `url(${props.bgImg})` : 'none'};  
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    opacity: ${(props) => props.isLocked ? 0 : 1};
    transition-property: opacity;
    transition-duration: .5s;
`