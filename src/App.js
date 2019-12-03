import React, { Component } from 'react'
import _ from 'lodash'
import { directions, initCells, moveCells, movesAvailable, populateField, removeAndIncreaseCells } from './logic'
import Layout from './components/Layout/Layout'
import Field from './components/Field/Field'
import ControlPanel from './components/ControlPanel/ControlPanel'
import Scores from './components/Scores/Scores'
import firebase from './components/firebase'
import Auth from './components/Auth/Auth'
import User from './components/User/User'
import Loader from './components/Loader/Loader'
import Buttons from './components/Buttons/Buttons'

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
            gameover: false,
        }
    }

    async componentDidMount() {
        localStorage.setItem('best', '0')
        await firebase.isInitialized()
            .then(user => {
                console.log('User', user)
                console.log('FB user', firebase.auth.currentUser)
                this.setState({user, initialized: true})
            })
        if (this.state.user) {
            firebase.getBestUserScore().then(_ => this.forceUpdate())
            document.addEventListener('keypress', this.handleKeyPress)
        }
    }

    componentDidUpdate(prevProps, prevState) {
        console.log('componentDidUpdate---------')
        console.log('FB user', firebase.auth.currentUser)
        console.log('prev state', prevState)
        console.log('new state', this.state)
        console.log('---------componentDidUpdate')
        if (this.state.user && prevState.user !== this.state.user) {
            firebase.getBestUserScore().then(_ => this.forceUpdate())
            document.addEventListener('keypress', this.handleKeyPress)
            firebase.getBestUserScore().then(_ => this.forceUpdate())
        }
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
                    ...removeAndIncreaseCells(state),
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
                    this.setState({gameover: true})
                }
            })
        }
    }

    saveBestScore = () => {
        if (this.state.score === +localStorage.getItem('best')) {
            firebase.setBestUserScore(this.state.score)
                .then(_ => alert('Saved!'))
        } else {
            alert('Score and best must be equal!')
        }
    }

    register = async (email, password) => {
        try {
            await firebase.register(email, password)
            this.setState({user: {email}})
        } catch (error) {
            alert(error.message)
        }
    }

    login = async (email, password) => {
        try {
            await firebase.login(email, password)
            this.setState({user: {email}})
        } catch (error) {
            alert(error.message)
        }
    }

    logout = async () => {
        if (window.confirm('Are you sure?')) {
            this.newGame()
            document.removeEventListener('keypress', this.handleKeyPress)
            await firebase.logout()
            this.setState({user: null})
        }
    }

    render() {
        const {cells, score, gameover, user, initialized} = this.state

        return initialized
            ? user
                ? (
                    <Layout>
                        <User email={user.email} logout={this.logout} />
                        <ControlPanel>
                            <Buttons newGame={this.newGame} saveBestScore={this.saveBestScore} />
                            <Scores score={score} />
                        </ControlPanel>
                        <Field cells={cells} gameover={gameover} />
                    </Layout>
                ) : (<Auth register={this.register} login={this.login} />)
            : <Loader />
    }
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

export default App
