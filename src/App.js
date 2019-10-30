import React, {Component} from 'react'
import _ from 'lodash'
import {directions, initCells, moveCells, movesAvailable, populateField, removeAndIncreaseCells} from './logic'
import Layout from "./components/Layout/Layout"
import Field from "./components/Field/Field"
import ControllPanel from "./components/ControllPanel/ControllPanel"
import Button from "./components/Button/Button"
import Score from "./components/Score/Score"

class App extends Component {
    state = this.getNewState()

    mapKeyCodeToDirection = {
        KeyA: directions.LEFT,
        KeyS: directions.DOWN,
        KeyD: directions.RIGHT,
        KeyW: directions.UP,
    }

    newGame = () => {
        this.setState(this.getNewState())
    }

    getNewState() {
        return {
            cells: initCells(),
            score: 0,
        }
    }

    componentDidMount() {
        document.addEventListener('keypress', this.handleKeyPress)
    }

    componentWillUnmount() {
        document.removeEventListener('keypress', this.handleKeyPress)
    }

    handleKeyPress = async event => {
        let moved
        const prevCells = _.cloneDeep(this.state.cells)

        if (['KeyA', 'KeyS', 'KeyD', 'KeyW'].includes(event.code))
            this.setState(state => ({
                ...state,
                cells: moveCells(state.cells, this.mapKeyCodeToDirection[event.code]),
            }))

        await delay(100)
        this.setState(state => ({
            ...state,
            cells: removeAndIncreaseCells(state.cells),
        }))

        moved = !_.isEqual(prevCells, this.state.cells)

        if (moved) {
            this.setState(state => ({
                ...state,
                cells: populateField(state.cells),
            }), () => {
                if (!movesAvailable(this.state.cells)) {
                    console.log('GAME OVER')
                }
            })
        }
    }

    render() {
        const {cells, score} = this.state

        return (
            <Layout>
                <ControllPanel>
                    <Button onClick={this.newGame}>New Game</Button>
                    <Score>{score}</Score>
                </ControllPanel>
                <Field cells={cells}/>
            </Layout>
        )
    }
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

export default App
