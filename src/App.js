import React, {Component} from 'react'
import _ from 'lodash'
import {directions, initCells, moveCells, movesAvailable, populateField, removeAndIncreaseCells} from './logic'
import Layout from './components/Layout/Layout'
import Field from './components/Field/Field'
import ControlPanel from './components/ControlPanel/ControlPanel'
import Button from './components/Button/Button'
import Scores from './components/Scores/Scores'

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
        if (!localStorage.getItem('best')) localStorage.setItem('best', '0')

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
            }), () => {
                this.setState(state => ({
                    ...state,
                    ...removeAndIncreaseCells(state)
                }))
            })



        moved = !_.isEqual(prevCells, this.state.cells)

        if (moved) {
            await delay(100)
            this.setState(state => ({
                ...state,
                cells: populateField(state.cells),
            }), () => {
                if (!movesAvailable(this.state.cells)) {
                    console.log('GAME OVER')
                    document.removeEventListener('keypress', this.handleKeyPress)
                }
            })
        }
    }

    render() {
        const {cells, score} = this.state

        return (
            <Layout>
                <ControlPanel>
                    <Button onClick={this.newGame}>New Game</Button>
                    <Scores score={score}/>
                </ControlPanel>
                <Field cells={cells}/>
            </Layout>
        )
    }
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

export default App
