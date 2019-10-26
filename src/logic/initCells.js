import {create} from './cellManager'

const initCells = () => {
    const cell1 = create(getRandomCoord(), getRandomCoord(), getRandomValue())
    let cell2 = create(getRandomCoord(), getRandomCoord(), getRandomValue())

    while (cell1.x === cell2.x && cell1.y === cell2.y) {
        cell2 = create(getRandomCoord(), getRandomCoord(), getRandomValue())
    }

    return [cell1, cell2]
}

const getRandomCoord = () => Math.floor(Math.random() * 3.99)

const getRandomValue = () => Math.random() <= 0.9 ? 2 : 4

export default initCells
