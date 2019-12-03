import React from 'react'
import Button from './Button/Button'

const Buttons = ({newGame, saveBestScore}) => {
    return (
        <div>
            <Button onClick={newGame}>New Game</Button>
            <Button onClick={saveBestScore}>Save Best Score</Button>
        </div>
    )
}

export default Buttons
