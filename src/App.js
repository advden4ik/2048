import React, {useState, useEffect} from 'react';
import initCells from './logic/initCells'
import Layout from "./components/Layout/Layout";
import Field from "./components/Field/Field";
import ControllPanel from "./components/ControllPanel/ControllPanel";
import Button from "./components/Button/Button";
import Score from "./components/Score/Score";

const App = () => {
    const [matrix, setMatrix] = useState(initCells())
    const [score, setScore] = useState(0)

    useEffect(() => {
        const handleKeyPress = (event) => {

        }

        document.addEventListener('keypress', handleKeyPress)

        return () => {
            document.removeEventListener('keypress', handleKeyPress)
        }
    })

    const newGame = () => {
        setMatrix(initCells())
        setScore(0)
    }

    return (
        <Layout>
            <ControllPanel>
                <Button onClick={newGame}>New Game</Button>
                <Score>{score}</Score>
            </ControllPanel>
            <Field cells={matrix}/>
        </Layout>
    );
}

export default App;
