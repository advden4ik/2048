import {cellStates} from "./cellManager";

export const removeAndIncreaseCells = ({cells, score}) => {
    const newCells = cells.filter(cell => cell.state !== cellStates.DYING).map(cell => {
        if (cell.state === cellStates.INCREASE) {
            score += cell.value *= 2
        }

        cell.state = cellStates.IDLE

        return cell
    })

    const bestScore = +localStorage.getItem('best')
    if (score > bestScore) localStorage.setItem('best', score)

    return { cells: newCells, score }
}
