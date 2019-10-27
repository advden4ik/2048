import {uniqueId} from 'lodash'

export const cellStates = {
    IDLE: 'IDLE',
    MOVING: 'MOVING',
    DYING: 'DYING',
    INCREASE: 'INCREASE',
}

export const create = (x, y, value, id) => ({x, y, value, id: id ? id : uniqueId()})
