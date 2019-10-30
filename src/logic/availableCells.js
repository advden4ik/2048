import {cloneDeep} from 'lodash'

const vectors = [
    {x: 0, y: -1}, // Up
    {x: 1, y: 0},  // Right
    {x: 0, y: 1},  // Down
    {x: -1, y: 0}   // Left
]

export const movesAvailable = (cells) => hasAvailableCells(cells) || tileMatchesAvailable(cells)

const hasAvailableCells = (cells) => {
    return cells.length !== 16
}

const tileMatchesAvailable = (initCells) => {
    const cells = cloneDeep(initCells)

    const matrix = Array.from(new Array(4), () =>
        Array.from(new Array(4), () => 0))

    cells.forEach(cell => {
        matrix[cell.y][cell.x] = cell
    })

    let tile

    for (let x = 0; x < 4; x++) {
        for (let y = 0; y < 4; y++) {
            tile = cellContent({x, y}, matrix)

            if (tile) {
                for (let direction = 0; direction < 4; direction++) {
                    const vector = vectors[direction]
                    const cell = {x: x + vector.x, y: y + vector.y}

                    const other = cellContent(cell, matrix)

                    if (other && other.value === tile.value) {
                        return true // These two tiles can be merged
                    }
                }
            }
        }
    }

    return false
}

const cellContent = function (cell, cells) {
    if (cell.x >= 0 && cell.x < 4 && cell.y >= 0 && cell.y < 4) {
        return cells[cell.x][cell.y]
    } else {
        return null
    }
}
