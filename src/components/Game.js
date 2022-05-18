import React, { useState, useEffect } from 'react'
import Card from './Card'
import styled, {keyframes} from 'styled-components'
import burger from './images/burger.svg'
import donut from './images/donut.svg'
import drink from './images/drink.svg'
import friedChicken from './images/fried-chicken.svg'
import hotChips from './images/hot-chips.svg'
import hotDog from './images/hot-dog.svg'
import nuggets from './images/nuggets.svg'
import pizza from './images/pizza.svg'

const items_array = [
    {name: `burger`, src: burger},
    {name: `donut`, src: donut},
    {name: `drink`, src: drink}, 
    {name: `fried chicken`, src: friedChicken},
    {name: `hot chips`, src: hotChips},
    {name: `hot dog`, src: hotDog},
    {name: `nuggets`, src: nuggets},
    {name: `pizza`, src: pizza}
]

function generateRandomArray(itemsArray){
    const duplicatedArray = [...itemsArray, ...itemsArray]
    return duplicatedArray.sort((a, b) => Math.random() - 0.5)
}

const Game = () => {
    const cards = Array.from(items_array, item => ({name: item.name, src: item.src, locked: false, clicked: false}))
    const cards_shuffled = generateRandomArray(cards)

    const [memoryGameGrid, setMemoryGameGrid] = useState(cards_shuffled) 
    const [movesCount, setMovesCount] = useState(0)
    const [cardsClicked, setCardsClicked] = useState([])
    const [lockClick, setLockClick] = useState(true)
    const [gamePoints, setGamePoints] = useState(0)

    useEffect(()=>{
        if(movesCount === 2){
            setLockClick(true)
            let newGrid = makeCopy(memoryGameGrid)
            if(checkIdentical(cardsClicked)){
                setGamePoints(gamePoints + 10)
                const indexes = cardsClicked.map(item => item.index)
                const lockedGrid = setLocked(indexes, newGrid)
                setMemoryGameGrid(lockedGrid)
            }else{
                gamePoints > 0 && setGamePoints(gamePoints - 5)
            }
            newGrid.forEach(item => {item.clicked = false})
            setTimeout(()=>{
                setMemoryGameGrid(newGrid)
                setLockClick(false)
            }, 900)
            setMovesCount(0)
            setCardsClicked([])
        }
    }, [movesCount, cardsClicked])

    const handleClick = (item, index) => {
        const indexOfLastCard = cardsClicked.map(card => card.index)
        const [x] = indexOfLastCard
        if(!lockClick && (x !== index)){
            setClicked(index)
            setMovesCount(movesCount + 1)
            setCardsClicked(prevCards => [...prevCards, {index, item}])
        }
    }
    
    const makeCopy = arr => {
        return arr.map(item => {
            return {...item}
        })
    }

    const setClicked = index => {
        const newCardGrid = makeCopy(memoryGameGrid)
        newCardGrid[index].clicked = true
        setMemoryGameGrid(newCardGrid)
    }

    const checkIdentical = arr => {
        const match = arr.reduce((prevItem, item)=>{
            if(prevItem.item.name === item.item.name){
                return true
            }
            return false
        })
        return match
    }

    const setLocked = (arr, newGrid) => {
        newGrid.map((item, index) => {
            if(index === arr[0] || index === arr[1]){
                item.locked = true
            }
            return null
        })
        return newGrid
    }

    const restartGame = () => {
        setMemoryGameGrid(cards_shuffled)
        setGamePoints(0)
    }

    return (
        <GameContainer>
            <Title>Memory game</Title>
            <GridArea
                onAnimationEnd = {() => {setLockClick(false)}}
            >
                {memoryGameGrid && memoryGameGrid.map((item, index)=>{
                    return (
                        <Card
                            handleClick = {()=> {
                                handleClick(item, index)
                            }}
                            key = {index}
                            isClicked = {item.clicked}
                            isLocked = {item.locked}
                            bgImg = {item.src}
                        />
                    )
                })}
            </GridArea>
            <Footer>
                <Button onClick={() => restartGame()}>Restart cards</Button>
                <Points><h3>Points: {gamePoints}/</h3>50</Points>
            </Footer>
        </GameContainer>
    )
}

export default Game
const fadeIn = keyframes`
    0%{
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
`
const GameContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
const Title = styled.h1`
    font-size: 8em;
    text-transform: uppercase;
    letter-spacing: 3px;
    font-family: 'Bebas Neue', cursive;
    animation: 1s ${fadeIn} ease-in;
`
const GridArea = styled.div`
    display: grid;
    margin: 1vh;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: auto;
    gap: 10px;
    max-width: 700px;
    max-height: 700px;
    animation: 2s ${fadeIn} ease-in;;
`
const Footer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    animation: 2s ${fadeIn} ease-in;
`
const Button = styled.button`
    padding: 15px;
    margin: auto;
    border-radius: 5px;
    border: 2px solid #322704;
    text-transform: uppercase;
    background-color: inherit;
    color: #322704;
    font-weight: 700;
    cursor: pointer;

    &:hover {
        opacity: .8;
    }
`
const Points = styled.div`
    display: flex;
    margin-left: 20px;
    font-size: 2em;
`